/* eslint-disable @typescript-eslint/no-var-requires */
import { CommandInteraction } from "discord.js";
import config from "../config/config";
import Commands from "../config/commands"
import { PermissionLevel } from "../Interfaces/Command";
import DTelClient from "../internals/client";
import Command from "../Internals/Command";
import Path from "path";

interface Constructable<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new(...args: any) : T;
}

export default async(client: DTelClient, interaction: CommandInteraction): Promise<void> => {
	const winston = client.winston;
	const commandData = Commands.find(c => c.name === interaction.commandName);
	if (!commandData) {
		client.winston.error(`Cannot find command data for registered command ${interaction.commandName}`);
		interaction.reply(":x: Command not found within bot. Contact a maintainer");
		return;
	}

	// trailing slash is required
	let commandPath = `${Path.resolve("./commands")}/`;
	switch (commandData.useType) {
		case CommandType.standard: {
			commandPath += "standard";
			break;
		}
		case CommandType.call: {
			commandPath += "call";
			break;
		}
		case CommandType.customerSupport: {
			commandPath += "support";
			break;
		}
		case CommandType.maintainer: {
			commandPath += "maintainer";
			break;
		}
	}
	commandPath += `/${interaction.commandName}`;
	console.log(commandPath);

	let commandFile: Constructable<Command>;
	try {
		if (config.devMode) {
			delete require.cache[require.resolve(commandPath)];
		}
		commandFile = require(commandPath).default;
		if (!commandFile) throw new Error();
	} catch {
		winston.error(`Cannot find command file for command ${interaction.commandName}`);
		interaction.reply(":x: Command not yet implemented in rewrite.");
		return;
	}

	const commandClass = new commandFile(client, interaction, commandData);
	try {
		if (commandData.permissionLevel == PermissionLevel.owner) {
			if (config.maintainers.includes(interaction.user.id)) {
				winston.info(`Running command ${interaction.commandName}`);
				commandClass._run();
			} else {
				commandClass.notMaintainer();
			}
		} else {
			commandClass._run();
		}
	} catch (e) {
		winston.error(`Error occurred whilst executing command ${interaction.commandName}`, e);
		interaction.reply(":x: An error occurred whilst executing this command.");
	}
};
