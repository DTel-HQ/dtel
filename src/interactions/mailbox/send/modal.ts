import ModalProcessor from "../../../internals/modalProcessor";
import { randomString } from "../../../internals/utils";

export default class MailboxSendModalResponse extends ModalProcessor {
	async run(): Promise<void> {
		const toSendNum = this.interaction.customId.replace("mailbox-send-modal-", "");

		const toSendMailbox = await this.db.mailbox.findUnique({
			where: {
				number: toSendNum,
			},
			include: {
				numberDoc: true,
			},
		});

		toSendMailbox!.messages.push({
			id: randomString(6),
			from: this.number!.number,
			message: this.interaction.fields.getTextInputValue("message"),
			sent: {
				at: new Date(),
				by: this.interaction.user.id,
			},
		});

		await this.db.mailbox.update({
			where: {
				number: toSendMailbox!.number,
			},
			data: {
				messages: toSendMailbox!.messages,
			},
		});

		this.interaction.reply("📫 Sent!");

		this.client.sendCrossShard({
			embeds: [{
				color: this.config.colors.info,
				title: "📫 New message!",
				description: "You've received a new message!",
				fields: [{
					name: "From",
					value: this.number!.number,
					inline: true,
				}, {
					name: "Message",
					value: this.interaction.fields.getTextInputValue("message"),
					inline: true,
				}],
			}],
		}, toSendMailbox!.numberDoc!.channelID);
	}
}
