import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";

export const buildTestParticipant = (details?: Partial<CallParticipant>): CallParticipant => ({
	incomingCalls: [],
	outgoingCalls: [],
	guild: null,
	...buildTestNumber(details),
	...details,
});
