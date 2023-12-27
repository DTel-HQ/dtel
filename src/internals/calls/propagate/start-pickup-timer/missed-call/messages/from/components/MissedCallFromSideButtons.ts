import { ButtonBuilder } from "@discordjs/builders";
import { Mailbox, Numbers } from "@prisma/client";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { ActionRowBuilder, ButtonStyle } from "discord.js";

export const missedCallFromSideButtons = (to: Numbers, mailbox: Mailbox, fromLocale: string): ActionRowBuilder<ButtonBuilder> | undefined => {
	const translator = getCallTranslator(fromLocale);

	const canSendMessage = mailbox.receiving && mailbox.messages.length < 25;
	if (!canSendMessage) return undefined;

	return new ActionRowBuilder<ButtonBuilder>()
		.addComponents(
			new ButtonBuilder()
				.setCustomId(`mailbox-send-initiate-${to.number}`)
				.setEmoji({ name: "📬" })
				.setLabel(translator("sendMessage"))
				.setStyle(ButtonStyle.Primary),
		);
};
