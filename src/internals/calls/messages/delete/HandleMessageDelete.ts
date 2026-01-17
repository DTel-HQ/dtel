import { callMessagesCache } from "@src/instances/calls";
import {CallsWithNumbers} from "@src/types/CallsWithNumbers";
import { deleteForwardedMessage } from "@src/internals/calls/messages/delete/delete-forwarded-message/DeleteForwardedMessage";
import { Message } from "discord.js";

export const handleCallMessageDelete = async(deletedMessage: Message, call: CallsWithNumbers): Promise<void> => {
	if (!call.pickedUp) return;

	const messageFromCache = callMessagesCache.find(message => message.originalMessageID === deletedMessage.id);
	if (!messageFromCache) return;

	await deleteForwardedMessage(call, messageFromCache, deletedMessage.channelId);
};
