import { winston } from "../dtel";
import CallClient from "../internals/callClient";
import DTelClient from "../internals/client";

export default async(client: DTelClient): Promise<void> => {
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
		require("../internals/jobs");
	}
};
