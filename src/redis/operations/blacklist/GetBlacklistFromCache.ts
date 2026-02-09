import { winston } from "@src/instances/winston";
import { redis } from "@src/redis/redis";

export const isBlacklisted = async(id: string): Promise<boolean> => {
	try {
		const json = await redis.get(`blacklist:${id}`);
		if (!json) return false;

		return true;
	} catch (error) {
		winston.error(`Failed to get blacklist item from cache for ID ${id}`, error);
		return false;
	}
};
