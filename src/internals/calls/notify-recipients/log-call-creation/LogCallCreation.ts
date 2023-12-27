import { ActiveCalls } from "@prisma/client";
import config from "@src/config/config";
import { client } from "@src/instances/client";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";

export const logCallCreation = (call: ActiveCalls, to: CallParticipant, from: CallParticipant) => {
	let message: string;

	if (call.randomCall) {
		message = `☎️ Random Call \`${from.channelID} → ${to.channelID}\` has been established by ID: \`${call.started.by}\`\nCall ID: \`${call.id}\``;
	} else {
		message = `${config.callPhones.default} Call \`${from.channelID} → ${to.channelID}\` has been established by ID: \`${call.started.by}\`\nCall ID: \`${call.id}\``;
	}

	return client.log(message);
};
