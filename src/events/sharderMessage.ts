import { ActiveCalls } from "@prisma/client";
import { calls } from "@src/instances/calls";
import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";
import CallClient, { CallsWithNumbers } from "@src/internals/callClient.old";
import { getCallById } from "@src/internals/calls/db/get-from-db-by-id/GetCallById";
import { TextBasedChannel } from "discord.js";
import { allShardsReadyHandler } from "./allShardsReady";

export default async(msg: Record<string, unknown>): Promise<void> => {
	switch (msg.msg) {
		case "callInitiated": {
			const callObject = JSON.parse(msg.callDBObject as string) as CallsWithNumbers;
			let channel: TextBasedChannel;
			try {
				channel = (await client.channels.fetch(callObject.to.channelID)) as TextBasedChannel;
				if (!channel) throw new Error();
			} catch {
				return; // We clearly don't have the channel on this shard
			}

			// From here, we can assume we *do* have the channel and can handle this call
			const callClient = new CallClient(client, undefined, callObject);
			calls.set(callClient.id, callClient);
			break;
		}
		case "callRepropagate": {
			const messageObject = JSON.parse(msg.callDBObject as string) as callRepropagate;
			const call = calls.get(messageObject.callID);

			if (!call) {
				winston.error(`Call repropagation for ID ${messageObject.callID} failed: Call not found`);
			}

			// call.handleReprop(messageObject.call);
			break;
		}
		case "callEnded": {
			const typed = msg as unknown as callEnded;
			calls.delete(typed.callID);
			break;
		}

		case "allShardsSpawned": {
			allShardsReadyHandler(client);
			break;
		}

		case "resume": {
			if (msg.shardID === Number(process.env.SHARDS)) {
				allShardsReadyHandler(client);
				winston.info("Received all clear for resume! Starting calls...");
			}
			break;
		}

		case "callResume": {
			const message = msg as unknown as callResume;
			// TODO: Make this work properly and not a bodge fix
			const cll = await getCallById(message.callDoc.id);
			if (!cll) throw new Error();
			calls.set(cll?.id, cll as CallsWithNumbers);

			return;
			const callDoc = msg.callDoc as CallsWithNumbers;

			if (msg.fromShard != Number(process.env.SHARDS) && msg.toShard != Number(process.env.SHARDS)) {
				return;
			} else if (msg.fromShard === msg.toShard) {
				if (calls.get(callDoc.id)) {
					winston.info(`Call ${callDoc.id} already exists on this shard, ignoring.`);
					return;
				}
			}

			winston.info(`Recovering call ID: ${callDoc.id}`);

			const call = await CallClient.byID(client, {
				side: msg.fromShard === Number(process.env.SHARDS) ? "from" : "to",
				doc: callDoc,
				id: callDoc.id,
			});
			calls.set(call.id, call);

			break;
		}
	}
};

interface callBase {
	msg: string,
	callID: string,
}

interface callRepropagate extends callBase {
	call: ActiveCalls
}

interface callResume extends callBase {
	callDoc: ActiveCalls
}

interface callEnded extends callBase {
	endedBy: string,
}
