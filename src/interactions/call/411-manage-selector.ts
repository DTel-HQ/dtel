import { SelectMenuInteraction } from "discord.js";
import MessageComponentProcessor from "@src/internals/componentProcessor";
import { FourOneOneEdit } from "./411-selector";
import { fourOneOneMainMenu } from "@src/commands/standard/call";

export default class Call411EditSelectorSelect extends MessageComponentProcessor<SelectMenuInteraction> {
	async run(): Promise<void> {
		const selected = this.interaction.values[0];

		switch (selected) {
			case "add": {
				await FourOneOneEdit.handleAddInteraction(this.interaction);
				break;
			}
			case "edit": {
				await FourOneOneEdit.handleEditInteraction(this.interaction);
				break;
			}
			case "delete": {
				await FourOneOneEdit.handleDeleteInteraction(this.interaction);
				break;
			}
			case "back": {
				await this.interaction.deferUpdate();
				await this.interaction.message!.edit(fourOneOneMainMenu);
				break;
			}
		}
	}
}
