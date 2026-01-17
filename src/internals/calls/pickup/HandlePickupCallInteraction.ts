import { winston } from "@src/instances/winston";
import { pickupCall } from "@src/internals/calls/pickup/perform-pickup/PickupCall";
import { sendPickupInteractionReply } from "@src/internals/calls/pickup/perform-pickup/messages/interaction-reply/send/SendPickupInteractionReply";
import { sendPickupNotificationEmbed } from "@src/internals/calls/pickup/perform-pickup/messages/picked-up-notification/send/SendPickupNotificationEmbed";
import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { getNumberFromDbByChannel } from "@src/internals/numbers/get-from-db-by-channel/GetNumberFromDbByChannel";
import { MessageComponentInteraction } from "discord.js";
import { getCallByChannelOrEndIfASideDoesNotExist } from "@src/internals/calls/db/get-by-channel/GetCallByChannelOrEndIfASideDoesNotExist";
import { hangupInDb } from "@src/internals/calls/db/hangup-in-db/HangupInDb";

export const handlePickupCallInteraction = async(interaction: MessageComponentInteraction): Promise<void> => {
	const number = await getNumberFromDbByChannel(interaction.channelId);
	if (!number) {
		await interaction.reply({
			// TODO: i18n
			embeds: [generateErrorEmbed("Couldn't find your number. Try again later.")],
		});
		return;
	}

	const callData = await getCallByChannelOrEndIfASideDoesNotExist(number.channelID);
	if (!callData) {
		winston.warn(`Attempted to pick up unknown call for number ${number.number}`);
		await interaction.reply({
			// TODO: i18n
			embeds: [generateErrorEmbed("Couldn't find that call. Try again later.")],
		});
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
		hangupInDb(callData, "notification-failure").catch(() => null);
		interaction.channel?.send("❌ An error occurred while trying to notify the other side that the call was picked up. The call has been ended. Please try your call again.").catch(() => null);
		return;
	}

	winston.verbose(`Call ID ${callData.id} was picked up by ${interaction.user.username} (${interaction.user.id})`);
};
