import { CallsWithNumbers } from "@src/instances/calls";
import { client } from "@src/instances/client";
import { buildForwardedMessageOptions } from "@src/internals/calls/messages/utils/BuildForwardedMessageOptions";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { Message } from "discord.js";

export const updateForwardedMessage = async(newMessage: Message, call: CallsWithNumbers, forwardedMessageID: string): Promise<boolean> => {
	const updatedMessagePayload = await buildForwardedMessageOptions(newMessage, call);

	const { otherSide } = await splitCallSidesByChannel(call, newMessage.channelId);

	// TODO: Pull this logic into another file a bit
	try {
		await client.editCrossShard(updatedMessagePayload, otherSide.channelID, forwardedMessageID);
	} catch {
		try {
			updatedMessagePayload.reply = {
				messageReference: forwardedMessageID,
				failIfNotExists: false,
			};
			updatedMessagePayload.content += " (edited)";

			await client.sendCrossShard(updatedMessagePayload, otherSide.channelID);
		} catch {
			// TODO: End prematurely
		}
	}

	return true;
};
