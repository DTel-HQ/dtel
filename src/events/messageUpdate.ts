import { Message } from "discord.js";
import { blacklistCache } from "../database/db";
import DTelClient from "../internals/client";
import { calls } from "../dtel";

export default async(client: DTelClient, before: Message, after: Message): Promise<void> => {
	if (!after.author) return;
	if (after.author.id === client.user!.id || blacklistCache.get(after.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = calls.find(c => c.to.channelID === after.channel.id || c.from.channelID === after.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	call.messageUpdate(before, after);
};
