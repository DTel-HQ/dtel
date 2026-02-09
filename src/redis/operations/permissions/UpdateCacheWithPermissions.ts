import { PermissionLevel } from "@src/interfaces/commandData";
import { redis } from "@src/redis/redis";

export const updateCacheWithPermissions = (userId: string, permissions: Omit<PermissionLevel, "serverAdmin">) => redis.set(`permissions:${userId}`, JSON.stringify(permissions), {
	expiration: {
		type: "EX",
		value: 3600, // 1 hour
	},
});
