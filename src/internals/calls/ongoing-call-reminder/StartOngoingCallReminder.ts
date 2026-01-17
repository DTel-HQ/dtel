import { db } from "@src/database/db";
import { callReminderIntervals } from "@src/instances/calls";
import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { getCallByChannel } from "@src/internals/calls/db/get-by-channel/GetCallByChannel";

export const startOngoingCallReminder = (call: CallsWithNumbers): void => {
	const interval = setInterval(async() => {
		const latestCall = await getCallByChannel(call.from.channelID);
		if (!latestCall) {
			clearInterval(interval);
			callReminderIntervals.delete(call.id);
			return;
		}

		const latestMessage = await db.callMessages.findFirst({
			where: {
				callID: call.id,
			},
			orderBy: {
				sentAt: "desc",
			},
		});


		if (latestMessage && (latestMessage.sentAt.getTime() + (2 * 60 * 1000) > Date.now())) {
			// Last message was sent less than 2 minutes ago, don't send reminder
			return;
		}

		winston.silly(`Sending ongoing call reminder for call ID: ${call.id}`);
		const reminderMessage = `💡 Reminder: You still have an ongoing call (${call.id}). You can type \`/hangup\` to end it.`;

		client.sendCrossShard(reminderMessage, call.from.channelID);
		client.sendCrossShard(reminderMessage, call.to.channelID);
	}, 2 * 60 * 1000); // Every 2 minutes

	callReminderIntervals.set(call.id, interval);
};
