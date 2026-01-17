import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";

export const isParticipantInCall = (details: CallParticipant): boolean => details.incomingCalls.length > 0 || details.outgoingCalls.length > 0;
