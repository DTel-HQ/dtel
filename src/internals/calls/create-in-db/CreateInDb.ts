import { ActiveCalls } from "@prisma/client";
import { db } from "@src/database/db";

type CreateCallParams = Pick<ActiveCalls, "id" | "toNum" | "fromNum" | "started" | "randomCall">;

export const createCallInDb = (call: CreateCallParams): Promise<ActiveCalls> => db.activeCalls.create({
	data: {
		hold: {
			onHold: false,
			holdingSide: null,
		},
		...call,
	},
});
