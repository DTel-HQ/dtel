import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction, EmbedBuilder, EmbedField, MessageComponentInteraction } from "discord.js";
import config from "../../config/config";
import { db } from "../../database/db";
import { client } from "../../dtel";
import Command from "../../internals/commandProcessor";

export default class MailboxMessages extends Command {
	async run(): Promise<void> {
		MailboxMessages.displayMessages(this.interaction, this.number!.number, 1);
	}

	static async displayMessages(interaction: CommandInteraction|MessageComponentInteraction, number: string, page = 1) {
		const mailbox = await db.mailbox.upsert({
			create: {
				number,
			},
			where: {
				number,
			},
			update: {},
		});

		if (mailbox.messages.length === 0) {
			interaction.reply({
				embeds: [client.errorEmbed("Your mailbox is empty.")],
				ephemeral: true,
			});
			return;
		}

		const embed = new EmbedBuilder()
			.setColor(config.colors.info)
			.setTitle(`📬 You have ${mailbox.messages.length} messages.`);

		const itemsPerPage = 5;
		const offset = (page - 1) * itemsPerPage;
		const pages = Math.ceil(mailbox.messages.length / itemsPerPage);

		if (offset > (itemsPerPage * page) || offset > mailbox.messages.length) {
			interaction.reply({
				embeds: [client.errorEmbed("Your mailbox is not sufficiently full.")],
				ephemeral: true,
			});
			return;
		}

		const fields: EmbedField[] = [];

		for (let i = offset; i < (itemsPerPage * page) && i < mailbox.messages.length; i++) {
			const msg = mailbox.messages[i];
			fields.push({
				name: `ID \`${msg.id}\` from ${msg.from}`,
				value: msg.message,
				inline: false,
			});
		}

		embed.setFields(fields);

		if (pages > 1) {
			embed.setFooter({
				text: `Page ${page}/${pages}`,
			});
		}

		const actionRow = new ActionRowBuilder<ButtonBuilder>();

		if (pages > 1) {
			actionRow.addComponents(
				new ButtonBuilder()
					.setCustomId(`mailbox-messages-prev-${page - 1}`)
					.setLabel("Previous")
					.setEmoji("◀️")
					.setStyle(ButtonStyle.Secondary)
					.setDisabled(page === 1),
			);
			actionRow.addComponents(
				new ButtonBuilder()
					.setCustomId(`mailbox-messages-next-${page + 1}`)
					.setLabel("Next")
					.setEmoji("▶️")
					.setStyle(ButtonStyle.Primary)
					.setDisabled(page === pages),
			);
		}


		if (interaction instanceof MessageComponentInteraction) {
			interaction.message.edit({
				embeds: [embed],
				components: [actionRow],
			});

			interaction.deferUpdate();
		} else {
			interaction.reply({
				embeds: [embed],
				components: [actionRow],
			});
		}
	}
}
