import { ActiveCalls } from "@prisma/client";
import { winston } from "@src/instances/winston";
import { getCallById } from "@src/internals/calls/get-from-db-by-id/GetCallById";
import { endMissedCall } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/end-call/EndMissedCall";
import { sendMissedCallFromSideEmbed } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/send-message/SendMissedCallFromSideEmbed";
import { logMissedCall } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/log/LogMissedCall";
import { sendMissedCallMessageToSide } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/to/send-message/SendMissedCallMessageToSide";
import { removeComponentsFromMessage } from "@src/internals/calls/utils/remove-components-from-message/RemoveComponentsFromMessage";
import { getNumberLocale } from "@src/internals/utils/get-number-locale/GetNumberLocale";

export const startPickupTimer = async(callId: ActiveCalls["id"], notificationMessageId?: string): Promise<void> => {
	winston.verbose(`Starting pickup timer for call ${callId}`);
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

		logMissedCall(updatedCall, updatedCall.to, updatedCall.from);

		endMissedCall(updatedCall);
	}, 2 * 60 * 1000);
};
