import { CallsWithNumbers } from "@src/types/CallsWithNumbers";
import { sendForwardedMessage } from "@src/internals/calls/messages/create/send-forwarded-message/SendForwardedMessage";
import { createCallMessageInDb } from "@src/internals/calls/messages/db/CreateCallMessageInDb";
import { Message } from "discord.js";
import { client } from "@src/instances/client";
import { hangupInDb } from "@src/internals/calls/db/hangup-in-db/HangupInDb";

export const handleCallMessageCreate = async(
	message: Message,
	call: CallsWithNumbers,
): Promise<void> => {
	if (!call.pickedUp || message.content.startsWith(">")) return;

	const toChannel =
    client.channels.cache.get(call.to.channelID) ??
    await client.channels.fetch(call.to.channelID).catch(() => null);

	if (!toChannel) {
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
