import config from "@src/config/config";
import { PermissionLevel } from "@src/interfaces/commandData";
import { getPhone } from "@src/internals/calls/messages/utils/get-phone/GetPhone";
import { getDisplayableUsername } from "@src/internals/utils/get-displayable-username/GetDisplayableUsername";
import { getPerms } from "@src/internals/utils/get-perms/GetPerms";
import { isMemberAServerAdmin } from "@src/internals/utils/is-member-server-admin/IsMemberServerAdmin";
import { Message } from "discord.js";

export const buildForwardedMessageContent = async(message: Message): Promise<string> => {
	const userPerms = await getPerms(message.author.id);

	let content = `**${getDisplayableUsername(message.author)}`;

	const thisSide = this.getThisSideByChannel(message.channelId)!;
	if (thisSide.vip?.hidden) toSend.content = `**Anonymous#${message.author.id.slice(-4)}`;

	if (sideToSendTo.number === config.supportGuild.supportNumber) {
		toSend.content += `(${message.author.id})`;
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
