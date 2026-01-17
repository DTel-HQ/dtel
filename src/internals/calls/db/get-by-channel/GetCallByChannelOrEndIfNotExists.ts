import { deleteCallById } from "@src/internals/calls/db/delete-from-db-by-id/DeleteCallById";
import { getCallByChannel } from "./GetCallByChannel";
import { client } from "@src/instances/client";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export const getCallByChannelOrEndIfNotExists = async(channelId: string): Promise<CallsWithNumbers | undefined> => {
	const potentialNumbers = await getCallByChannel(channelId);
	if (!potentialNumbers) return undefined;

	if (!potentialNumbers.from || !potentialNumbers.to) {
		// We have lost a side of a call, remove it from active calls
		await deleteCallById(potentialNumbers.id);

		// Whichever one is not null is the side we probably still have
		const sideWeProbablyStillHave = potentialNumbers.from ?? potentialNumbers.to;

		if (!sideWeProbablyStillHave?.channelID) {
			client.winston.error(`Call ${potentialNumbers.id} is missing both sides, deleted from active calls.`);
			return undefined;
		}

		client.winston.warn(`Call ${potentialNumbers.id} is missing a side, deleted from active calls.`);
		client.sendCrossShard("We lost contact with the other side. This call has been ended. Please try your call again", sideWeProbablyStillHave?.channelID);
		return undefined;
	}

	return potentialNumbers as CallsWithNumbers;
};
