import { CallParticipant } from "@src/internals/calls/utils/get-participants-from-numbers/GetParticipantsFromNumbers";
import * as target from "./BuildTestParticipant";

it("should return a test participant", () => {
	const result = target.buildTestParticipant();

	expect(result).toStrictEqual(<CallParticipant>{
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
		incomingCalls: [],
		outgoingCalls: [],
		guild: null,
	});
});

it("should respect provided properties", () => {
	const result = target.buildTestParticipant({
		guild: {
			id: "test",
			locale: "en",
			whitelisted: false,
		},
	});

	expect(result).toStrictEqual(<CallParticipant>{
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
		incomingCalls: [],
		outgoingCalls: [],
		guild: {
			id: "test",
			locale: "en",
			whitelisted: false,
		},
	});
});
