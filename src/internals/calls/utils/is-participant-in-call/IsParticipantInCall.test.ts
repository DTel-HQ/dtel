import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import * as target from "./IsParticipantInCall";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";

it("should return true if the number has incoming calls", () => {
	const result = target.isParticipantInCall({
		...buildTestNumber(),
		incomingCalls: [buildTestCall()],
		outgoingCalls: [],
		guild: null,
	});

	expect(result).toBe(true);
});

it("should return true if the number has outgoing calls", () => {
	const result = target.isParticipantInCall({
		...buildTestNumber(),
		incomingCalls: [],
		outgoingCalls: [buildTestCall()],
		guild: null,
	});

	expect(result).toBe(true);
});

it("should return false if the number has no active calls", () => {
	const result = target.isParticipantInCall({
		...buildTestNumber(),
		incomingCalls: [],
		outgoingCalls: [],
		guild: null,
	});

	expect(result).toBe(false);
});

