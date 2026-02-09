import config from "@src/config/config";
import { getCallByChannelOrEndIfASideDoesNotExist } from "@src/internals/calls/db/get-by-channel/GetCallByChannelOrEndIfASideDoesNotExist";
import { handleCallMessageCreate } from "@src/internals/calls/messages/create/HandleCallMessageCreate";
import DTelClient from "@src/internals/client";
import { isBlacklisted } from "@src/redis/operations/blacklist/GetBlacklistFromCache";
import { EmbedBuilder, Message } from "discord.js";

export const messageCreateHandler = async(client: DTelClient, message: Message): Promise<void> => {
	if (message.author.id === client.user!.id || await isBlacklisted(message.author.id)) return; // Don't cause loopback & ignore blacklist

	const call = await getCallByChannelOrEndIfASideDoesNotExist(message.channel.id);
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

	if (call.hold.onHold) return;

	handleCallMessageCreate(message, call);
};
