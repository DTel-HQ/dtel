// import { ApplicationCommandOptionChoice } from "discord.js";
// import { PermissionLevel } from "../interfaces/command";
import DTelClient from "../internals/client";
import Commands from "../config/commands";

export default (client: DTelClient): void => {
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user.tag}`);

	// client.application.commands.set(client.commands);
	client.application.commands.set(Commands, "385862448747511812");

	// const permsToPush: AddApplicationCommandPermissionsOptions[] = [];
	// for (const i of Commands) {
	// 	if (i.permissionLevel === PermissionLevel.owner) {
	// 		const command = client.application.commands.cache.find(c => c.name === i.name);
	// 		client.application.commands.permissions.set
	// 	}
	// }
};

