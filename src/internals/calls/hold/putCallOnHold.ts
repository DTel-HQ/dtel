import { db } from "@src/database/db";
import { updateCacheWithCall } from "@src/redis/operations/UpdateCacheWithCall";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

export async function putCallOnHold(
	call: CallsWithNumbers,
	initiatingSideChannelId: string,
): Promise<void> {
	const updatedCall = {
		...call,
		hold: {
			onHold: true,
			holdingSide: initiatingSideChannelId,
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
