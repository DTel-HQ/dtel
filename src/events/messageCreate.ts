import config from "@src/config/config";
import { blacklistCache } from "@src/database/db";
import { calls } from "@src/instances/calls";
import { handleCallMessageCreate } from "@src/internals/calls/messages/create/HandleCallMessageCreate";
import DTelClient from "@src/internals/client";
import { EmbedBuilder, Message } from "discord.js";

export const messageCreateHandler = async(client: DTelClient, message: Message): Promise<void> => {
	if (message.author.id === client.user!.id || blacklistCache.get(message.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = calls.find(c => [c.to.channelID, c.from.channelID].includes(message.channel.id));
	if (!call) {
		if (message.content.startsWith(">ping") || message.content.startsWith(">call") || message.content.startsWith(">dial") || message.content.startsWith(">rdial") || message.content.startsWith(">daily")) {
			const embed = new EmbedBuilder()
				.setColor(config.colors.info)
				.setTitle("DTel has moved to Slash Commands!")
				.setDescription(`Type \`/\` in the chat to view the available commands. If you need help, please join our [support server](${config.guildInvite})!`);
			message.channel.send({
				embeds: [embed],
			}).catch(() => null);
		}

		return;
	}

	handleCallMessageCreate(message, call);
};
