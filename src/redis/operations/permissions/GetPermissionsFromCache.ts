import { PermissionLevel } from "@src/interfaces/commandData";
import { redis } from "@src/redis/redis";
import winston from "winston";

export const getPermissionsFromCache = async(userId: string): Promise<Omit<PermissionLevel, "serverAdmin"> | undefined> => {
	try {
		const json = await redis.get(`permissions:${userId}`);
		if (!json) return undefined;

		await redis.expire(`permissions:${userId}`, 3600); // Refresh expiration time on access

		return JSON.parse(json) as Omit<PermissionLevel, "serverAdmin">;
	} catch (error) {
		winston.error(`Failed to get permissions from cache for user ${userId}`, error);
		return undefined;
	}
};
