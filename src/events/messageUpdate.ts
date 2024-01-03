import { blacklistCache } from "@src/database/db";
import { calls } from "@src/instances/calls";
import { handleCallMessageUpdate } from "@src/internals/calls/messages/update/HandleMessageUpdate";
import DTelClient from "@src/internals/client";
import { Message } from "discord.js";

export const messageUpdateHandler = async(client: DTelClient, before: Message, after: Message): Promise<void> => {
	if (!after.author) return;
	if (after.author.id === client.user!.id || blacklistCache.get(after.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = calls.find(c => c.to.channelID === after.channel.id || c.from.channelID === after.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	handleCallMessageUpdate(before, after, call);
};
