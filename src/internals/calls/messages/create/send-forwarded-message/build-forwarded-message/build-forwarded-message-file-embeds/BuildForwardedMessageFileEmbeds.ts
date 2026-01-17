import config from "@src/config/config";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { EmbedBuilder, Message } from "discord.js";

export const buildForwardedMessageFileEmbeds = (message: Message, otherSideLocale: string): EmbedBuilder[] => {
	const translator = getCallTranslator(otherSideLocale);

	return Array.from(message.attachments.values()).map(file =>
		new EmbedBuilder()
			.setColor(config.colors.yellowbook)
			.setDescription(`File: **[${file.name}](${file.url})**`)
			.setFooter({
				text: translator("dontTrustStrangers"),
			}),
	);
};
