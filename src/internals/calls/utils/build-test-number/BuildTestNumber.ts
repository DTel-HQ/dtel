import { Numbers } from "@prisma/client";

export const buildTestNumber = (details?: Partial<Numbers>): Numbers => ({
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
	...details,
});
