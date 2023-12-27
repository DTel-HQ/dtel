import * as target from "./MissedCallFromSideEmbed";
import config from "@src/config/config";
import { initInternationalization } from "@src/internationalization/i18n";

beforeEach(() => {
	initInternationalization();
});

it("should return the missed call embed", () => {
	const embed = target.missedCallFromSideEmbed("en");

	expect(embed.data.color).toStrictEqual(config.colors.error);
	expect(embed.data.title).toStrictEqual("Call expired");
	expect(embed.data.description).toStrictEqual("The other side did not pick up (within 2 minutes)");
});
