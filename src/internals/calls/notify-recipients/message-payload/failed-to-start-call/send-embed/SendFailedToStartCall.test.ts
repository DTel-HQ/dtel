import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import * as target from "./SendFailedToStartCall";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { initInternationalization } from "@src/internationalization/i18n";
import config from "@src/config/config";

let participant: CallParticipant;

beforeEach(() => {
	participant = buildTestParticipant();
	initInternationalization();
});

it("should send the failed to start call embed", () => {
	target.sendFailedToStartCall(participant);

	expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith({
		embeds: [expect.objectContaining({
			data: {
				color: config.colors.error,
				title: "❌ Error!",
				description: "We couldn't send a message to the other side. This is due to an incorrect configuration on the other end.",
			},
		})],
	}, participant.channelID);
});
