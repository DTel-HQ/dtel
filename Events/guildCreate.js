const auth = require("../Configuration/auth.js");

module.exports = async guild => {
	let guildBlacklisted = await guild.blacklisted;
	let ownerBlacklisted = await guild.owner.user.blacklisted;
	let name = guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	if (guildBlacklisted || ownerBlacklisted) {
		client.log(`📑 Left ${guild.id} as it or its owner is on the blacklist.`);
		return guild.leave();
	}
	client.log(`📥 Joined guild \`${guild.id}\` (\`${name.replace(/<@!?(\d){17,19}>/gm, "**Mention Censored**").replace(/@(everyone|here)/g, "@\u200b$1")}\`). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}.`);
};
