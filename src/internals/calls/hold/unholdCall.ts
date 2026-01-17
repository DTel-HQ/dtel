import { db } from "@src/database/db";
import { calls, CallsWithNumbers } from "@src/instances/calls";

export async function unholdCall(
	call: CallsWithNumbers,
): Promise<void> {
	await db.activeCalls.update({
		where: { id: call.id },
		data: {
			hold: {
				onHold: false,
				holdingSide: null,
			},
		},
	});


	calls.set(call.id, {
		...call,
		hold: {
			onHold: false,
			holdingSide: null,
		},
	});


	// TODO: Propagate to the other side if it is on another shard
}
