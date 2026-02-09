import { ButtonInteraction } from "discord.js";
import ComponentProcessor from "@src/internals/componentProcessor";
import { FourOneOneSearch } from "./411-selector";

export default class Call411SearchNext extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		await FourOneOneSearch.exit(this.interaction);
	}
}
