import { CallsWithNumbers } from "@src/instances/calls";

export function getSideForChannel(call: CallsWithNumbers, channelId: string): "to" | "from" | null {
	if (call.to.channelID === channelId) {
		return "to";
	} else if (call.from.channelID === channelId) {
		return "from";
	} else {
		console.warn(`Channel ID ${channelId} not found in call ID ${call.id}`);
		return null;
	}
}
