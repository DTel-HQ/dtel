import { Numbers } from "@src/database/generated";
import { db } from "@src/database/db";
import { CallsWithPotentialNumbers } from "@src/internals/calls/db/get-by-id/GetCallById";

export const getCallByNumber = async(number: Numbers["number"]): Promise<CallsWithPotentialNumbers | null> => db.activeCalls.findFirst({
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
