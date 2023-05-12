import { SelectMenuInteraction } from "discord.js";
import MessageComponentProcessor from "../../internals/componentProcessor";
import { FourOneOneEdit } from "./411-selector";
import { fourOneOneMainMenu } from "../../commands/standard/call";

export default class Call411EditSelectorSelect extends MessageComponentProcessor<SelectMenuInteraction> {
	async run(): Promise<void> {
		const selected = this.interaction.values[0];

		switch (selected) {
			case "add": {
				FourOneOneEdit.handleAddInteraction(this.interaction);
				break;
			}
			case "edit": {
				FourOneOneEdit.handleEditInteraction(this.interaction);
				break;
			}
			case "delete": {
				FourOneOneEdit.handleDeleteInteraction(this.interaction);
				break;
			}
			case "back": {
				this.interaction.deferUpdate();
				this.interaction.message!.edit(fourOneOneMainMenu);
				break;
			}
		}
	}
}
