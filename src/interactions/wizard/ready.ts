import ComponentProcessor from "../../internals/componentProcessor";
import { ButtonInteraction, MessageActionRow, Modal, ModalActionRowComponent, TextInputComponent } from "discord.js";
import { TextInputStyles } from "discord.js/typings/enums";

export default class WizardReadyButton extends ComponentProcessor {
	async _run(): Promise<void> {
		super._run();

		this.client.editCrossShard({
			embeds: this.interaction.message.embeds,
			components: [],
		}, this.interaction.channelId, this.interaction.message.id);
	}

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
			.setPlaceholder(`${this.numberShouldStartWith()}xxxxxxx`)
			.setStyle(TextInputStyles.SHORT);

		const row = new MessageActionRow<ModalActionRowComponent>();
		row.addComponents(numberInputComponent);

		modal.addComponents(row);

		interaction.showModal(modal);
	}
}
