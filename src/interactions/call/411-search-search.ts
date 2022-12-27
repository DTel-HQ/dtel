import { ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import ComponentProcessor from "../../internals/componentProcessor";

export default class Call411SearchNext extends ComponentProcessor<ButtonInteraction> {
	async run(): Promise<void> {
		const modal = new ModalBuilder()
			.setCustomId("call-411-search-modal-submit")
			.setTitle("🔎 Yellowbook Search");

		modal.addComponents(
			new ActionRowBuilder<TextInputBuilder>().addComponents(
				new TextInputBuilder()
					.setLabel("Search")
					.setPlaceholder("Search for something in the Yellowbook")
					.setMinLength(3)
					.setMaxLength(100)
					.setStyle(TextInputStyle.Short)
					.setRequired(true)
					.setCustomId("search-query"),
			),
		);

		this.interaction.showModal(modal);
	}
}
