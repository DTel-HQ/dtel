const auth = require("../Configuration/auth.js");

module.exports = async guild => {
	let guildBlacklisted = await r.table("Blacklist").get(guild.id);
	let ownerBlacklisted = await r.table("Blacklist").get(guild.ownerID);
	if (guildBlacklisted || ownerBlacklisted) return guild.leave();
	let name = guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	client.log(`📥 Joined guild \`${guild.id}\`(${name}). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}`);
};
