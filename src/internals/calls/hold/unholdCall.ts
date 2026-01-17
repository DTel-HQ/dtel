import { db } from "@src/database/db";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

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
}
