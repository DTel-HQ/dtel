import config from "@src/config/config";
import { client } from "@src/instances/client";
import { PermissionLevel } from "@src/interfaces/commandData";
import { getPermissionsFromCache } from "@src/redis/operations/permissions/GetPermissionsFromCache";
import { updateCacheWithPermissions } from "@src/redis/operations/permissions/UpdateCacheWithPermissions";

export const getPerms = async(userId: string): Promise<PermissionLevel> => {
	// We don't deal with serverAdmin here
	if (config.maintainers.includes(userId)) return PermissionLevel.maintainer;

	// Get perms from cache
	const permsFromCache = await getPermissionsFromCache(userId);
	if (permsFromCache !== undefined) return permsFromCache as PermissionLevel;

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

	await updateCacheWithPermissions(userId, permsFromGuild).catch(() => null); // Don't care if this fails, the cache will update on next request anyway

	return permsFromGuild;
};
