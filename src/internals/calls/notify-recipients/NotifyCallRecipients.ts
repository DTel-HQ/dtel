import { ActiveCalls } from "@prisma/client";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { getCallerDisplay } from "@src/internals/calls/notify-recipients/get-caller-display/GetCallerDisplay";
import { replaceNumberAlias } from "@src/internals/calls/utils/replace-number-alias/ReplaceNumberAlias";
import config from "@src/config/config";
import { getMentionsString } from "@src/internals/calls/notify-recipients/get-mentions-string/GetMentionsString";
import { generateNotificationEmbed } from "@src/internals/calls/notify-recipients/message-payload/notification-embed/NotificationEmbed";
import { client } from "@src/instances/client";
import { generateNotificationMessageButtons } from "@src/internals/calls/notify-recipients/message-payload/message-buttons/NotificationMessageButtons";

export const notifyCallRecipients = async(call: ActiveCalls, to: CallParticipant, from: CallParticipant): Promise<string> => {
	const callerDisplay = getCallerDisplay(from);

	let notificationMessageContent = "";
	if (to.number === replaceNumberAlias("*611")) {
		notificationMessageContent = `<@&${config.supportGuild.roles.customerSupport}>`;
	}

	notificationMessageContent += getMentionsString(to.mentions);

	const messagePostResponse = await client.sendCrossShard({
		content: notificationMessageContent,

		embeds: [generateNotificationEmbed({
			call,
			callerDisplay,
			from,
			to,
		})],
		components: [generateNotificationMessageButtons(to)],
	}, to.channelID);

	return messagePostResponse.id;
};
