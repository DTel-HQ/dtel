import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import * as target from "./SendMissedCallMessageToSide";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import { initInternationalization } from "@src/internationalization/i18n";
import config from "@src/config/config";

let participant: CallParticipant;

beforeEach(() => {
	initInternationalization();
	participant = buildTestParticipant();
});

it("should send the missed call embed to the provided participant", () => {
	target.sendMissedCallMessageToSide(participant, "en");

	expect(discordClientMock.sendCrossShard).toHaveBeenCalledWith({
		embeds: [expect.objectContaining({
			data: {
				color: config.colors.error,
				title: "Call expired",
				description: "You missed the call (not answered within 2 minutes)",
			},
		})],
	}, participant.channelID);
});
