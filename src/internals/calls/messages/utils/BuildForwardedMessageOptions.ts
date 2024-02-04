import { CallsWithNumbers } from "@src/instances/calls";
import { buildForwardedMessageContent } from "@src/internals/calls/messages/create/send-forwarded-message/build-forwarded-message/build-forwarded-message-content/BuildForwardedMessageContent";
import { buildForwardedMessageFileEmbeds } from "@src/internals/calls/messages/create/send-forwarded-message/build-forwarded-message/build-forwarded-message-file-embeds/BuildForwardedMessageFileEmbeds";
import { getNumberLocale } from "@src/internals/utils/get-number-locale/GetNumberLocale";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { Message, MessageCreateOptions } from "discord.js";

export const buildForwardedMessageOptions = async(message: Message, call: CallsWithNumbers): Promise<MessageCreateOptions> => {
	const { otherSide } = splitCallSidesByChannel(call, message.channelId);
	const otherSideLocale = await getNumberLocale(otherSide);

	return {
		embeds: buildForwardedMessageFileEmbeds(message, otherSideLocale),
		content: await buildForwardedMessageContent(message, call),
	};
};
