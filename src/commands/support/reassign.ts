import { ActiveCalls, Mailbox, Numbers, Phonebook } from "@prisma/client";
import Command from "../../internals/commandProcessor";
import { parseNumber } from "../../internals/utils";
import { PermissionLevel } from "../../interfaces/commandData";
import { DMChannel } from "discord.js";


type sourceNumber = (Numbers & {
    incomingCalls: ActiveCalls[];
    outgoingCalls: ActiveCalls[];
    mailbox: Mailbox | null;
    phonebook: Phonebook | null;
}) | null;

export default class Deassign extends Command {
	async run(): Promise<void> {
		this.interaction.deferReply();

		const from = parseNumber(this.interaction.options.getString("source", true));
		const rawNumber = this.interaction.options.getString("newChannel", false);

		const newNumber = rawNumber ? parseNumber(rawNumber) : null;
		const newChannel = this.interaction.options.getString("newNumber", false);

		// Get the source number
		let fromDoc: sourceNumber;
		if (from.length > 11) {
			fromDoc = await this.db.numbers.findUnique({
				where: {
					channelID: from,
				},
				include: {
					incomingCalls: true,
					outgoingCalls: true,
					mailbox: true,
					phonebook: true,
				},
			});
		} else {
			fromDoc = await this.db.numbers.findUnique({
				where: {
					number: from,
				},
				include: {
					incomingCalls: true,
					outgoingCalls: true,
					mailbox: true,
					phonebook: true,
				},
			});
		}

		if (!fromDoc) {
			this.interaction.editReply({
				embeds: [this.client.errorEmbed("Source number not found.")],
			});
			return;
		}

		// Check that the source is a VIP number
		const srcIsVIP = fromDoc.vip ? fromDoc.vip.expiry.getTime() > Date.now() : false;
		if (!srcIsVIP && await this.getPerms() < PermissionLevel.manager) {
			this.interaction.editReply({
				embeds: [{
					color: this.config.colors.error,
					title: "Not VIP",
					description: "That number is not currently a VIP number.",
					footer: {
						text: "Contact a boss/manager to reassign this number.",
					},
				}],
			});
		}

		// Perform checks on the new number
		if (newNumber) {
			const newDoc = await this.db.numbers.findUnique({
				where: {
					number: newNumber,
				},
			});

			if (newDoc) {
				this.interaction.editReply({
					embeds: [this.client.errorEmbed("New number is already in use. Confirm ownership and deassign it first.")],
				});
				return;
			}

			fromDoc.fka.push(newNumber);
		}

		let newGuildID: string | null = null;
		let newUserID: string | null = null;

		// Perform checks on the new channel ID
		if (newChannel) {
			const newDoc = await this.db.numbers.findUnique({
				where: {
					channelID: newChannel,
				},
			});

			if (newDoc) {
				this.interaction.editReply({
					embeds: [this.client.errorEmbed("New channel is already in use. Confirm ownership and deassign its number first.")],
				});
				return;
			}

			const discordChannel = await this.client.getChannel(newChannel).catch(() => null);
			if (!discordChannel) {
				this.interaction.editReply({
					embeds: [this.client.errorEmbed("Couldn't find the new channel.")],
				});
				return;
			}

			if (discordChannel.isDMBased()) newUserID = (discordChannel as DMChannel).recipientId;
			else newGuildID = discordChannel.guildId;
		}

		const duplicatedDBEntry = await this.db.numbers.create({
			data: {
				number: newNumber || fromDoc.number,
				channelID: newChannel || fromDoc.channelID,
				guildID: newGuildID || fromDoc.guildID,
				userID: newUserID || fromDoc.userID,

				expiry: fromDoc.expiry,
				vip: fromDoc.vip,
				blocked: fromDoc.blocked,
				contacts: fromDoc.contacts,
				createdAt: fromDoc.createdAt,
				waiting: fromDoc.waiting,
				mentions: fromDoc.mentions,
				fka: {
					set: fromDoc.fka,
				},

			},
		});

		// if (fromDoc.phonebook) {
		// 	await this.db.phonebook.({
		// 		where: {
		// 			number: fromDoc.number,
		// 		},
		// 		data: {

		// 		}
		// 	})
		// }
		// TODO: WIP
	}
}
