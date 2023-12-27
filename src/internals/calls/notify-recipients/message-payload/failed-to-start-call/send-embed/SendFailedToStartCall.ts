import { client } from "@src/instances/client";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { failedToStartCallEmbed } from "@src/internals/calls/notify-recipients/message-payload/failed-to-start-call/FailedToStartCall";
import { APIMessage } from "discord.js";

export const sendFailedToStartCall = (from: CallParticipant): Promise<APIMessage> => client.sendCrossShard({
	embeds: [failedToStartCallEmbed(from)],
}, from.channelID);

