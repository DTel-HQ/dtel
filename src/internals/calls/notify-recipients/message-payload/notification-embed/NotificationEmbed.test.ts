import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import * as target from "./NotificationEmbed";
import { buildTestParticipant } from "@src/internals/calls/utils/build-test-participant/BuildTestParticipant";
import config from "@src/config/config";
import { isVIP } from "@src/internals/calls/notify-recipients/is-vip/isVIP";
import { initInternationalization } from "@src/internationalization/i18n";

jest.mock("@src/internals/calls/notify-recipients/is-vip/isVIP");

const isVIPMock = jest.mocked(isVIP);

beforeEach(() => {
	initInternationalization();
});

it("should return a notification embed", () => {
	isVIPMock.mockReturnValue(false);

	const embed = target.generateNotificationEmbed({
		call: buildTestCall({
			id: "an ID",
		}),
		callerDisplay: "Caller Display",
		from: buildTestParticipant({
			number: "03010000001",
		}),
		to: buildTestParticipant({
			number: "03010000002",
		}),
	});

	expect(embed.data.color).toStrictEqual(config.colors.info);
	expect(embed.data.title).toStrictEqual("<:DTelPhone:709100612935221289> Incoming call");
	expect(embed.data.description).toStrictEqual("There is an incoming call from `Caller Display`. Pick up, hang up or wait it out.");
	expect(embed.data.footer).toStrictEqual({
		text: "ID: an ID",
	});
});

it("should have the VIP colour if the number is a VIP", () => {
	isVIPMock.mockReturnValue(true);

	const embed = target.generateNotificationEmbed({
		call: buildTestCall({
			id: "an ID",
		}),
		callerDisplay: "Caller Display",
		from: buildTestParticipant({
			number: "03010000001",
		}),
		to: buildTestParticipant({
			number: "03010000002",
		}),
	});

	expect(embed.data.color).toStrictEqual(config.colors.vip);
});
