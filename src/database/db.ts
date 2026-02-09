import { Blacklist, PrismaClient } from "./generated/client";
import { Collection } from "@discordjs/collection";
import { winston } from "@src/instances/winston";

const prisma = new PrismaClient({});

const blacklistCache = new Collection<string, Blacklist>();

const populateBlacklistCache = () => {
	prisma.blacklist.findMany().then(allBlacklist => {
		allBlacklist.map(m => blacklistCache.set(m.id, m));
	});
};

prisma.$extends({
	query: {
		$allModels: {
			async deleteMany({ model, args, query }) {
				if (!args?.where && model !== "Votes") {
					winston.error("INCREDIBLY UNSAFE QUERY DETECTED!");
					return;
				}
				return query(args);
			},
			async updateMany({ model, args, query }) {
				if (!args?.where && model !== "Votes") {
					winston.error("INCREDIBLY UNSAFE QUERY DETECTED!");
					return;
				}
				return query(args);
			},
		},
	},
});

export { prisma as db, blacklistCache, populateBlacklistCache };
