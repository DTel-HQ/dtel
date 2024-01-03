import { CallsWithNumbers } from "@src/instances/calls";
import { createCallMessageInDb } from "@src/internals/calls/messages/db/CreateCallMessageInDb";
import { sendForwardedMessage } from "@src/internals/calls/messages/utils/send-forwarded-message/SendForwardedMessage";
import { Message } from "discord.js";

export const handleCallMessageCreate = async(message: Message, call: CallsWithNumbers): Promise<void> => {
	if (!call.pickedUp || message.content.startsWith(">")) return;

	const forwardedMessageId = await sendForwardedMessage(message, call);

	await createCallMessageInDb({
		callID: call.id,
		forwardedMessageID: forwardedMessageId,
		originalMessageID: message.channelId,
		sender: message.author.id,
	});
};
