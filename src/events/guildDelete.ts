import { Guild } from "discord.js";
import DTelClient from "../internals/client";
import { winston } from "../dtel";

export default async(client: DTelClient, guild: Guild): Promise<void> => {
	if (!guild.available) {
		winston.error(`Guild ${guild.name} (${guild.id}) is unavailable. Ignoring Guild Delete event.`);
	}
	client.log(`📤 Left guild \`${guild.name}\` (\`${guild.id}\`). Currently in \`${client.guilds.cache.size}\` servers on Shard ${process.env.SHARDS} and \`${await client.getGuildCount()}\` servers total.`);
};
