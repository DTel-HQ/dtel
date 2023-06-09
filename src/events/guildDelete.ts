import { Guild } from "discord.js";
import DTelClient from "../internals/client";

export default async(client: DTelClient, guild: Guild): Promise<void> => {
	client.log(`📤 Left guild \`${guild.name}\` (\`${guild.id}\`). Currently in \`${client.guilds.cache.size}\` servers on Shard ${process.env.SHARDS} and \`${await client.getGuildCount()}\` servers total.`);
};
