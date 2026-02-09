import { client } from "@src/instances/client";
import { getHangupTranslator } from "@src/internals/calls/hangup/utils/get-hangup-translator/GetHangupTranslator";
import { APIEmbed, APIMessage, EmbedBuilder } from "discord.js";
import config from "@src/config/config";
import { ActiveCalls } from "@src/database/generated";

export const sendHangupCallEndNotificationForNotPickedUpCall = (fromChannelId: string, locale: string, call: ActiveCalls): Promise<APIMessage> => client.sendCrossShard({
	embeds: [buildEmbed(locale, call)],
}, fromChannelId);

const buildEmbed = (locale: string, call: ActiveCalls): EmbedBuilder => {
	const translator = getHangupTranslator(locale);

	return new EmbedBuilder({
		...(translator("baseEmbed", {
			callId: call.id,
		}) as APIEmbed),
	})
		.setColor(config.colors.error)
		.setDescription(translator("descriptions.notPickedUp.otherSide"));
};
