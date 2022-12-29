import { StringSelectMenuOptionBuilder } from "@discordjs/builders";
import { ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import Command from "../../internals/commandProcessor";

export default class MailboxDelete extends Command {
	async run(): Promise<void> {
		const selectMenu = new StringSelectMenuBuilder()
			.setCustomId("mailbox-delete-select")
			.setPlaceholder("Select a message to delete")
			.setMaxValues(1);

		const mailbox = await this.fetchMailbox();
		if (mailbox.messages.length === 0) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("Your mailbox is empty!")],
			});
			return;
		}

		for (let i = 0; i < mailbox.messages.length && i < 25; i++) {
			const message = mailbox.messages[i];
			const opt = new StringSelectMenuOptionBuilder();
			opt.setLabel(message.id);
			opt.setDescription(message.message);
			opt.setValue(message.id);

			selectMenu.addOptions(opt);
		}


		let description = "Select a message to delete.";
		if (mailbox.messages.length >= 25) {
			description += " Can't see some messages? Only the first 25 messages are shown.";
		}

		this.interaction.reply({
			embeds: [{
				color: this.config.colors.info,
				title: "📭 Delete Messages",
				description: description,
			}],
			components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents([selectMenu])],
		});
	}
}
