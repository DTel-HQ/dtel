import { ButtonInteraction } from "discord.js";
import ComponentProcessor from "../../internals/componentProcessor";
import { FourOneOneSearch } from "./411-selector";

export default class Call411SearchNext extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		FourOneOneSearch.page(this.interaction as ButtonInteraction, Number(this.commandData.params![0]), this.commandData.params![1], false);
	}
}
