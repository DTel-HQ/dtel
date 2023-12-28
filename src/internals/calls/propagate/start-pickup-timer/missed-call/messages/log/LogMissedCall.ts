import { ActiveCalls, Numbers } from "@prisma/client";
import { client } from "@src/instances/client";
import { APIMessage } from "discord.js";

export const logMissedCall = async(call: ActiveCalls, to: Numbers, from: Numbers): Promise<APIMessage | undefined> => {
	try {
		let message: string;

		if (call.randomCall) {
			message = `❎ Random Call \`${from.channelID} → ${to.channelID}\` was not picked up.\nCall ID: \`${call.id}\``;
		} else {
			message = `❎ Call \`${from.channelID} → ${to.channelID}\` was not picked up.\nCall ID: \`${call.id}\``;
		}

		return await client.log(message);
	} catch {
		return undefined;
	}
};
