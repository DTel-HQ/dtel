import { PrismaClient } from "@prisma/client";
import { Collection } from "discord.js";
const prisma = new PrismaClient();

const blacklistCache = new Collection();

const populateBlacklistCache = () => {
	prisma.blacklist.findMany().then(allBlacklist => {
		allBlacklist.map(m => blacklistCache.set(m.id, m));
	});
};

export { prisma as db, blacklistCache, populateBlacklistCache };
