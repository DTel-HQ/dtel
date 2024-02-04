import { CallsWithNumbers } from "@src/instances/calls";
import { winston } from "@src/instances/winston";
import { doCallMessageEdit } from "@src/internals/calls/messages/update/update-forwarded-message/do-edit/DoCallMessageEdit";
import { buildForwardedMessageOptions } from "@src/internals/calls/messages/utils/BuildForwardedMessageOptions";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { Message } from "discord.js";

export const updateForwardedMessage = async(newMessage: Message, call: CallsWithNumbers, forwardedMessageID: string): Promise<boolean> => {
	const updatedMessagePayload = await buildForwardedMessageOptions(newMessage, call);

	const { otherSide } = splitCallSidesByChannel(call, newMessage.channelId);
	winston.silly(`Attempting to edit message ID '${newMessage.id}' for call ID '${call.id}'`);

	try {
		await doCallMessageEdit(updatedMessagePayload, otherSide.channelID, forwardedMessageID);
	} catch {
		winston.silly(`Couldn't edit message ID '${newMessage.id}' for call ID '${call.id}'`);
		return false;
	}

	return true;
};
