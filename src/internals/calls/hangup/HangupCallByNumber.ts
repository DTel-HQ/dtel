import { Numbers } from "@prisma/client";
import { getCallByNumber } from "@src/internals/calls/db/get-from-db-by-number/GetCallByNumber";
import { hangupInDb } from "@src/internals/calls/hangup/hangup-in-db/HangupInDb";
import { sendHangupInteractionReplyForPickedUpCall } from "@src/internals/calls/hangup/messages/picked-up/send-interaction-reply/SendHangupInteractionReplyForPickedUpCall";
import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import winston from "winston";

export const hangupCallByNumber = async(number: Numbers, interaction: CommandInteraction | MessageComponentInteraction) => {
	const callData = await getCallByNumber(number.number);
	if (!callData) {
		winston.warn(`Attempted to hang up unknown call for number ${number.number}`);
		await interaction.reply({
			// TODO: i18n
			embeds: [generateErrorEmbed("Couldn't find that call. Try again later.")],
		});
		return;
	}

	if (!callData.to || !callData.from) {
		winston.warn(`Lost one of the sides of call ${callData.id}`);
		// Exit out of the main flow, as it doesn't work if we're missing either side
		// TODO: End failed call
	}

	await hangupInDb(callData, interaction.user.id);

	if (callData.pickedUp) {
		try {
			await sendHangupInteractionReplyForPickedUpCall(interaction, callData);
		} catch (error) {
			winston.warn("Caught an error when sending interaction reply, ", error);
		}
	}
};
