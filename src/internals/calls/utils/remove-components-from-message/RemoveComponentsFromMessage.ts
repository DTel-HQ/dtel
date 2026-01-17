import { client } from "@src/instances/client";
import { RESTGetAPIChannelMessageResult } from "discord-api-types/rest/v10/channel";
import { APIMessage } from "discord.js";

export const removeComponentsFromMessage = async(channelId: string, messageId: string): Promise<APIMessage> => {
	const callMsg = await client.rest.get(`/channels/${channelId}/messages/${messageId}`) as RESTGetAPIChannelMessageResult;

	return client.editCrossShard({
		embeds: callMsg.embeds,
		components: [],
	}, channelId, messageId);
};
