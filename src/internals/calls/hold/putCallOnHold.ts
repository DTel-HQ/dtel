import { db } from "@src/database/db";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

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
}
