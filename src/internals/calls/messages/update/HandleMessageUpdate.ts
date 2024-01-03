import { CallsWithNumbers, callMessages } from "@src/instances/calls";
import { updateForwardedMessage } from "@src/internals/calls/messages/utils/update-forwarded-message/UpdateForwardedMessage";
import { Message } from "discord.js";

export const handleCallMessageUpdate = async(originalMessage: Message, updatedMessage: Message, call: CallsWithNumbers): Promise<void> => {
	if (!call.pickedUp) return;

	const messageFromCache = await callMessages.find(message => message.originalMessageID === originalMessage.id);
	if (!messageFromCache) return;

	await updateForwardedMessage(updatedMessage, call, messageFromCache.forwardedMessageID);
};
