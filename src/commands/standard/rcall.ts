import Command from "../../internals/commandProcessor";
import config from "../../config/config";
import { APIEmbed } from "discord.js";
import { Numbers, Phonebook, Prisma } from "@prisma/client";
import CallCommand from "./call";

export default class RCall extends Command {
	async run(): Promise<void> {
		await this.interaction.deferReply();

		let toCall: Numbers | null = null;

		let cycle = 0;
		// Presume the Phonebook always has at least 1 number
		while (!toCall) {
			cycle++;
			if (cycle > 100) {
				this.interaction.editReply("❌ Couldn't find a number to call.");
				return;
			}

			const randomEntry = (await this.db.phonebook.aggregateRaw({
				pipeline: [{
					$match: {
						number: {
							$ne: this.number!.number,
						}, // Don't get this channel's number
					},
				}, {
					$sample: {
						size: 1,
					},
				}],
			}) as unknown as Prisma.JsonObject[])[0];


			const number = await this.db.numbers.findUnique({
				where: {
					number: randomEntry._id as string,
				},
				include: {
					incomingCalls: {
						where: {
							active: true,
						},
					},
					outgoingCalls: {
						where: {
							active: true,
						},
					},
				},
			});

			// If this number doesn't exist then delete it's Yellowbook entry and try again.
			if (!number) {
				await this.db.phonebook.delete({
					where: {
						number: randomEntry._id as string,
					},
				});
				continue;
			}

			// Number is in a call, try again
			if (number?.outgoingCalls.length > 0 || number.incomingCalls.length > 0) continue;

			const channel = await this.client.getChannel(number.channelID);
			if (!channel) {
				await this.db.phonebook.delete({
					where: {
						number: number.number,
					},
				});
				continue;
			}

			console.log(number.channelID);
			if (number.expiry < new Date() || (this.number?.blocked && this.number.blocked.includes(number.number))) continue;

			toCall = number;
		}

		this.interaction.editReply("☎️ Found a number! Dialling...");

		CallCommand.call(this.interaction, toCall.number, this.number!, true);
	}
}
