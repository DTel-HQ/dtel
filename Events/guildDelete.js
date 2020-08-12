const auth = require("../Configuration/auth.js");
const urlRegex = require("url-regex")({ strict: true });
module.exports = async guild => {
	let name = guild.name
		.replace(/`/gm, "'")
		.replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**")
		.replace(/@(everyone|here)/g, "@\u200b$1").replace(/<@!?(\d){17,19}>/gm, "**Mention Censored**")
		.replace(urlRegex, "**URL Blocked**");
	client.log(`:outbox_tray: Left guild \`${guild.id}\` (\`${name}\`). Currently in ${client.guilds.cache.size} servers on cluster ${client.shard.id}.`);
};
