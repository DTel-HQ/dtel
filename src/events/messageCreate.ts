import { Message } from "discord.js";
import DTelClient from "../internals/client";

export default async(client: DTelClient, message: Message): Promise<void> => {
	if (message.author.id === client.user!.id) return; // Don't cause loopback

	const call = client.calls.find(c => c.to.channelID === message.channel.id || c.from.channelID === message.channel.id);
	if (!call) return; // We don't need to handle messages we have nothing to do with

	call.handleMessage(message);
};
