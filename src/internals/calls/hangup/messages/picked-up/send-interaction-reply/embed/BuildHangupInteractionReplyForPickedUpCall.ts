import { ActiveCalls } from "@prisma/client";
import config from "@src/config/config";
import { timeSince } from "@src/internals/calls/hangup/messages/utils/TimeSince";
import { getHangupTranslator } from "@src/internals/calls/hangup/utils/get-hangup-translator/GetHangupTranslator";
import { APIEmbed, EmbedBuilder } from "discord.js";

export const buildHangupInteractionReplyForPickedUpCall = (locale: string, call: ActiveCalls): EmbedBuilder => {
	const translator = getHangupTranslator(locale);
	const callDuration = timeSince(call.started.at);

	return new EmbedBuilder({
		...(translator("baseEmbed", {
			callId: call.id,
		}) as APIEmbed),
	})
		.setColor(config.colors.error)
		.setDescription(translator("descriptions.pickedUp.thisSide", {
			time: callDuration,
		}));
};
