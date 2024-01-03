import config from "@src/config/config";
import { CallsWithNumbers } from "@src/instances/calls";
import { PermissionLevel } from "@src/interfaces/commandData";
import { getPhone } from "@src/internals/calls/messages/utils/get-phone/GetPhone";
import { isVIP } from "@src/internals/calls/notify-recipients/is-vip/isVIP";
import { getDisplayableUsername } from "@src/internals/utils/get-displayable-username/GetDisplayableUsername";
import { getPerms } from "@src/internals/utils/get-perms/GetPerms";
import { isMemberAServerAdmin } from "@src/internals/utils/is-member-server-admin/IsMemberServerAdmin";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";
import { Message } from "discord.js";

export const buildForwardedMessageContent = async(message: Message, call: CallsWithNumbers): Promise<string> => {
	const userPerms = await getPerms(message.author.id);

	let content = `**${getDisplayableUsername(message.author)}`;

	const { thisSide, otherSide } = splitCallSidesByChannel(call, message.channelId);
	if (isVIP(thisSide) && thisSide.vip?.hidden) {
		content = `**Anonymous#${message.author.id.slice(-4)}`;
	}

	if (otherSide.number === config.supportGuild.supportNumber) {
		content += `(${message.author.id})`;
	}

	const callPhones = config.callPhones;
	let phone = "";

	if (userPerms < PermissionLevel.customerSupport && isMemberAServerAdmin(message.member)) {
		phone = callPhones.admin;
	} else {
		phone = getPhone(userPerms);
	}

	content += `** ${phone} `;
	content += message.content;

	return content;
};
