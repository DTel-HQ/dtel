import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./BuildHangupInteractionReplyForPickedUpCall";
import config from "@src/config/config";
import { buildTestCall } from "@src/internals/calls/utils/build-test-call/BuildTestCall";
import { ActiveCalls } from "@prisma/client";

jest.useFakeTimers();

let call: ActiveCalls;

beforeEach(() => {
	initInternationalization();
	jest.setSystemTime(new Date(2024, 2, 10, 0, 10));
	call = buildTestCall({
		started: {
			at: new Date(2024, 2, 10, 0),
			by: "me",
		},
	});
});

it("should return the embed for the end of a picked up call", () => {
	const embed = target.buildHangupInteractionReplyForPickedUpCall("en", call);

	expect(embed.data.color).toStrictEqual(config.colors.error);
	expect(embed.data.title).toStrictEqual("The call has ended!");
	expect(embed.data.description).toStrictEqual("You have ended the call after 10 minutes.");
	expect(embed.data.footer).toBeDefined();
	expect(embed.data.footer!.text).toStrictEqual("ID: call_id");
});
