import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { EmbedBuilder } from "discord.js";

export const missedCallFromSideEmbed = (locale: string): EmbedBuilder => {
	const fromSideTranslator = getCallTranslator(locale);

	return new EmbedBuilder(fromSideTranslator("missedCall.fromSide"));
};
