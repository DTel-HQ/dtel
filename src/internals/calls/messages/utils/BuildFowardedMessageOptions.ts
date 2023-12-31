import config from "@src/config/config";
import { CallsWithNumbers } from "@src/instances/calls";
import { messageHasAttachments } from "@src/internals/utils/message-has-attachments/MessageHasAttachments";
import { Message, MessageCreateOptions } from "discord.js";

export const buildForwardedMessageOptions = async(message: Message, call: CallsWithNumbers): Promise<MessageCreateOptions> => {
	const toSend: MessageCreateOptions = {
		embeds: [],
	};

	if (messageHasAttachments(message)) {
		for (const i of message.attachments.values()) {
			if (i.contentType?.startsWith("image/")) {
				toSend.embeds?.push({
					image: {
						url: i.url,
					},
				});
			} else {
				toSend.embeds?.push({
					color: config.colors.yellowbook,
					description: `File: **[${i.name}](${i.url})**`,
					footer: {
						text: sideToSendTo.t("dontTrustStrangers"),
					},
				});
			}
		}
	}

	return toSend;
};
