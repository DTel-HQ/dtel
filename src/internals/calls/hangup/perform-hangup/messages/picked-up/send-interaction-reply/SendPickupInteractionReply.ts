import { InteractionResponse, MessageComponentInteraction } from "discord.js";

export const sendHangupInteractionReply = (interaction: MessageComponentInteraction, callId: string): Promise<InteractionResponse> => interaction.reply({
	embeds: [buildHangupInteractionReplyEmbed(interaction.locale, callId)],
});
