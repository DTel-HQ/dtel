import { db } from "@src/database/db";
import { ActiveCalls, ArchivedCalls } from "@src/database/generated";
import { deleteCallFromCache } from "@src/redis/operations/DeleteCallFromCache";

export const hangupInDb = async(call: ActiveCalls, endedBy: string): Promise<ArchivedCalls> => {
	const callWithNumbers = await db.activeCalls.delete({
		where: {
			id: call.id,
		},
		include: {
			from: true,
			to: true,
		},
	});

	await deleteCallFromCache(callWithNumbers);

	return db.archivedCalls.create({
		data: {
			fromNum: call.fromNum,
			hold: call.hold,
			id: call.id,
			started: call.started,
			toNum: call.toNum,
			pickedUp: call.pickedUp,
			randomCall: call.randomCall,
			ended: {
				set: {
					at: new Date(),
					by: endedBy,
				},
			},
		},
	});
};
