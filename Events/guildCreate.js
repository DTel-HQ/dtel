const auth = require("../Configuration/auth.js");

module.exports = async guild => {
	let guildBlacklisted = await r.table("Blacklist").get(guild.id);
	let ownerBlacklisted = await r.table("Blacklist").get(guild.ownerID);
	let name = guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	if (guildBlacklisted || ownerBlacklisted) {
		client.log(`📑 Left ${guild.id} for being on the blacklist.`);
		return guild.leave();
	}
	client.log(`📥 Joined guild \`${guild.id}\`(${name}). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}`);
};
