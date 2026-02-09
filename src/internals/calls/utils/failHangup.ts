import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { hangupInDb } from "@src/internals/calls/db/hangup-in-db/HangupInDb";
import { client } from "@src/instances/client";

export const failHangup = async(call: CallsWithNumbers, reason: string): Promise<void> => {
	hangupInDb(call, reason).catch(() => null);

	await client.sendCrossShard("Failed to get shard for this call. The call will be ended.", call.from.channelID).catch(() => null);
	await client.sendCrossShard("Failed to get shard for this call. The call will be ended.", call.to.channelID).catch(() => null);
};
