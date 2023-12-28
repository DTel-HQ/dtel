import { winston } from "@src/instances/winston";
// import CallClient from "@src/internals/callClient.old";
import DTelClient from "@src/internals/client";

export const allShardsReadyHandler = async(client: DTelClient): Promise<void> => {
	winston.info("Received the all clear! Starting calls...");

	client.allShardsSpawned = true;

	// const allCalls = await client.db.activeCalls.findMany({
	// 	include: {
	// 		to: {
	// 			include: {
	// 				guild: true,
	// 			},
	// 		},
	// 		from: {
	// 			include: {
	// 				guild: true,
	// 			},
	// 		},
	// 	},
	// });

	// for (const call of allCalls) {
	// 	const doc = await CallClient.byID(client, {
	// 		doc: call,
	// 		side: "to",
	// 	});

	// 	client.calls.set(call.id, doc);
	// }

	if (process.env.SHARDS == "0") {
		// TODO: Jobs
		// require("../internals/jobs");
	}
};
