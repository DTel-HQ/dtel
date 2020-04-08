const auth = require("../Configuration/auth.js");

module.exports = async guild => {
	let name = 	guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	client.log(`:outbox_tray: Left guild \`${guild.id}\`(${name}). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}`);
};
