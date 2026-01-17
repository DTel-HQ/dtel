import { redis } from "@src/redis/redis";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export const updateCacheWithCall = async(call: CallsWithNumbers): Promise<void> => {
	await redis.set(`call-for-channel:${call.from.channelID}`, JSON.stringify(call));
	await redis.set(`call-for-channel:${call.to.channelID}`, JSON.stringify(call));
};
