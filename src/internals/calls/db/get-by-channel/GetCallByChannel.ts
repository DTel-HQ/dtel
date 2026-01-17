import { db } from "@src/database/db";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { CallsWithPotentialNumbers } from "@src/internals/calls/db/get-by-id/GetCallById";
import { getCallFromCacheForChannel } from "@src/redis/operations/GetCallFromCacheForChannel";
import { updateCacheWithCall } from "@src/redis/operations/UpdateCacheWithCall";

export const getCallByChannel = async(channelId: string): Promise<CallsWithPotentialNumbers | null> => {
	const redisCacheHit = await getCallFromCacheForChannel(channelId);
	if (redisCacheHit) return redisCacheHit;

	const result = await db.activeCalls.findFirst({
		where: {
			OR: [
				{ from: {
					channelID: channelId,
				} },
				{ to: {
					channelID: channelId,
				} },
			],
		},
		include: {
			from: true,
			to: true,
		},
	});


	if (result && result.from && result.to) {
		updateCacheWithCall(result as CallsWithNumbers);
	}


	return result;
};
