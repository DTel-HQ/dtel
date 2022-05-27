/* eslint-disable @typescript-eslint/no-var-requires */
import { CommandInteraction, Permissions, MessageComponentInteraction, ModalSubmitInteraction, Interaction } from "discord.js";
import Commands from "../config/commands";
import Command, { CommandType, PermissionLevel } from "../interfaces/commandData";
import Constructable from "../interfaces/constructable";
import DTelClient from "../internals/client";
import Processor from "../internals/processor";
import i18n from "i18next";

export default async(client: DTelClient, _interaction: Interaction): Promise<void> => {
	const interaction = _interaction as CommandInteraction|MessageComponentInteraction|ModalSubmitInteraction;

	const { config, winston } = client;
	let commandName: string;
	let toRunPath: string;
	let commandData: Command;

	switch (interaction.type) {
		case "APPLICATION_COMMAND": {
			commandName = (interaction as CommandInteraction).commandName;
			const cmd = Commands.find(c => c.name === commandName);
			if (!cmd) throw new Error();
			commandData = cmd;

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
		case "MESSAGE_COMPONENT":
		case "MODAL_SUBMIT": {
			const split = (interaction as MessageComponentInteraction|ModalSubmitInteraction).customId.split("-");
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

	let processorFile: Constructable<Processor>;
	try {
		if (client.config.devMode) {
			delete require.cache[require.resolve(toRunPath!)];
		}
		processorFile = require(toRunPath!).default;
		if (!processorFile) throw new Error();
	} catch {
		client.winston.error(`Cannot process interaction for/from command: ${commandName!}`);
		interaction.reply(":x: Interaction not yet implemented.");
		return;
	}

	const processorClass = new processorFile(client, interaction, commandData!);
	try {
		const userPermissions = await client.getPerms(interaction.user.id);
		switch (commandData!.permissionLevel) {
			case PermissionLevel.maintainer: {
				if (userPermissions != PermissionLevel.maintainer) return processorClass.notMaintainer();
				break;
			}
			case PermissionLevel.customerSupport: {
				if (userPermissions < PermissionLevel.customerSupport) return processorClass.permCheckFail();
				break;
			}
			case PermissionLevel.serverAdmin: {
				if (!(interaction.member!.permissions as Permissions).has(Permissions.FLAGS.MANAGE_GUILD)) return processorClass.permCheckFail();
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

