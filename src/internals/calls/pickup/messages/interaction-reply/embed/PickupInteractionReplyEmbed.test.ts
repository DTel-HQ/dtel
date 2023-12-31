import { initInternationalization } from "@src/internationalization/i18n";
import * as target from "./PickupInteractionReplyEmbed";
import config from "@src/config/config";

beforeEach(() => {
	initInternationalization();
});

it("should return the picked up to side embed", () => {
	const embed = target.buildPickupInteractionReplyEmbed("en", "call_id");

	expect(embed.data.color).toStrictEqual(config.colors.success);
	expect(embed.data.title).toStrictEqual("You picked up the call");
	expect(embed.data.description).toStrictEqual("You can now talk to the other side, put the call on hold `/hold` or hang up `/hangup`\nRemember to follow the [rules](https://dtel.austinhuang.me/en/latest/FAQ/#rules).");
	expect(embed.data.footer).toBeDefined();
	expect(embed.data.footer!.text).toStrictEqual("ID: call_id");
});
