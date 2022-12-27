import ComponentProcessor from "../../internals/componentProcessor";
import { TextInputBuilder, ModalBuilder, ActionRowBuilder, ButtonInteraction, TextInputStyle } from "discord.js";

export default class WizardReadyButton extends ComponentProcessor<ButtonInteraction> {
	async _run(): Promise<void> {
		super._run();

		this.client.editCrossShard({
			embeds: this.interaction.message.embeds,
			components: [],
		}, this.interaction.channelId, this.interaction.message.id);
	}

	async run(): Promise<void> {
		const modal = new ModalBuilder()
			.setTitle(this.t("modal.title"))
			.setCustomId("wizard-modalSubmit");

		const numberInputComponent = new TextInputBuilder()
			.setCustomId("wizardNumber")
			.setLabel(this.t("modal.numberLabel"))
			.setRequired(true)
			.setMaxLength(11)
			.setMinLength(11)
			.setPlaceholder(`${this.numberShouldStartWith()}xxxxxxx`)
			.setStyle(TextInputStyle.Short);

		const row = new ActionRowBuilder<TextInputBuilder>();
		row.addComponents(numberInputComponent);

		modal.addComponents(row);

		this.interaction.showModal(modal);
	}
}
