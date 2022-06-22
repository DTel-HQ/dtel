import { Typing } from "discord.js";
import DTelClient from "../internals/client";

export default (client: DTelClient, typing: Typing): void => {
	if (typing.user.bot) return;
	const call = client.calls.find(c => c.from.channelID === typing.channel.id || c.to.channelID === typing.channel.id);
	if (!call) return;

	call.typingStart(typing);
};
