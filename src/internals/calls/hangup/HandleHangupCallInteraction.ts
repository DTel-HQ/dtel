import { getCallByNumber } from "@src/internals/calls/db/get-from-db-by-number/GetCallByNumber";
import { hangupInDb } from "@src/internals/calls/hangup/perform-hangup/hangup-in-db/HangupInDb";
import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { getNumberFromDbByChannel } from "@src/internals/numbers/get-from-db-by-channel/GetNumberFromDbByChannel";
import { MessageComponentInteraction } from "discord.js";
import winston from "winston";

export const handleHangupCallInteraction = async(interaction: MessageComponentInteraction): Promise<void> => {
	const number = await getNumberFromDbByChannel(interaction.channelId);
	if (!number) {
		await interaction.reply({
			// TODO: i18n
			embeds: [generateErrorEmbed("Couldn't find your number. Try again later.")],
		});
		return;
	}

	const callData = await getCallByNumber(number.number);
	if (!callData) {
		winston.warn(`Attempted to pick up unknown call for number ${number.number}`);
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

	await hangupInDb(callData.id, interaction.user.id);

	if (callData.pickedUp) {
		try {
			await sendHangupInteractionReply(interaction, callData.id);
		} catch (error) {
			winston.warn("Caught an error when sending interaction reply, ", error);
		}

		
	}

	
};
