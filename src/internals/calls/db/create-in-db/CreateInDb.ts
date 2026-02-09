import { ActiveCalls } from "@src/database/generated";
import { db } from "@src/database/db";
import { updateCacheWithCall } from "@src/redis/operations/UpdateCacheWithCall";
import { deleteCallById } from "@src/internals/calls/db/delete-from-db-by-id/DeleteCallById";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

type CreateCallParams = Pick<ActiveCalls, "id" | "toNum" | "fromNum" | "started" | "randomCall">;

export const createCallInDb = async(call: CreateCallParams): Promise<ActiveCalls> => {
	const createdCall = await db.activeCalls.create({
		data: {
			hold: {
				onHold: false,
				holdingSide: null,
			},
			...call,
		},
		include: {
			from: true,
			to: true,
		},
	});

	if (!createdCall.from || !createdCall.to) {
		await deleteCallById(createdCall.id);
		throw new Error("Failed to create call in database: related participants not found.");
	}

	await updateCacheWithCall(createdCall as CallsWithNumbers);

	return createdCall;
};
