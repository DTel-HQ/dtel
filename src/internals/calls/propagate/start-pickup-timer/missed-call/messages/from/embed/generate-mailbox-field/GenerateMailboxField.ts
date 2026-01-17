import { Mailbox, Numbers } from "@prisma/client";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { EmbedField } from "discord.js";

export const generateMailboxField = async(from: Numbers, mailbox: Mailbox, locale: string): Promise<EmbedField[]> => {
	const translator = getCallTranslator(locale);
	const isMailboxFull = mailbox.messages.length >= 50;

	let autoreply = `${mailbox.autoreply}`;
	if (isMailboxFull) autoreply += " (Mailbox full)";

	return [{
		name: translator("answeringMachine"),
		value: autoreply,
		inline: false,
	}];
};
