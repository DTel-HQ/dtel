import { Numbers } from "@prisma/client";
import { isVIP } from "@src/internals/calls/notify-recipients/is-vip/isVIP";

export const getCallerDisplay = (details: Numbers): string => {
	if (!isVIP(details)) return details.number;

	const vipDetails = details.vip!;
	let callerDisplay;

	if (vipDetails.name.length > 0 && !vipDetails.hidden) {
		callerDisplay = `${vipDetails.name} (${details.number})`;
	} else if (vipDetails.name.length > 0) {
		callerDisplay = vipDetails.name;
	} else if (vipDetails.hidden) {
		callerDisplay = "Hidden";
	} else {
		callerDisplay = details.number;
	}

	return callerDisplay;
};
