import { getCallTranslator } from "@src/internals/calls/utils/get-call-translator/GetCallTranslator";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export const generateNotificationMessageButtons = (to: CallParticipant): ActionRowBuilder<ButtonBuilder> => {
	const toSideTranslator = getCallTranslator(to.guild?.locale);

	return new ActionRowBuilder<ButtonBuilder>()
		.addComponents([
			new ButtonBuilder({
				customId: "call-pickup",
				label: toSideTranslator("pickup"),
				style: ButtonStyle.Primary,
				emoji: "📞",
			}),

			new ButtonBuilder({
				customId: "call-hangup",
				label: toSideTranslator("hangup")!,
				style: ButtonStyle.Secondary,
				emoji: "☎️",
			}),
		]);
};
