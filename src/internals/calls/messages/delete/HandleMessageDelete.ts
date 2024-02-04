import { CallsWithNumbers, callMessages } from "@src/instances/calls";
import { deleteForwardedMessage } from "@src/internals/calls/messages/delete/delete-forwarded-message/DeleteForwardedMessage";
import { Message } from "discord.js";

export const handleCallMessageDelete = async(deletedMessage: Message, call: CallsWithNumbers): Promise<void> => {
	if (!call.pickedUp) return;

	const messageFromCache = callMessages.find(message => message.originalMessageID === deletedMessage.id);
	if (!messageFromCache) return;

	await deleteForwardedMessage(call, messageFromCache, deletedMessage.channelId);
};
