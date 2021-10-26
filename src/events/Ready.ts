// import { ApplicationCommandOptionChoice } from "discord.js";
import DTelClient from "../internals/client";
import Commands from "../config/commands";

export default (client: DTelClient): void => {
	for (const command of Commands) {
		// This might not be always needed but we'll keep it for now
		client.commands.push(command);
	}
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user.tag}`);

	// client.application.commands.set(client.commands);
	client.application.commands.set(client.commands, "398980667553349649");
};

