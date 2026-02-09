import { ActiveCalls } from "@src/database/generated";
import { client } from "@src/instances/client";
import { getHangupTranslator } from "@src/internals/calls/hangup/utils/get-hangup-translator/GetHangupTranslator";
import { APIEmbed, APIMessage, EmbedBuilder } from "discord.js";
import { timeSince } from "@src/internals/calls/hangup/messages/utils/TimeSince";
import config from "@src/config/config";

export const sendHangupCallEndNotificationForPickedUpCall = (otherSideChannelId: string, locale: string, call: ActiveCalls): Promise<APIMessage> => client.sendCrossShard({
	embeds: [buildEmbed(locale, call)],
}, otherSideChannelId);

const buildEmbed = (locale: string, call: ActiveCalls): EmbedBuilder => {
	const translator = getHangupTranslator(locale);
	const callDuration = timeSince(call.started.at);

	return new EmbedBuilder({
		...(translator("baseEmbed", {
			callId: call.id,
		}) as APIEmbed),
	})
		.setColor(config.colors.error)
		.setDescription(translator("descriptions.pickedUp.otherSide", {
			time: callDuration,
		}));
};
