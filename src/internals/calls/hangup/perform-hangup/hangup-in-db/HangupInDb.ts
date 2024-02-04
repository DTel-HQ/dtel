import { ActiveCalls } from "@prisma/client";
import { db } from "@src/database/db";

export const hangupInDb = (callId: string, endedBy: string): Promise<ActiveCalls> => db.activeCalls.update({
	where: {
		id: callId,
	},
	data: {
		ended: {
			set: {
				at: new Date(),
				by: endedBy,
			},
		},
	},
});
