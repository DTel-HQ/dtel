import { getCallByChannelOrEndIfASideDoesNotExist } from "@src/internals/calls/db/get-by-channel/GetCallByChannelOrEndIfASideDoesNotExist";
import { handleCallMessageUpdate } from "@src/internals/calls/messages/update/HandleMessageUpdate";
import DTelClient from "@src/internals/client";
import { isBlacklisted } from "@src/redis/operations/blacklist/GetBlacklistFromCache";
import { Message } from "discord.js";

export const messageUpdateHandler = async(client: DTelClient, before: Message, after: Message): Promise<void> => {
	if (!after.author) return;
	if (after.author.id === client.user!.id || await isBlacklisted(after.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = await getCallByChannelOrEndIfASideDoesNotExist(after.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	handleCallMessageUpdate(before, after, call);
};
