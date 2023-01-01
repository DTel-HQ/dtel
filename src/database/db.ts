import { PrismaClient } from "@prisma/client";
import { Collection } from "discord.js";
import { winston } from "../dtel";
const prisma = new PrismaClient();

const blacklistCache = new Collection();

const populateBlacklistCache = () => {
	prisma.blacklist.findMany().then(allBlacklist => {
		allBlacklist.map(m => blacklistCache.set(m.id, m));
	});
};

prisma.$use(async(params, next) => {
	// Check incoming query type
	if (params.action === "deleteMany" || params.action === "updateMany") {
		if (params.args.where === undefined) {
			winston.error("INCREDIBLY UNSAFE QUERY DETECTED!");
			return;
		}
	}
	return next(params);
});

export { prisma as db, blacklistCache, populateBlacklistCache };
