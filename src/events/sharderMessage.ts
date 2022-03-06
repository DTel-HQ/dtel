import { TextBasedChannel } from "discord.js";
import { DTelCall } from "../database/schemas/call";
import CallClient from "../internals/callClient";
import DTelClient from "../internals/client";

export default async(client: DTelClient, msg: Record<string, unknown>): Promise<void> => {
	switch (msg.msg) {
		case "callInitiated": {
			const callObject = JSON.parse(msg.callDBObject as string) as DTelCall;
			console.log(callObject);
			let channel: TextBasedChannel;
			try {
				channel = (await client.channels.fetch(callObject.to.channelID)) as TextBasedChannel;
				if (!channel) throw new Error();
			} catch {
				return; // We clearly don't have the channel on this shard
			}

			// From here, we can assume we *do* have the channel and can handle this call
			const callClient = new CallClient(client, null, callObject);
			client.calls.push(callClient);
			break;
		}
	}
};
