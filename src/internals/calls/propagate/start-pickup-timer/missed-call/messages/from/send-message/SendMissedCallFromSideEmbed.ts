import { Numbers } from "@prisma/client";
import { client } from "@src/instances/client";
import { missedCallFromSideButtons } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/components/MissedCallFromSideButtons";
import { missedCallFromSideEmbed } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/embed/MissedCallFromSideEmbed";
import { generateMailboxField } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/from/embed/generate-mailbox-field/GenerateMailboxField";
import { getMailboxByNumber } from "@src/internals/mailbox/get-from-db-by-number/GetMailboxByNumber";
import { APIMessage, ActionRowBuilder, ButtonBuilder } from "discord.js";

interface SendMissedCallFromSideEmbedProps {
	from: Numbers,
	to: Numbers,
	fromLocale: string
}

export const sendMissedCallFromSideEmbed = async({
	from,
	to,
	fromLocale,
}: SendMissedCallFromSideEmbedProps): Promise<APIMessage> => {
	const mailbox = await getMailboxByNumber(from.number);

	let actionRow: ActionRowBuilder<ButtonBuilder> | undefined;

	const embed = missedCallFromSideEmbed(fromLocale);

	if (mailbox) {
		actionRow = missedCallFromSideButtons(to, mailbox, fromLocale);

		embed.addFields(await generateMailboxField(from, mailbox, fromLocale));
	}

	return client.sendCrossShard({
		embeds: [embed],
		components: actionRow ? [actionRow] : undefined,
	}, from.channelID);
};
