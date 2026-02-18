import { CallsWithPotentialNumbers } from "@src/internals/calls/db/get-by-id/GetCallById";
import { redis } from "@src/redis/redis";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export const deleteCallFromCache = async(call: CallsWithNumbers | CallsWithPotentialNumbers): Promise<void> => {
	if (call.from) await redis.del(`call-for-channel:${call.from.channelID}`);
	if (call.to) await redis.del(`call-for-channel:${call.to.channelID}`);
};
