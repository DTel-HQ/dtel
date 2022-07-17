/* eslint-disable @typescript-eslint/no-var-requires */
import { CommandInteraction, MessageComponentInteraction, ModalSubmitInteraction, Interaction, SnowflakeUtil, InteractionType, PermissionsBitField, ChatInputCommandInteraction } from "discord.js";
import Commands from "../config/commands";
import Command, { CommandType, PermissionLevel } from "../interfaces/commandData";
import Constructable from "../interfaces/constructable";
import DTelClient from "../internals/client";
import Processor from "../internals/processor";
import i18n from "i18next";
import { winston } from "../dtel";
import config from "../config/config";
import { blacklistCache } from "../database/db";

export default async(client: DTelClient, _interaction: Interaction): Promise<void> => {
	const interaction = _interaction as CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction;

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

	switch (interaction.type) {
		case InteractionType.ApplicationCommand: {
			commandName = (interaction as ChatInputCommandInteraction).commandName;
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

			toRunPath += `/${commandName}`;

			break;
		}
		case InteractionType.MessageComponent:
		case InteractionType.ModalSubmit: {
			const typedInteraction = interaction as MessageComponentInteraction|ModalSubmitInteraction;

			if (typedInteraction.message && (Date.now() - SnowflakeUtil.timestampFrom(typedInteraction.message.id)) > (2 * 60 * 1000)) {
				interaction.reply({
					content: i18n.t("This interaction has expired. Try running the command again.", { lng: interaction.locale }),
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
			const interactionName = split[1];

			const cmd = Commands.find(c => c.name === commandName);
			if (!cmd) throw new Error();
			commandData = cmd;

			toRunPath = `${__dirname}/../interactions/${commandName}/${interactionName}`;
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
		switch (commandData.permissionLevel) {
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

