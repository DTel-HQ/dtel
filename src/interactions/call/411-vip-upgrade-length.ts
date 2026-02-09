import { StringSelectMenuInteraction } from "discord.js";
import ComponentProcessor from "@src/internals/componentProcessor";
import FourOneOneVIP from "@src/internals/411/vip";

export default class Call411VIPSelector extends ComponentProcessor<StringSelectMenuInteraction> {
	async run(): Promise<void> {
		await FourOneOneVIP.handleUpgradeLengthSelectionInteraction(this.interaction);
	}
}
