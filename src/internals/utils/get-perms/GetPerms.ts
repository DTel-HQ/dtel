import config from "@src/config/config";
import { client } from "@src/instances/client";
import { PermissionLevel } from "@src/interfaces/commandData";
import { Collection } from "discord.js";

export const permsCache = new Collection<string, PermissionLevel>();

export const getPerms = async(userId: string): Promise<PermissionLevel> => {
	// We don't deal with serverAdmin here
	if (config.maintainers.includes(userId)) return PermissionLevel.maintainer;

	// Get perms from cache
	const permsFromCache = permsCache.get(userId);
	if (permsFromCache) return permsFromCache;

	const supportGuild = await client.guilds.fetch(config.supportGuild.id);
	const member = await supportGuild.members.fetch(userId).catch(() => null);

	const roles = member?.roles.cache;

	let permsFromGuild: PermissionLevel;
	if (!roles || roles.size === 0) permsFromGuild = PermissionLevel.none;
	else if (roles.get(config.supportGuild.roles.manager)) permsFromGuild = PermissionLevel.manager;
	else if (roles.get(config.supportGuild.roles.customerSupport)) permsFromGuild = PermissionLevel.customerSupport;
	else if (roles.get(config.supportGuild.roles.contributor)) permsFromGuild = PermissionLevel.contributor;
	else if (roles.get(config.supportGuild.roles.donator)) permsFromGuild = PermissionLevel.donator;
	else permsFromGuild = PermissionLevel.none;

	// Rolling cache, I have a strange feeling this will cause issues in the future
	if (permsCache.size > 200) {
		for (const i of permsCache.lastKey(200 - permsCache.size)!) {
			permsCache.delete(i);
		}
	}
	// Cache user if they're not cached on this shard already
	permsCache.set(userId, permsFromGuild);

	return permsFromGuild;
};
