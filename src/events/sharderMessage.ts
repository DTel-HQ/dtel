import { ActiveCalls } from "@prisma/client";
import { TextBasedChannel } from "discord.js";
import { winston } from "../dtel";
import CallClient, { CallsWithNumbers } from "../internals/callClient";
import DTelClient from "../internals/client";

export default async(client: DTelClient, msg: Record<string, unknown>): Promise<void> => {
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
			client.calls.set(callClient.id, callClient);
			break;
		}
		case "callRepropagate": {
			// TODO: Efficiency boost?
			const messageObject = JSON.parse(msg.callDBObject as string) as callRepropagate;
			const call = client.calls.get(messageObject.callID);

			if (!call) {
				winston.error(`Call repropagation for ID ${messageObject.callID} failed: Call not found`);
				return;
			}

			call.handleReprop(messageObject.call);
			break;
		}
		case "callEnded": {
			const typed = msg as unknown as callEnded;
			client.calls.delete(typed.callID);
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

interface callEnded extends callBase {
	endedBy: string,
}
