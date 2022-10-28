import { ModalBuilder, TextInputBuilder } from "@discordjs/builders";
import { ActionRowBuilder, TextInputStyle } from "discord.js";
import ComponentProcessor from "../../../internals/componentProcessor";

export default class MailboxSendInitiate extends ComponentProcessor {
	async run(): Promise<void> {
		const toSendNum = this.interaction.customId.replace("mailbox-send-initiate-", "");

		const modal = new ModalBuilder()
			.setTitle("Send a message")
			.setCustomId(`mailbox-send-modal-${toSendNum}`)
			.addComponents([
				new ActionRowBuilder<TextInputBuilder>().addComponents([
					new TextInputBuilder()
						.setCustomId("message")
						.setLabel("Message")
						.setPlaceholder("Enter your message here")
						.setStyle(TextInputStyle.Short)
						.setRequired(true),
				]),
			]);

		this.interaction.showModal(modal);
	}
}
