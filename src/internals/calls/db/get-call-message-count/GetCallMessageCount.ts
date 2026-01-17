import { db } from "@src/database/db";

export const getCallMessageCount = async(callId: string): Promise<number> => (await db.callMessages.aggregate({
	where: {
		callID: callId,
	},
	_count: {
		_all: true,
	},
}))._count._all;
