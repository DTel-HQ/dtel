import * as target from "./BuildTestNumber";

it("should return a test number", () => {
	const result = target.buildTestNumber();

	expect(result).toStrictEqual({
		number: "03010000001",
		blocked: [],
		channelID: "channel_id",
		contacts: [],
		createdAt: new Date("2024-01-01T15:35:18.705Z"),
		expiry: new Date("2024-03-01T15:35:18.705Z"),
		fka: [],
		guildID: "guild_id",
		mentions: [],
		userID: null,
		vip: null,
		waiting: false,
	});
});

it("should respect provided properties", () => {
	const result = target.buildTestNumber({
		blocked: ["test data"],
	});

	expect(result).toStrictEqual({
		number: "03010000001",
		blocked: ["test data"],
		channelID: "channel_id",
		contacts: [],
		createdAt: new Date("2024-01-01T15:35:18.705Z"),
		expiry: new Date("2024-03-01T15:35:18.705Z"),
		fka: [],
		guildID: "guild_id",
		mentions: [],
		userID: null,
		vip: null,
		waiting: false,
	});
});
