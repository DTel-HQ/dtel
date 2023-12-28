import { CallsWithPotentialNumbers } from "@src/internals/calls/get-from-db-by-id/GetCallById";
import { endMissedCallInDb } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/end-call/in-db/EndMissedCallInDb";

export const endMissedCall = async(call: CallsWithPotentialNumbers) => {
	await endMissedCallInDb(call);
};
