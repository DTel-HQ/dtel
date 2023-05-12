import { StringSelectMenuInteraction } from "discord.js";
import FourOneOneVIP from "../../internals/411/vip";
import ComponentProcessor from "../../internals/componentProcessor";

export default class Call411VIPHideSelector extends ComponentProcessor<StringSelectMenuInteraction> {
	async run(): Promise<void> {
		FourOneOneVIP.hideCallerIDSelector(this.interaction);
	}
}
