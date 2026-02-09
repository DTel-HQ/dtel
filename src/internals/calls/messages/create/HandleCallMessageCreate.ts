import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { sendForwardedMessage } from "@src/internals/calls/messages/create/send-forwarded-message/SendForwardedMessage";
import { createCallMessageInDb } from "@src/internals/calls/messages/db/CreateCallMessageInDb";
import { Message } from "discord.js";
import { client } from "@src/instances/client";
import { hangupInDb } from "@src/internals/calls/db/hangup-in-db/HangupInDb";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";

export const handleCallMessageCreate = async(
	message: Message,
	call: CallsWithNumbers,
): Promise<void> => {
	if (!call.pickedUp || message.content.startsWith(">")) return;

	const { otherSide } = splitCallSidesByChannel(call, message.channelId);

	const otherSideChannel = await client.getChannel(otherSide.channelID).catch(error => {
		client.winston.error(`Failed to fetch channel ${otherSide.channelID} for call ${call.id}:`, error);
		return null;
	});

	if (!otherSideChannel) {
		message.reply(
			"❌ We lost connection to the other side. The call may has been ended.",
		);
		hangupInDb(call, "call-lost");
		return;
	}

	const forwardedMessageId = await sendForwardedMessage(message, call);

	await createCallMessageInDb({
		callID: call.id,
		forwardedMessageID: forwardedMessageId,
		originalMessageID: message.id,
		sender: message.author.id,
	});
};
