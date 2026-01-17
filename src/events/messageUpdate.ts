import { blacklistCache } from "@src/database/db";
import { getCallByChannelOrEndIfNotExists } from "@src/internals/calls/db/get-by-channel/GetCallByChannelOrEndIfNotExists";
import { handleCallMessageUpdate } from "@src/internals/calls/messages/update/HandleMessageUpdate";
import DTelClient from "@src/internals/client";
import { Message } from "discord.js";

export const messageUpdateHandler = async(client: DTelClient, before: Message, after: Message): Promise<void> => {
	if (!after.author) return;
	if (after.author.id === client.user!.id || blacklistCache.get(after.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = await getCallByChannelOrEndIfNotExists(after.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	handleCallMessageUpdate(before, after, call);
};
