import { redis } from "@src/redis/redis";

export const updateCacheWithBlacklistItem = (id: string) =>
	redis.set(`blacklist:${id}`, "");

