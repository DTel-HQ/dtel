module.exports = async guild => {
	let guildBlacklisted = await guild.blacklisted;
	let ownerBlacklisted = await guild.owner.user.blacklisted;
	let name =	guild.name.replace("`", "");

	if (guildBlacklisted || ownerBlacklisted) {
		client.log(`📑 Left ${guild.id} as it or its owner is on the blacklist.`);
		return guild.leave();
	}
	client.log(`📥 Joined guild \`${guild.id}\` (\`${name}\`). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}.`);
};
