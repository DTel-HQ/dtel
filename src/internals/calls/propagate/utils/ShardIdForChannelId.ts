import { client } from "@src/instances/client";
import { getShardCount } from "@src/internals/utils/GetShardCount";
import { ShardClientUtil, ChannelType } from "discord.js";
import type { APIGuildChannel, APITextBasedChannel, TextChannelType } from "discord.js";

export const shardIdForChannelId = async(id: string): Promise<number> => {
	const shardCount = getShardCount();
	if (shardCount === 1) return 0;
	const channelObject = await client.rest.get(`/channels/${id}`) as APITextBasedChannel<TextChannelType>;

	if (channelObject?.type === ChannelType.DM) {
		return 0;
	}

	const guildChannel = channelObject as APIGuildChannel<TextChannelType>;
	return ShardClientUtil.shardIdForGuildId(guildChannel.guild_id as string, shardCount);
};
