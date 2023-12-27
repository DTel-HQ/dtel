import { ChannelType, ShardClientUtil } from "discord.js";
import * as target from "./ShardIdForChannelId";
import { discordClientMock } from "@src/mocks/DiscordClient.test";
import { getShardCount } from "@src/internals/utils/GetShardCount";

// jest.mock("@src/instances/client");

jest.mock("discord.js", () => ({
	...jest.requireActual("discord.js"),
	ShardClientUtil: {
		shardIdForGuildId: jest.fn(),
	},
}));
jest.mock("@src/internals/utils/GetShardCount");

const shardIdForGuildIdMock = jest.mocked(ShardClientUtil.shardIdForGuildId);
const getShardCountMock = jest.mocked(getShardCount);

beforeEach(() => {
	shardIdForGuildIdMock.mockReturnValue(4);
	getShardCountMock.mockReturnValue(5);
});

it("should return 0 for a DM channel", () => {
	discordClientMock.rest.get.mockResolvedValue({
		type: ChannelType.DM,
	});

	const result = target.shardIdForChannelId("channelID");

	expect(discordClientMock.rest.get).toHaveBeenCalled();
	expect(result).resolves.toStrictEqual(0);
});

it("should return a shard ID", () => {
	discordClientMock.rest.get.mockResolvedValue({
		type: ChannelType.GuildText,
		guild_id: "guildID",
	});

	const result = target.shardIdForChannelId("channelID");

	expect(discordClientMock.rest.get).toHaveBeenCalled();
	expect(result).resolves.toStrictEqual(4);
});
