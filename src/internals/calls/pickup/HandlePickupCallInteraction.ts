import { winston } from "@src/instances/winston";
import { getCallByNumber } from "@src/internals/calls/db/get-from-db-by-number/GetCallByNumber";
import { pickupCall } from "@src/internals/calls/pickup/perform-pickup/PickupCall";
import { sendPickupInteractionReply } from "@src/internals/calls/pickup/perform-pickup/messages/interaction-reply/send/SendPickupInteractionReply";
import { sendPickupNotificationEmbed } from "@src/internals/calls/pickup/perform-pickup/messages/picked-up-notification/send/SendPickupNotificationEmbed";
import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { getNumberFromDbByChannel } from "@src/internals/numbers/get-from-db-by-channel/GetNumberFromDbByChannel";
import { MessageComponentInteraction } from "discord.js";

export const handlePickupCallInteraction = async(interaction: MessageComponentInteraction): Promise<void> => {
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
		// TODO: End failed call
		return;
	}

	await pickupCall(callData, interaction.user.id);

	try {
		await sendPickupInteractionReply(interaction, callData.id);
	} catch (error) {
		winston.warn("Caught an error when sending interaction reply, ", error);
	}

	try {
		// TODO: get a locale for this side
		await sendPickupNotificationEmbed(callData.from.channelID, "en", callData.id);
	} catch {
		winston.warn("Caught an error when sending interaction reply");
		// TODO: End failed call
	}

	winston.verbose(`Call ID ${callData.id} was picked up by ${interaction.user.username} (${interaction.user.id})`);
};
