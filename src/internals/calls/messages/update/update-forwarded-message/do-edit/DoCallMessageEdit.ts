import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";
import { doPretendEdit } from "@src/internals/calls/messages/update/update-forwarded-message/do-edit/do-pretend-edit/DoPretendEdit";
import { APIMessage, MessageCreateOptions } from "discord.js";

export const doCallMessageEdit = async(updatedMessagePayload: MessageCreateOptions, otherSideChannelId: string, forwardedMessageId: string): Promise<APIMessage> => {
	try {
		// Await to catch error
		return await client.editCrossShard(updatedMessagePayload, otherSideChannelId, forwardedMessageId);
	} catch {
		winston.silly("Couldn't edit message. Attempting a pretend edit.");
		return doPretendEdit(updatedMessagePayload, otherSideChannelId, forwardedMessageId);
	}
};
