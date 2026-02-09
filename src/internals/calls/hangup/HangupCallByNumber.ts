import { Numbers } from "@src/database/generated";
import { getCallByNumber } from "@src/internals/calls/db/get-by-number/GetCallByNumber";
import { hangupInDb } from "@src/internals/calls/db/hangup-in-db/HangupInDb";
import { sendHangupInteractionReplyForPickedUpCall } from "@src/internals/calls/hangup/messages/picked-up/send-interaction-reply/SendHangupInteractionReplyForPickedUpCall";
import { generateErrorEmbed } from "@src/internals/calls/utils/generate-error-embed/GenerateErrorEmbed";
import { CommandInteraction, MessageComponentInteraction } from "discord.js";
import { sendHangupInteractionReplyForNotPickedUpCall } from "./messages/not-picked-up/send-interaction-reply/SendHangupInteractionReplyForNotPickedUpCall";
import { sendHangupCallEndNotificationForPickedUpCall } from "./messages/picked-up/call-end-notification/send/SendHangupCallEndNotificationForPickedUpCall";
import { sendHangupCallEndNotificationForNotPickedUpCall } from "./messages/not-picked-up/call-end-notification/SendHangupCallEndNotificationForPickedUpCall";
import { winston } from "@src/instances/winston";

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
		return;
	}

	await hangupInDb(callData, interaction.user.id);

	const sideInitiatingHangup = callData.from.channelID === interaction.channelId ? "from" : "to";
	const otherSideChannelId = sideInitiatingHangup === "from" ? callData.to.channelID : callData.from.channelID;

	if (callData.pickedUp) {
		winston.silly(`Sending hangup messages for picked up call ID ${callData.id}`);
		await sendHangupInteractionReplyForPickedUpCall(interaction, callData).catch(error => {
			winston.warn("Caught an error when sending interaction reply, ", error);
		});

		await sendHangupCallEndNotificationForPickedUpCall(
			otherSideChannelId,
			"en", // TODO: locale
			callData,
		).catch(error => {
			winston.warn("Caught an error when sending hangup notification, ", error);
		});
	} else {
		winston.silly(`Sending hangup messages for not picked up call ID ${callData.id}`);

		await sendHangupInteractionReplyForNotPickedUpCall(interaction, callData).catch(error => {
			winston.warn("Caught an error when sending interaction reply, ", error);
		});


		await sendHangupCallEndNotificationForNotPickedUpCall(
			otherSideChannelId,
			"en", // TODO: locale
			callData,
		).catch(error => {
			winston.warn("Caught an error when sending hangup notification, ", error);
		});
	}

	winston.verbose(`Call ID ${callData.id} was hung up by ${interaction.user.username} (${interaction.user.id})`);
};
