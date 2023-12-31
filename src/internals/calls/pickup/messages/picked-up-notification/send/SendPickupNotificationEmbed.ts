import { client } from "@src/instances/client";
import { buildPickupNotificationEmbed } from "@src/internals/calls/pickup/messages/picked-up-notification/embed/BuildPickupNotificationEmbed";
import { APIMessage } from "discord.js";

export const sendPickupNotificationEmbed = (fromChannelId: string, locale: string, callId: string): Promise<APIMessage> => client.sendCrossShard({
	embeds: [buildPickupNotificationEmbed(locale, callId)],
}, fromChannelId);
