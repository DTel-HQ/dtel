import config from "@src/config/config";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { APIEmbed, EmbedBuilder } from "discord.js";

export const BuildHangupInteractionReplyForPickedUpCall = (locale: string, callId: string): EmbedBuilder => {
	const translator = getCallTranslator(locale);

	return new EmbedBuilder({
		...(translator("hangup.baseEmbed", {
			callId,
		}) as APIEmbed),
	})
		.setColor(config.colors.success)
		.setDescription(translator("hangup."));
};
