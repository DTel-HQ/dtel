import ComponentProcessor from "../../internals/componentProcessor";
import { MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { TextInputStyles } from "discord.js/typings/enums";

export default class WizardReady extends ComponentProcessor {
	async run(): Promise<void> {
		const modal = new Modal()
			.setTitle("DTel Phone Number Registry")
			.setCustomId("wizard-modalSubmit");

		const numberInputComponent = new TextInputComponent()
			.setCustomId("wizardNumber")
			.setLabel("Enter the number you would like to register:")
			.setRequired(true)
			.setMaxLength(11)
			.setMinLength(11)
			.setPlaceholder(this.interaction.guild ? "0301xxxxxxx" : "0900xxxxxxx")
			.setStyle(TextInputStyles.SHORT);

		const row = new MessageActionRow<ModalActionRowComponent>();
		row.addComponents(numberInputComponent);

		modal.addComponents(row);

		this.interaction.showModal(modal);
	}
}
