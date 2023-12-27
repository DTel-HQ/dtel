import { ActiveCalls } from "@prisma/client";
import { getCallById } from "@src/internals/calls/get-from-db-by-id/GetCallById";
import { removeComponentsFromMessage } from "@src/internals/calls/utils/remove-components-from-message/RemoveComponentsFromMessage";

export const startPickupTimer = async(callId: ActiveCalls["id"], notificationMessageId?: string) => {
	setTimeout(async() => {
		const updatedCall = await getCallById(callId);
		if (!updatedCall || updatedCall.pickedUp?.by) return;

		// TODO: Delete and propagate
		if (!updatedCall.to || !updatedCall.from) return;

		try {
			if (notificationMessageId) {
				await removeComponentsFromMessage(updatedCall.to?.channelID, notificationMessageId);
			}

			this.toSend({
				embeds: [this.to.t("missedCall.toSide") as APIEmbed],
			});

			const fromEmbed = EmbedBuilder.from(this.from.t("missedCall.fromSide") as APIEmbed);
			const toMailbox = await db.mailbox.findFirst({
				where: {
					number: this.to.number,
				},
			});

			if (toMailbox) {
				const mailboxFull = toMailbox?.messages.length > 50;

				let reply = `${toMailbox.autoreply}`;

				if (mailboxFull) reply += " (Mailbox full)";

				fromEmbed.addFields([{
					name: this.from.t("answeringMachine"),
					value: reply,
				}]);
			}

			const canSendMessage = toMailbox?.receiving && toMailbox?.messages.length < 25;

			this.fromSend({
				embeds: [fromEmbed],
				components: canSendMessage ? [new ActionRowBuilder<ButtonBuilder>().addComponents([
					new ButtonBuilder()
						.setCustomId(`mailbox-send-initiate-${this.toNum}`)
						.setEmoji("📬")
						.setLabel(this.from.t("sendMessage"))
						.setStyle(ButtonStyle.Primary),
				])] : undefined,
			});
		} catch {
			// Ignore
		}

		if (this.randomCall) {
			this.client.log(`❎ Random Call \`${this.from.channelID} → ${this.to.channelID}\` was not picked up.\nCall ID: \`${this.id}\``);
		}
		this.endHandler("missed");
	}, 2 * 60 * 1000);
};
