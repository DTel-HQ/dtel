import { PrismaClient } from "@prisma/client";
import { Collection } from "@discordjs/collection";
import { winston } from "@src/instances/winston";
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
		if (params.args.where === undefined && params.model !== "Votes") {
			winston.error("INCREDIBLY UNSAFE QUERY DETECTED!");
			return;
		}
	}
	return next(params);
});

export { prisma as db, blacklistCache, populateBlacklistCache };
