import { ActionRowBuilder, SelectMenuBuilder, SelectMenuComponent, SelectMenuInteraction } from "discord.js";
import ComponentProcessor from "../../../internals/componentProcessor";

export default class MailboxDeleteSelect extends ComponentProcessor {
	async run(): Promise<void> {
		const interaction = this.interaction as SelectMenuInteraction;
		const origSelectMenu = interaction.component as SelectMenuComponent;

		// Get this number's mailbox
		const mailbox = await this.fetchMailbox();

		// See if the message actually exists
		const message = mailbox.messages.find(m => m.id === interaction.values[0]);
		if (!message) {
			this.interaction.reply({
				embeds: [this.client.errorEmbed("That message doesn't exist!")],
				ephemeral: true,
			});
			return;
		}

		const selectedMessageID = interaction.values[0];
		// "Disable" the select menu
		const selectedMessageContent = origSelectMenu.options.find(o => o.value === selectedMessageID)!.label;

		// Build a new menu with no components and some placeholder text
		const selector = new SelectMenuBuilder(origSelectMenu.data)
			.setPlaceholder(selectedMessageContent)
			.setDisabled(true);

		this.interaction.message?.edit({
			components: [new ActionRowBuilder<SelectMenuBuilder>().addComponents([selector])],
		});

		const allMessages = mailbox.messages;
		allMessages.splice(allMessages.findIndex(m => m.id === selectedMessageID), 1);

		await this.db.mailbox.update({
			where: {
				number: mailbox.number,
			},
			data: {
				messages: allMessages,
			},
		});

		this.interaction.reply({
			embeds: [{
				color: 0x00FF00,
				title: "📭 Message Deleted",
				description: `Message ID **${selectedMessageID}** has been deleted.`,
			}],
			ephemeral: true,
		});
	}
}
