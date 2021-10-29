// import { ApplicationCommandOptionChoice } from "discord.js";
import DTelClient from "../internals/client";
import Commands from "../config/commands";
import { PermissionLevel } from "../interfaces/command";

export default (client: DTelClient): void => {
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user.tag}`);

	// client.application.commands.set(client.commands);
	client.application.commands.set(client.commands, "398980667553349649");
};

