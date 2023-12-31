import { buildPickupInteractionReplyEmbed } from "@src/internals/calls/pickup/messages/interaction-reply/embed/PickupInteractionReplyEmbed";
import { InteractionResponse, MessageComponentInteraction } from "discord.js";

export const sendPickupInteractionReply = (interaction: MessageComponentInteraction, callId: string): Promise<InteractionResponse> => interaction.reply({
	embeds: [buildPickupInteractionReplyEmbed(interaction.locale, callId)],
});
