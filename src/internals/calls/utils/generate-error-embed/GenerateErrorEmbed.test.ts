import config from "@src/config/config";
import * as target from "./GenerateErrorEmbed";

it("should return an error embed", () => {
	const embed = target.generateErrorEmbed("description");

	expect(embed.data.color).toStrictEqual(config.colors.error);
	expect(embed.data.title).toStrictEqual("❌ Error!");
	expect(embed.data.description).toStrictEqual("description");
});

it("should accept extra fields", () => {
	const embed = target.generateErrorEmbed("description", {
		footer: {
			text: "footer",
		},
	});

	expect(embed.data.footer).toStrictEqual({
		text: "footer",
	});
});
