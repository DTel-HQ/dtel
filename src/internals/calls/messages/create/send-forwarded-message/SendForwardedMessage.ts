import { CallsWithNumbers } from "@src/instances/calls";
import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";
import { buildForwardedMessageOptions } from "@src/internals/calls/messages/utils/BuildForwardedMessageOptions";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { Message } from "discord.js";

export const sendForwardedMessage = async(message: Message, call: CallsWithNumbers): Promise<string> => {
	const forwardedMessagePayload = await buildForwardedMessageOptions(message, call);

	const { otherSide } = splitCallSidesByChannel(call, message.channelId);

	winston.silly(`Forwarding message ID '${message.id}' for call ID '${call.id}'`);
	const forwardedMessage = await client.sendCrossShard(forwardedMessagePayload, otherSide.channelID);

	return forwardedMessage.id;
};
