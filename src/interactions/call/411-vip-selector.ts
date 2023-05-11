import { StringSelectMenuInteraction } from "discord.js";
import ComponentProcessor from "../../internals/componentProcessor";
import FourOneOneVIP from "../../internals/411/vip";

export default class Call411VIPSelector extends ComponentProcessor<StringSelectMenuInteraction> {
	async run(): Promise<void> {
		FourOneOneVIP.handleSelectorSelectionInteraction(this.interaction);
	}
}
