import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./BuildHangupInteractionReplyForPickedUpCall";
import config from "@src/config/config";

beforeEach(() => {
	initInternationalization();
});

it("should return the embed for the end of a picked up call", () => {
	const embed = target.BuildHangupInteractionReplyForPickedUpCall("en", "call_id");

	expect(embed.data.color).toStrictEqual(config.colors.error);
	expect(embed.data.title).toStrictEqual("The call has ended!");
	expect(embed.data.description).toStrictEqual("You have ended the call after 10 minutes.");
	expect(embed.data.footer).toBeDefined();
	expect(embed.data.footer!.text).toStrictEqual("ID: call_id");
});
