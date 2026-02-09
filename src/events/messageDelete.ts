import { Message } from "discord.js";
import DTelClient from "@src/internals/client";
import { handleCallMessageDelete } from "@src/internals/calls/messages/delete/HandleMessageDelete";
import { getCallByChannelOrEndIfASideDoesNotExist } from "@src/internals/calls/db/get-by-channel/GetCallByChannelOrEndIfASideDoesNotExist";
import { isBlacklisted } from "@src/redis/operations/blacklist/GetBlacklistFromCache";

export const messageDeleteHandler = async(client: DTelClient, message: Message): Promise<void> => {
	if (!message.author) return;
	if (message.author.id === client.user!.id || await isBlacklisted(message.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = await getCallByChannelOrEndIfASideDoesNotExist(message.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	await handleCallMessageDelete(message, call);
};
