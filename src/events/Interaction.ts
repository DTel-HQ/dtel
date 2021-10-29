import { CommandInteraction, Interaction, MessageComponentInteraction } from "discord.js";
import HandleCommandInteraction from "./commandInteraction";
import DTelClient from "../internals/client";

export default async(client: DTelClient, _interaction: Interaction): Promise<void> => {
	switch (_interaction.type) {
		case "APPLICATION_COMMAND": {
			HandleCommandInteraction(client, _interaction as CommandInteraction);
			break;
		}
		case "MESSAGE_COMPONENT": {
			const interaction = _interaction as MessageComponentInteraction;
			// if (interaction.customId.startsWith("config")) ConfigCommand.handleMessageComponentInteraction(interaction as SelectMenuInteraction, constants);
			break;
		}
	}
};
