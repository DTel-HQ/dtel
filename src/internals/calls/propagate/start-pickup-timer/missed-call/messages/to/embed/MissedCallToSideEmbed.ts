import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { EmbedBuilder } from "discord.js";

export const missedCallToSideEmbed = (locale: string): EmbedBuilder => {
	const toSideTranslator = getCallTranslator(locale);

	return new EmbedBuilder(toSideTranslator("missedCall.toSide"));
};
