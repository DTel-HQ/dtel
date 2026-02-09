import { ActiveCalls } from "@src/database/generated";
import { db } from "@src/database/db";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { deleteCallFromCache } from "@src/redis/operations/DeleteCallFromCache";

export const deleteCallById = async(id: string): Promise<ActiveCalls> => {
	const call = await db.activeCalls.delete({
		where: {
			id,
		},
		include: {
			from: true,
			to: true,
		},
	});


	await deleteCallFromCache(call as CallsWithNumbers);

	return call;
};
