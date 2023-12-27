import * as target from "./GetNumberLocale";
import { buildTestNumber } from "@src/internals/calls/utils/build-test-number/BuildTestNumber";
import { GuildConfigs, Numbers } from "@prisma/client";
import { prismaMock } from "@src/mocks/prisma.test";

let number: Numbers;

beforeEach(() => {
	number = buildTestNumber();
});

it("should return english if no guild ID available", async() => {
	number.guildID = null;

	const result = await target.getNumberLocale(number);

	expect(result).toStrictEqual("en");
});

it("should return english if guild has no locale", async() => {
	number.guildID = "guild_id";

	prismaMock.guildConfigs.findUnique.mockResolvedValue(null);

	const result = await target.getNumberLocale(number);

	expect(result).toStrictEqual("en");
});


it("should return the locale if available", async() => {
	number.guildID = "guild_id";

	prismaMock.guildConfigs.findUnique.mockResolvedValue({
		locale: "es-ES",
	} as GuildConfigs);

	const result = await target.getNumberLocale(number);

	expect(result).toStrictEqual("es-ES");
});
