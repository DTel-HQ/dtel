/* eslint-disable @typescript-eslint/no-var-requires */
import {
	CommandInteraction,
	MessageComponentInteraction,
	ModalSubmitInteraction,
	Interaction,
	SnowflakeUtil,
	InteractionType,
	PermissionsBitField,
	ChatInputCommandInteraction,
	ApplicationCommandOptionType,
} from "discord.js";
import Commands from "../config/commands";
import Command, { CommandType, PermissionLevel, SubcommandData } from "../interfaces/commandData";
import Constructable from "../interfaces/constructable";
import DTelClient from "../internals/client";
import Processor from "../internals/processor";
import i18n, { getFixedT } from "i18next";
import { winston } from "../dtel";
import config from "../config/config";
import { blacklistCache } from "../database/db";

export default async(client: DTelClient, _interaction: Interaction): Promise<void> => {
	const interaction = _interaction as CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction;

	const t = getFixedT(interaction.locale, "events.interactionCreate");

	if (blacklistCache.get(interaction.user.id)) {
		interaction.reply(i18n.t("errors.blacklisted", {
			lng: interaction.locale,
		}));
		return;
	}
	const call = client.calls.find(c => c.from.channelID === interaction.channelId || c.to.channelID === interaction.channelId);

	let commandName: string;
	let toRunPath: string;
	let commandData: Command;
	let permissionLevel: PermissionLevel = PermissionLevel.none;

	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			const typedInteraction = interaction as ChatInputCommandInteraction;

			commandName = typedInteraction.commandName;
			const cmd = Commands.find(c => c.name === commandName);
			if (!cmd) throw new Error();
			commandData = cmd;

			if (commandData.notExecutableInCall && call) {
				interaction.reply({
					embeds: [client.errorEmbed(i18n.t("errors.notExecutableInCall"))],
				});
				return;
			}

			toRunPath = `${__dirname}/../commands`;

			switch (commandData.useType) {
				case CommandType.standard: {
					toRunPath += "/standard";
					break;
				}
				case CommandType.call: {
					toRunPath += "/call";
					break;
				}
				case CommandType.customerSupport: {
					toRunPath += "/support";
					break;
				}
				case CommandType.maintainer: {
					toRunPath += "/maintainer";
					break;
				}
			}

			const subCommand = typedInteraction.options.getSubcommand(false);
			if (subCommand) {
				const subData = commandData.options?.find(o => o.name === subCommand) as SubcommandData | null;
				if (!subData) throw new Error();

				commandName = `${commandName} ${subCommand}`;
				permissionLevel = subData.permissionLevel;
			} else {
				permissionLevel = commandData.permissionLevel;
			}

			toRunPath += `/${commandName}`;

			break;
		}
		case InteractionType.MessageComponent:
		case InteractionType.ModalSubmit: {
			const typedInteraction = interaction as MessageComponentInteraction|ModalSubmitInteraction;

			if (interaction.type === InteractionType.ModalSubmit && interaction.message?.interaction && interaction.message?.interaction?.user.id != interaction.user.id) {
				interaction.reply(t("errors.wrongUser"));
				return;
			}

			// Interaction expiry after 2 minutes
			if (typedInteraction.message && (Date.now() - SnowflakeUtil.timestampFrom(typedInteraction.message.id)) > (2 * 60 * 1000)) {
				interaction.reply({
					content: i18n.t("events.interactionCreate.errors.expiredInteraction", { lng: interaction.locale }),
					ephemeral: true,
				});

				return;
			}

			const split = typedInteraction.customId.split("-");
			if (split.length < 2) {
				interaction.reply({
					embeds: [client.errorEmbed(i18n.t("errors.unexpected", { lng: interaction.locale }))],
					ephemeral: true,
				});
				winston.error(`Message component interaction custom ID not valid.`);
				return;
			}

			commandName = split[0];
			let interactionName: string = split.slice(1, split.length).join("-");

			if (commandName.startsWith("dtelnoreg")) return;

			const cmd = Commands.find(c => c.name === commandName);
			if (!cmd) throw new Error();
			commandData = cmd;

			toRunPath = `${__dirname}/../interactions/${commandName}`;

			const subCommand = cmd.options?.filter(o => o.type === ApplicationCommandOptionType.Subcommand) as SubcommandData[];

			if (subCommand.length > 0) {
				commandName = `${split[0]} ${split[1]}`;
				interactionName = split[2];

				permissionLevel = subCommand.find(c => c.name == split[1])?.permissionLevel || PermissionLevel.none;
				toRunPath += `/${split[1]}`;
			} else {
				permissionLevel = commandData.permissionLevel;
			}

			const paramsToSend: string[] = [];

			console.log(interactionName);

			if (interactionName.includes("-params-")) {
				const paramSplit = interactionName.split("-params-");
				interactionName = paramSplit[0];
				const params = paramSplit[1];

				if (params) {
					const parsedParams = params.split("-");
					for (let i = 0; i < parsedParams.length; i++) {
						paramsToSend.push(parsedParams[i]);
					}
				}
			}

			commandData.params = paramsToSend;

			toRunPath += `/${interactionName}`;
		}
	}

	commandData = commandData!; // It definitely exists if it got this far
	if (commandData.useType === CommandType.call && !call) {
		interaction.reply({
			embeds: [client.errorEmbed(i18n.t("errors.onlyExecutableInCall"))],
		});
		return;
	}

	let processorFile: Constructable<Processor>;
	try {
		if (client.config.devMode) {
			delete require.cache[require.resolve(toRunPath!)];
		}
		processorFile = require(toRunPath!).default;
		if (!processorFile) throw new Error();
	} catch (e) {
		if (config.devMode) {
			console.error(e);
		}

		client.winston.error(`Cannot process interaction for/from command: ${commandName!}`);
		interaction.reply(":x: Interaction not yet implemented.");
		return;
	}

	const processorClass = new processorFile(client, interaction, commandData);
	try {
		const userPermissions = await client.getPerms(interaction.user.id);
		switch (permissionLevel) {
			case PermissionLevel.maintainer: {
				if (userPermissions != PermissionLevel.maintainer) {
					processorClass.notMaintainer();
					return;
				}
				break;
			}
			case PermissionLevel.customerSupport: {
				if (userPermissions < PermissionLevel.customerSupport) {
					processorClass.permCheckFail();
					return;
				}
				if (interaction.guildId !== config.supportGuild.id && !config.devMode) {
					processorClass.notInSupportGuild();
					return;
				}
				break;
			}
			case PermissionLevel.serverAdmin: {
				if (!(interaction.member!.permissions as PermissionsBitField).has(PermissionsBitField.Flags.ManageGuild)) {
					processorClass.permCheckFail();
					return;
				}
				break;
			}
		}

		processorClass._run();
	} catch (_err) {
		const err = _err as Error;
		winston.error(`Error occurred whilst executing interaction for/from command: ${commandName!}`, err.stack);
		interaction.reply({
			embeds: [client.errorEmbed(i18n.t("errors.unexpected", { lng: interaction.locale }))],
		});
	}
};

