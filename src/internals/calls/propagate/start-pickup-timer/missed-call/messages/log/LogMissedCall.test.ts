import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import * as target from "./LogMissedCall";
import { ActiveCalls } from "@prisma/client";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { discordClientMock } from "@src/mocks/DiscordClient.test";

let call: ActiveCalls;
let to: CallParticipant;
let from: CallParticipant;

beforeEach(() => {
	call = buildTestCall({
		id: "call_id",
		started: {
			by: "me",
			at: new Date(),
		},
	});
	to = buildTestParticipant({
		channelID: "to_channel",
		number: "to_number",
	});
	from = buildTestParticipant({
		channelID: "from_channel",
		number: "from_number",
	});
});

it("should log a missed random call", () => {
	const expected = `❎ Random Call \`${from.channelID} → ${to.channelID}\` was not picked up.\nCall ID: \`${call.id}\``;
	call.randomCall = true;

	target.logMissedCall(call, to, from);

	expect(discordClientMock.log).toHaveBeenCalledWith(expected);
});

it("should log a random call", () => {
	const expected = `❎ Call \`${from.channelID} → ${to.channelID}\` was not picked up.\nCall ID: \`${call.id}\``;
	call.randomCall = false;

	target.logMissedCall(call, to, from);

	expect(discordClientMock.log).toHaveBeenCalledWith(expected);
});

it("should return undefined if logging fails", async() => {
	discordClientMock.log.mockRejectedValue(new Error("an error"));

	const result = await target.logMissedCall(call, to, from);

	expect(result).toBeUndefined;
});
