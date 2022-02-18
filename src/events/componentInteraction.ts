/* eslint-disable @typescript-eslint/no-var-requires */
import { MessageComponentInteraction } from "discord.js";
import DTelClient from "../internals/client";
import ComponentProcessor from "../internals/componentProcessor";

interface Constructable<T> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new(...args: any) : T;
}

export default async(client: DTelClient, interaction: MessageComponentInteraction): Promise<void> => {
	const split = interaction.customId.split("-");
	console.log(split)
	if (split.length < 2) {
		interaction.reply({
			embeds: [client.errorEmbed("Unexpected internal error.")],
		});
		client.winston.error(`Message component interaction custom ID not valid.`);
		return;
	}
	const commandName = split[0];
	const interactionName = split[1];

	const basePath = `${__dirname}/../interactions/${commandName}/${interactionName}`;
	console.log(basePath);

	let processorFile: Constructable<ComponentProcessor>;
	try {
		if (client.config.devMode) {
			delete require.cache[require.resolve(basePath)];
		}
		processorFile = require(basePath).default;
		if (!processorFile) throw new Error();
	} catch {
		client.winston.error(`Cannot find interaction for ID: ${interaction.customId}`);
		interaction.reply(":x: Interaction not yet implemented.");
		return;
	}

	const processorClass = new processorFile(client, interaction);
	try {
		client.winston.info(`Running interaction: ${interaction.customId}`);
		processorClass.run();
	} catch (e) {
		client.winston.error(`Error occurred whilst executing interaction ${interaction.customId}`, e);
		interaction.reply(":x: An error occurred whilst executing this command.");
	}
};
