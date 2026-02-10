import { db } from "@src/database/db";
import { callReminderIntervals } from "@src/instances/calls";
import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";
import { getCallByChannel } from "@src/internals/calls/db/get-by-channel/GetCallByChannel";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { DiscordAPIError, RESTJSONErrorCodes } from "discord.js";
import { failHangup } from "@src/internals/calls/utils/failHangup";

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

		try {
			await client.sendCrossShard(reminderMessage, call.from.channelID);
			await client.sendCrossShard(reminderMessage, call.to.channelID);
		} catch (error) {
			if (error instanceof DiscordAPIError && (error.code === RESTJSONErrorCodes.MissingPermissions || error.code === RESTJSONErrorCodes.MissingAccess)) {
				winston.warn(`Missing access to send reminder for call ID: ${call.id} in channel ${call.from.channelID} or ${call.to.channelID}. Stopping reminders.`);
				clearInterval(interval);
				callReminderIntervals.delete(call.id);

				await failHangup(call, "missing-permissions");
			} else { throw error; }
		}
	}, 2 * 60 * 1000); // Every 2 minutes

	callReminderIntervals.set(call.id, interval);
};
