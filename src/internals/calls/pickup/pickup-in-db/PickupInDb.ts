import { ActiveCalls } from "@prisma/client";
import { db } from "@src/database/db";

export const pickupInDb = (callId: string, pickedUpBy: string): Promise<ActiveCalls> => db.activeCalls.update({
	where: {
		id: callId,
	},
	data: {
		pickedUp: {
			set: {
				at: new Date(),
				by: pickedUpBy,
			},
		},
	},
});
