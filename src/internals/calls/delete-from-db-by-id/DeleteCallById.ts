import { ActiveCalls } from "@prisma/client";
import { db } from "@src/database/db";

export const deleteCallById = (id: string): Promise<ActiveCalls> => db.activeCalls.delete({
	where: {
		id,
	},
});
