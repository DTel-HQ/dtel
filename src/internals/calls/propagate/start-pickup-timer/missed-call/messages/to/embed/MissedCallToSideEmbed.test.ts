import * as target from "./MissedCallToSideEmbed";
import config from "@src/config/config";
import { initInternationalization } from "@src/internationalization/i18n";

beforeEach(() => {
	initInternationalization();
});

it("should return the missed call embed", () => {
	const embed = target.missedCallToSideEmbed("en");

	expect(embed.data.color).toStrictEqual(config.colors.error);
	expect(embed.data.title).toStrictEqual("Call expired");
	expect(embed.data.description).toStrictEqual("You missed the call (not answered within 2 minutes)");
});
