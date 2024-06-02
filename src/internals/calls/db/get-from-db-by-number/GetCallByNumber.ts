import { Numbers } from "@prisma/client";
import { db } from "@src/database/db";
import { calls } from "@src/instances/calls";
import { CallsWithPotentialNumbers } from "@src/internals/calls/db/get-from-db-by-id/GetCallById";

export const getCallByNumber = async(number: Numbers["number"]): Promise<CallsWithPotentialNumbers | null> => {
	const cachedCall = calls.find(call => call.fromNum === number || call.toNum === number);
	if (cachedCall) return cachedCall;

	return db.activeCalls.findFirst({
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
};
