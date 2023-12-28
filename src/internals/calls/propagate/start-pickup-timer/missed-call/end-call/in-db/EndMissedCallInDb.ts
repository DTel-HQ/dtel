import { ActiveCalls } from "@prisma/client";
import { db } from "@src/database/db";
import { calls } from "@src/instances/calls";

export const endMissedCallInDb = async(call: ActiveCalls): Promise<void> => {
	calls.delete(call.id);

	// Strip the extra fields from any potentially passed call type
	call = {
		id: call.id,
		ended: call.ended,
		fromNum: call.fromNum,
		hold: call.hold,
		pickedUp: call.pickedUp,
		randomCall: call.randomCall,
		started: call.started,
		toNum: call.toNum,
	};

	await db.archivedCalls.create({
		data: {
			...call,
			ended: {
				at: new Date(),
				by: "missed",
			},
		},
	});

	await db.activeCalls.delete({
		where: {
			id: call.id,
		},
	});

	// sendCallMissed;
};
