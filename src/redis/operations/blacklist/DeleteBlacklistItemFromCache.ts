import { redis } from "@src/redis/redis";

export const deleteBlacklistItemFromCache = (id: string) => redis.del(`blacklist:${id}`);
