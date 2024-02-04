import { Message } from "discord.js";
import { blacklistCache } from "@src/database/db";
import DTelClient from "@src/internals/client";
import { calls } from "@src/instances/calls";
import { handleCallMessageDelete } from "@src/internals/calls/messages/delete/HandleMessageDelete";

export const messageDeleteHandler = async(client: DTelClient, message: Message): Promise<void> => {
	if (!message.author) return;
	if (message.author.id === client.user!.id || blacklistCache.get(message.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = calls.find(c => c.to.channelID === message.channel.id || c.from.channelID === message.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	handleCallMessageDelete(message, call);
};
