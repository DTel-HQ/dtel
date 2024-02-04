import config from "@src/config/config";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { APIEmbed, EmbedBuilder } from "discord.js";

export const buildPickupNotificationEmbed = (locale: string, callId: string): EmbedBuilder => {
	const translator = getCallTranslator(locale);

	return new EmbedBuilder({
		...(translator("pickedUp.fromSide", {
			callId,
		}) as APIEmbed),
	}).setColor(config.colors.success);
};
