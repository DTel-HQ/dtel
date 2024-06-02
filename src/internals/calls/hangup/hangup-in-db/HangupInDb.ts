import { ActiveCalls, ArchivedCalls } from "@prisma/client";
import { db } from "@src/database/db";
import { calls } from "@src/instances/calls";

export const hangupInDb = async(call: ActiveCalls, endedBy: string): Promise<ArchivedCalls> => {
	await db.activeCalls.delete({
		where: {
			id: call.id,
		},
	});

	calls.delete(call.id);

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
