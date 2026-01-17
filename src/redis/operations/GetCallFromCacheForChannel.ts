import { winston } from "@src/instances/winston";
import { redis } from "@src/redis/redis";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export const getCallFromCacheForChannel = async(channelID: string): Promise<CallsWithNumbers | undefined> => {
	try {
		const json = await redis.get(`call-for-channel:${channelID}`);

		if (!json) return undefined;

		return JSON.parse(json) as CallsWithNumbers;
	} catch (error) {
		winston.error(`Failed to get call from cache for channel ${channelID}`, error);
		return undefined;
	}
};
