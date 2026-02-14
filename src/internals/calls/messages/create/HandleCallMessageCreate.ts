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
		await lostConnectionReply(message, call);
		return;
	}

	// Normally we'd just wrap everything in the try-catch but I only want to throw if the forwarding fails
	// A DB fail is a real problem that shouldn't end a call
	let forwardedMessageId: string | null = null;
	try {
		forwardedMessageId = await sendForwardedMessage(message, call);
	} catch {
		await lostConnectionReply(message, call);
		return;
	}

	await createCallMessageInDb({
		callID: call.id,
		forwardedMessageID: forwardedMessageId,
		originalMessageID: message.id,
		sender: message.author.id,
	});
};

async function lostConnectionReply(message: Message, call: CallsWithNumbers): Promise<void> {
	await message.reply(
		"❌ We lost connection to the other side. The call may has been ended.",
	);
	await hangupInDb(call, "call-lost");
}
