import { Numbers } from "@src/database/generated";
import { CallsWithNumbers } from "@src/types/CallsWithNumbers";

interface SplitCallSidesResult {
	thisSide: Numbers;
	otherSide: Numbers;
}
export const splitCallSidesByChannel = ({ to, from }: CallsWithNumbers, thisSideChannelId: string): SplitCallSidesResult => {
	if (to.channelID === thisSideChannelId) {
		return {
			thisSide: to,
			otherSide: from,
		};
	}

	return {
		thisSide: from,
		otherSide: to,
	};
};
