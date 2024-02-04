import { CallMessages } from "@prisma/client";
import { CallsWithNumbers } from "@src/instances/calls";
import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { TextBasedChannel } from "discord.js";

export const deleteForwardedMessage = async(call: CallsWithNumbers, callMessage: CallMessages, originalMessageChannel: string): Promise<boolean> => {
	const { otherSide } = splitCallSidesByChannel(call, originalMessageChannel);
	winston.silly(`Attempting to delete forwarded message ID '${callMessage.forwardedMessageID}' for call ID '${call.id}'`);

	try {
		const channel = await client.getChannel(otherSide.channelID) as TextBasedChannel | null;
		if (!channel) throw new Error();

		const forwardedMessageFromAPI = await channel.messages.fetch(callMessage.forwardedMessageID);
		if (!forwardedMessageFromAPI) throw new Error();

		await forwardedMessageFromAPI.delete();
	} catch (e) {
		winston.silly(`Couldn't delete forwarded message ID '${callMessage.forwardedMessageID}' for call ID '${call.id}'`);
		return false;
	}

	return true;
};
