import { Numbers } from "@prisma/client";
import { CallsWithNumbers } from "@src/internals/callClient.old";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import * as target from "./SplitSidesByChannel";

let call: CallsWithNumbers;
let thisSideChannelId: string;
let thisSideNumber: Numbers;
let otherSideNumber: Numbers;

beforeEach(() => {
	thisSideChannelId = "this_side_channel";
	thisSideNumber = buildTestNumber({
		number: "this_side",
		channelID: thisSideChannelId,
	});
	otherSideNumber = buildTestNumber({
		number: "other_side",
	});

	call = {
		...buildTestCall(),
		toNum: "this_side",
		fromNum: "other_side",
		to: thisSideNumber,
		from: otherSideNumber,
	};
});

it("should separate out the two sides of the call", () => {
	const result = target.splitCallSidesByChannel(call, thisSideChannelId);

	expect(result).toEqual({
		thisSide: thisSideNumber,
		otherSide: otherSideNumber,
	});
});
