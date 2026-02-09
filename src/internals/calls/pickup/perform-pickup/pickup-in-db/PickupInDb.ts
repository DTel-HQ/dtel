import { ActiveCalls } from "@src/database/generated";
import { db } from "@src/database/db";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { updateCacheWithCall } from "@src/redis/operations/UpdateCacheWithCall";

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

	updateCacheWithCall(updatedCall);

	return updatedCall;
};
