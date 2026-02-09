import { PrismaClient } from "./generated/client";
import { winston } from "@src/instances/winston";

const prisma = new PrismaClient({});


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

export { prisma as db };
