import { client } from "@src/instances/client";
import { APIMessage, MessageCreateOptions } from "discord.js";

export const doPretendEdit = (updatedMessagePayload: MessageCreateOptions, otherSideChannelId: string, forwardedMessageId: string): Promise<APIMessage> => {
	updatedMessagePayload.reply = {
		messageReference: forwardedMessageId,
		failIfNotExists: false,
	};
	updatedMessagePayload.content += " (edited)";

	return client.sendCrossShard(updatedMessagePayload, otherSideChannelId);
};
