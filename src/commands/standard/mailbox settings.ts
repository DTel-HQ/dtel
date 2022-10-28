import { ActionRowBuilder } from "@discordjs/builders";
import { ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class MailboxSettings extends Command {
	async run(): Promise<void> {
		const mailbox = await this.fetchMailbox();

		const modal = new ModalBuilder()
			.setCustomId("mailbox-settings-update")
			.setTitle("Mailbox Settings")
			.addComponents([
				new ActionRowBuilder<TextInputBuilder>().addComponents([
					new TextInputBuilder()
						.setCustomId("autoreply")
						.setValue(mailbox.autoreply)
						.setLabel("Automatic Reply")
						.setStyle(TextInputStyle.Short)
						.setMinLength(0)
						.setRequired(true),
				]),
				new ActionRowBuilder<TextInputBuilder>().addComponents([
					new TextInputBuilder()
						.setCustomId("active")
						.setValue(mailbox.receiving ? "ON" : "OFF")
						.setLabel("Message Receiving")
						.setPlaceholder("ON/OFF")
						.setRequired(true)
						.setMinLength(2)
						.setMaxLength(3)
						.setStyle(TextInputStyle.Short),
				]),
			]);

		this.interaction.showModal(modal);
	}
}
