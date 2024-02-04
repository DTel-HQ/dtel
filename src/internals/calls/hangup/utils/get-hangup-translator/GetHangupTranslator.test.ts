import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./GetHangupTranslator";

beforeEach(() => {
	initInternationalization();
});

it("should return the English call translations", () => {
	const result = target.getCallTranslator("en");

	expect(result("descriptions.notPickedUp.thisSide")).toStrictEqual("You have ended the call.");
});
