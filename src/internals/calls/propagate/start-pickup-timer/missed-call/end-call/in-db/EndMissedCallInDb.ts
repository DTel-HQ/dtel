import { db } from "@src/database/db";
import { CallsWithPotentialNumbers } from "@src/internals/calls/db/get-by-id/GetCallById";
import { deleteCallFromCache } from "@src/redis/operations/DeleteCallFromCache";

export const endMissedCallInDb = async(call: CallsWithPotentialNumbers): Promise<void> => {
	await deleteCallFromCache(call);

	// Strip the extra fields from any potentially passed call type
	const updatedCall = {
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
			...updatedCall,
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
