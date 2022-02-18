import ComponentProcessor from "../../internals/componentProcessor";
import { ButtonInteraction, MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { TextInputStyles } from "discord.js/typings/enums";

export default class WizardReady extends ComponentProcessor {
	async run(): Promise<void> {
		const interaction = this.interaction as ButtonInteraction;

		const modal = new Modal()
			.setTitle(this.t("modal.title"))
			.setCustomId("wizard-modalSubmit");

		const numberInputComponent = new TextInputComponent()
			.setCustomId("wizardNumber")
			.setLabel(this.t("modal.numberLabel"))
			.setRequired(true)
			.setMaxLength(11)
			.setMinLength(11)
			.setPlaceholder(this.interaction.guild ? "0301xxxxxxx" : "0900xxxxxxx")
			.setStyle(TextInputStyles.SHORT);

		const row = new MessageActionRow<ModalActionRowComponent>();
		row.addComponents(numberInputComponent);

		modal.addComponents(row);

		interaction.showModal(modal);
	}
}
