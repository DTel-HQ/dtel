import { ActiveCalls } from "@prisma/client";
import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { EmbedBuilder } from "discord.js";
import { isVIP } from "@src/internals/calls/notify-recipients/is-vip/isVIP";
import config from "@src/config/config";

interface NotificationEmbedParams {
	call: ActiveCalls
	to: CallParticipant,
	from: CallParticipant,
	callerDisplay: string,
}
export const generateNotificationEmbed = ({
	call,
	to,
	from,
	callerDisplay,
}: NotificationEmbedParams): EmbedBuilder => {
	const toSideTranslator = getCallTranslator(to.guild?.locale);

	const embed = new EmbedBuilder({
		...toSideTranslator("incomingCall", {
			number: callerDisplay,
			callID: call.id,
		}),
	});

	if (isVIP(from)) {
		embed.setColor(config.colors.vip);
	} else {
		embed.setColor(config.colors.info);
	}

	return embed;
};
