import { CommandInteraction, Interaction, MessageComponentInteraction } from "discord.js";
import HandleCommandInteraction from "./commandInteraction";
import HandleMessageComponentInteraction from "./componentInteraction";
import DTelClient from "../internals/client";

export default async(client: DTelClient, _interaction: Interaction): Promise<void> => {
	switch (_interaction.type) {
		case "APPLICATION_COMMAND": {
			HandleCommandInteraction(client, _interaction as CommandInteraction);
			break;
		}
		case "MESSAGE_COMPONENT": {
			HandleMessageComponentInteraction(client, _interaction as MessageComponentInteraction);
			break;
		}
	}
};

