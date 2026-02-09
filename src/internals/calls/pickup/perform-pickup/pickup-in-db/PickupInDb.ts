import { ActiveCalls } from "@src/database/generated";
import { db } from "@src/database/db";
import { updateCacheWithCall } from "@src/redis/operations/UpdateCacheWithCall";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export const pickupInDb = async(call: CallsWithNumbers, pickedUpBy: string): Promise<ActiveCalls> => {
	const updatedCall = {
		...call,
		pickedUp: {
			at: new Date(),
			by: pickedUpBy,
		},
	};

	await db.activeCalls.update({
		where: {
			id: call.id,
		},
		data: {
			pickedUp: updatedCall.pickedUp,
		},
	});

	await updateCacheWithCall(updatedCall);

	return updatedCall;
};
