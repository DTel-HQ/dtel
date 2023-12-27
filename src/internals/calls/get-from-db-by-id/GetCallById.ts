import { ActiveCalls, Numbers } from "@prisma/client";
import { db } from "@src/database/db";

export type CallsWithPotentialNumbers = ActiveCalls & {
	to: Numbers | null,
	from: Numbers | null,
};

export const getCallById = (id: ActiveCalls["id"]): Promise<CallsWithPotentialNumbers | null> => db.activeCalls.findUnique({
	where: {
		id,
	},
	include: {
		from: true,
		to: true,
	},
});
