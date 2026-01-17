import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./GetCallTranslator";

beforeEach(() => {
	initInternationalization();
});

it("should return the English call translations", () => {
	const result = target.getCallTranslator("en");

	expect(result("pickup")).toStrictEqual("Pick up");
});
