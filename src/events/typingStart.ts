import { Typing } from "discord.js";
import DTelClient from "@src/internals/client";
import { calls } from "@src/instances/calls";

export const typingStartHandler = (client: DTelClient, typing: Typing): void => {
	if (typing.user.bot) return;
	const call = calls.find(c => c.from.channelID === typing.channel.id || c.to.channelID === typing.channel.id);
	if (!call) return;

	call.typingStart(typing);
};
