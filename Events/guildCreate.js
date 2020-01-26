const auth = require("../Configuration/auth.js");

module.exports = async guild => {
	let blacklisted = r.table("Blacklist").get(guild.id);
	if (blacklisted) return guild.leave();
	let name = guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	client.log(`📥 Joined guild \`${guild.id}\`(${name}). Currently in ${client.guilds.size} servers on cluster ${client.shard.id}`);
};
