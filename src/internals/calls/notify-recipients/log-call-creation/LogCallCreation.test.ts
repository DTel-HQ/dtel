import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import * as target from "./LogCallCreation";
import { ActiveCalls } from "@prisma/client";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import config from "@src/config/config";

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

it("should log a random call", () => {
	const randomCallMessage = `☎️ Random Call \`from_channel → to_channel\` has been established by ID: \`me\`\nCall ID: \`call_id\``;
	call.randomCall = true;

	target.logCallCreation(call, to, from);

	expect(discordClientMock.log).toHaveBeenCalledWith(randomCallMessage);
});

it("should log a random call", () => {
	const randomCallMessage = `${config.callPhones.default} Call \`from_channel → to_channel\` has been established by ID: \`me\`\nCall ID: \`call_id\``;
	call.randomCall = false;

	target.logCallCreation(call, to, from);

	expect(discordClientMock.log).toHaveBeenCalledWith(randomCallMessage);
});
