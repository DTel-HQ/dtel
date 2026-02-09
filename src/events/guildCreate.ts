import { Guild } from "discord.js";
import DTelClient from "@src/internals/client";

export const guildCreateHandler = async(client: DTelClient, guild: Guild): Promise<void> => {
	await client.log(`📥 Joined guild \`${guild.name}\` (\`${guild.id}\`). Currently in \`${client.guilds.cache.size}\` servers on Shard ${process.env.SHARDS} and \`${await client.getGuildCount()}\` servers total.`);
};
