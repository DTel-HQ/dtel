import { winston } from "@src/instances/winston";
// import CallClient from "@src/internals/callClient.old";
import DTelClient from "@src/internals/client";
import { startJobs } from "@src/internals/jobs";

export const allShardsReadyHandler = async(client: DTelClient): Promise<void> => {
	winston.info("Received the all clear! Starting calls...");

	client.allShardsSpawned = true;

	if (process.env.SHARDS == "0") {
		startJobs();
	}
};
