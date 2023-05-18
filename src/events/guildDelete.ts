import { Guild } from "discord.js";
import DTelClient from "../internals/client";

export default async(client: DTelClient, guild: Guild): Promise<void> => {
	client.log(`📤 Left guild \`${guild.name}\` (\`${guild.id}\`). Currently in \`${client.guilds.cache.size}\` servers on Shard ${client.shard!.count} and \`${client.getGuildCount()}\` servers total.`);
};
