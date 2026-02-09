import { ActiveCalls } from "@src/database/generated";
import { ReplyableInteraction } from "@src/types/ReplyableInteraction";
import { APIEmbed, EmbedBuilder, InteractionResponse } from "discord.js";
import { getHangupTranslator } from "@src/internals/calls/hangup/utils/get-hangup-translator/GetHangupTranslator";
import config from "@src/config/config";

export const sendHangupInteractionReplyForNotPickedUpCall = (interaction: ReplyableInteraction, call: ActiveCalls): Promise<InteractionResponse> => interaction.reply({
	embeds: [buildEmbed(interaction.locale, call)],
});


const buildEmbed = (locale: string, call: ActiveCalls): EmbedBuilder => {
	const translator = getHangupTranslator(locale);

	return new EmbedBuilder({
		...(translator("baseEmbed", {
			callId: call.id,
		}) as APIEmbed),
	})
		.setColor(config.colors.error)
		.setDescription(translator("descriptions.notPickedUp.thisSide"));
};
