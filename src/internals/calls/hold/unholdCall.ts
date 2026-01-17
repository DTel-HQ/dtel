import { db } from "@src/database/db";
import { updateCacheWithCall } from "@src/redis/operations/UpdateCacheWithCall";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export async function unholdCall(
	call: CallsWithNumbers,
): Promise<void> {
	const updatedCall = {
		...call,
		hold: {
			onHold: false,
			holdingSide: null,
		},
	};

	await updateCacheWithCall(updatedCall);

	await db.activeCalls.update({
		where: { id: call.id },
		data: {
			hold: call.hold,
		},
	});
}
