import { Numbers } from "@prisma/client";
import { client } from "@src/instances/client";
import { missedCallToSideEmbed } from "@src/internals/calls/propagate/start-pickup-timer/missed-call/messages/to/embed/MissedCallToSideEmbed";

export const sendMissedCallMessageToSide = (to: Numbers, locale: string) => {
	const canSendMessage = toMailbox?.receiving && toMailbox?.messages.length < 25;

	client.sendCrossShard({
		embeds: [missedCallToSideEmbed(locale)],
	}, to.channelID);
};
