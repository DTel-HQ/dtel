import { client } from "@src/instances/client";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { hangupInDb } from "@src/internals/calls/db/hangup-in-db/HangupInDb";
import { getCallFromCacheForChannel } from "@src/redis/operations/GetCallFromCacheForChannel";

export const getCallByChannelOrEndIfASideDoesNotExist = async(channelId: string): Promise<CallsWithNumbers | undefined> => {
	// We don't get from the DB here, only from cache
	const callWithPotentialNumbers = await getCallFromCacheForChannel(channelId);
	if (!callWithPotentialNumbers) return undefined;

	if (!callWithPotentialNumbers.from || !callWithPotentialNumbers.to) {
		// We have lost a side of a call, remove it from active calls
		await hangupInDb(callWithPotentialNumbers, "number-deleted");

		// Whichever one is not null is the side we probably still have
		const sideWeProbablyStillHave = callWithPotentialNumbers.from ?? callWithPotentialNumbers.to;

		if (!sideWeProbablyStillHave?.channelID) {
			client.winston.warn(`Call ${callWithPotentialNumbers.id} is missing both sides, deleted from active calls.`);
			return undefined;
		}

		client.winston.warn(`Call ${callWithPotentialNumbers.id} is missing a side, deleted from active calls.`);
		await client.sendCrossShard("❌ We lost contact with the other side. This call has been ended. Please try your call again", sideWeProbablyStillHave?.channelID);
		return undefined;
	}

	return callWithPotentialNumbers as CallsWithNumbers;
};
