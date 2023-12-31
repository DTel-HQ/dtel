import { Numbers } from "@prisma/client";
import { db } from "@src/database/db";
import { CallsWithPotentialNumbers } from "@src/internals/calls/db/get-from-db-by-id/GetCallById";

export const getCallByNumber = (number: Numbers["number"]): Promise<CallsWithPotentialNumbers | null> => db.activeCalls.findFirst({
	where: {
		OR: [{
			fromNum: number,
		}, {
			toNum: number,
		}],
	},
	include: {
		from: true,
		to: true,
	},
});
