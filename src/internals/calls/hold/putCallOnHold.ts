import { db } from "@src/database/db";
import { calls, CallsWithNumbers } from "@src/instances/calls";

export async function putCallOnHold(
	call: CallsWithNumbers,
	initiatingSideChannelId: string,
): Promise<void> {
	await db.activeCalls.update({
		where: { id: call.id },
		data: {
			hold: {
				onHold: true,
				holdingSide: initiatingSideChannelId,
			},
		},
	});
	// TODO: Propagate to the other side if it is on another shard
}
