import { ActiveCalls } from "@prisma/client";
import { getCallById } from "@src/internals/calls/get-from-db-by-id/GetCallById";
import { sendMissedCallFromSideEmbed } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/send-message/SendMissedCallFromSideEmbed";
import { sendMissedCallMessageToSide } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/to/send-message/SendMissedCallMessageToSide";
import { removeComponentsFromMessage } from "@src/internals/calls/utils/remove-components-from-message/RemoveComponentsFromMessage";
import { getNumberLocale } from "@src/internals/utils/get-number-locale/GetNumberLocale";

export const startPickupTimer = async(callId: ActiveCalls["id"], notificationMessageId?: string) => {
	setTimeout(async() => {
		const updatedCall = await getCallById(callId);
		if (!updatedCall || updatedCall.pickedUp?.by) return;

		// TODO: Delete and propagate
		if (!updatedCall.to || !updatedCall.from) return;

		const toTranslationLocale = await getNumberLocale(updatedCall.to);
		const fromTranslationLocale = await getNumberLocale(updatedCall.from);

		try {
			if (notificationMessageId) {
				await removeComponentsFromMessage(updatedCall.to?.channelID, notificationMessageId);
			}

			await sendMissedCallMessageToSide(updatedCall.to, toTranslationLocale);
			await sendMissedCallFromSideEmbed({
				from: updatedCall.from,
				to: updatedCall.to,
				fromLocale: fromTranslationLocale,
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
