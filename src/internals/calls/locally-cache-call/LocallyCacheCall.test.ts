import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import * as target from "./LocallyCacheCall";
import { ActiveCalls } from "@prisma/client";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { calls } from "@src/instances/calls";

let call: ActiveCalls;
let to: CallParticipant;
let from: CallParticipant;

beforeEach(() => {
	call = buildTestCall();
	to = buildTestParticipant();
	from = buildTestParticipant();
});

it("should cache the call in the calls collection", () => {
	target.locallyCacheCall(call, to, from);

	expect(calls.at(0)).toEqual({
		...call,
		to,
		from,
	});
});
