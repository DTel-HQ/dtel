import { ActiveCalls } from "@src/database/generated";
import { buildHangupInteractionReplyForPickedUpCall } from "@src/internals/calls/hangup/messages/picked-up/send-interaction-reply/embed/BuildHangupInteractionReplyForPickedUpCall";
import { ReplyableInteraction } from "@src/types/ReplyableInteraction";
import { InteractionResponse } from "discord.js";

export const sendHangupInteractionReplyForPickedUpCall = (interaction: ReplyableInteraction, call: ActiveCalls): Promise<InteractionResponse> => interaction.reply({
	embeds: [buildHangupInteractionReplyForPickedUpCall(interaction.locale, call)],
});
