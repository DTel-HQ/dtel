import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import * as target from "./FailedToStartCall";
import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import { initInternationalization } from "@src/internationalization/i18n";

let participant: CallParticipant;

beforeEach(() => {
	participant = buildTestParticipant();
	initInternationalization();
});

it("should return the 'failed to start' embed", () => {
	const embed = target.failedToStartCallEmbed(participant);

	expect(embed.data.description).toStrictEqual("We couldn't send a message to the other side. This is due to an incorrect configuration on the other end.");
});
