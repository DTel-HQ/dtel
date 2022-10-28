import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class MailboxClear extends Command {
	async run(): Promise<void> {
		const mailbox = await this.fetchMailbox();

		if (mailbox.messages.length === 0) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("Your mailbox is already empty!")],
				ephemeral: true,
			});
			return;
		}

		this.interaction.reply({
			embeds: [this.client.warningEmbed("Are you sure you want to do this? Your messages cannot be recovered.")],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents([
					new ButtonBuilder()
						.setCustomId("mailbox-clear-confirm")
						.setEmoji("👍")
						.setLabel("Confirm")
						.setStyle(ButtonStyle.Danger),
				]),
			],
			ephemeral: true,
		});
	}
}
