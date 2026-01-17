import { Typing } from "discord.js";
import DTelClient from "@src/internals/client";
import { getCallByChannelOrEndIfASideDoesNotExist } from "@src/internals/calls/db/get-by-channel/GetCallByChannelOrEndIfASideDoesNotExist";
import { splitCallSidesByChannel } from "@src/internals/utils/split-sides-by-channel/SplitSidesByChannel";

export const typingStartHandler = async(client: DTelClient, typing: Typing): Promise<void> => {
	if (typing.user.bot) return;
	const call = await getCallByChannelOrEndIfASideDoesNotExist(typing.channel.id);
	if (!call) return;

	const { otherSide } = splitCallSidesByChannel(call, typing.channel.id);

	client.rest.post(`/channels/${otherSide.channelID}/typing`).catch(() => null);
};
