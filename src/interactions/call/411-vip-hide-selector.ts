import { StringSelectMenuInteraction } from "discord.js";
import FourOneOneVIP from "@src/internals/411/vip";
import ComponentProcessor from "@src/internals/componentProcessor";

export default class Call411VIPHideSelector extends ComponentProcessor<StringSelectMenuInteraction> {
	async run(): Promise<void> {
		await FourOneOneVIP.hideCallerIDSelector(this.interaction);
	}
}
