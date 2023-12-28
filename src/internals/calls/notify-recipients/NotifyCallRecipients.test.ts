import { ActiveCalls } from "@prisma/client";
import * as target from "./NotifyCallRecipients";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { APIMessage } from "discord.js";
import { initInternationalization } from "@src/internationalization/i18n";

let call: ActiveCalls;
let to: CallParticipant;
let from: CallParticipant;

beforeEach(() => {
	initInternationalization();

	call = buildTestCall();
	to = buildTestParticipant({
		number: "03010000001",
	});
	from = buildTestParticipant({
		number: "03010000002",
	});
});

it("should send a notification embed if successful", async() => {
	discordClientMock.sendCrossShard.mockResolvedValue({
		id: "an ID",
	} as APIMessage);

	const result = await target.notifyCallRecipients(call, to, from);

	expect(result).toEqual("an ID");
});

it("should throw an error if unsuccessful", async() => {
	const resultGenerator = () => target.notifyCallRecipients(call, to, from);

	expect(resultGenerator).rejects.toThrow(Error);
});
