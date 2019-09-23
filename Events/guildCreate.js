const { post } = require("snekfetch");
const auth = require("../Configuration/auth.js");

module.exports = async guild => {
	let name = guild.name.replace(/(\*|`|_|~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	client.log(`📥 Joined guild \`${guild.id}\`(${name}). Currently in ${client.guilds.size} servers on cluster ${client.shard.id}`);

	// let result = await post(`https://discordbots.org/api/bots/${client.user.id}/stats`)
	// 	.set("Authorization", auth.tokens.bots_org)
	// 	.set("Content-Type", "application/json")
	// 	.send({
	// 		shard_id: client.shard.id,
	// 		shard_count: client.shard.count,
	// 		server_count: client.guilds.size,
	// 	})
	// 	.catch(e => winston.error(`Couldn't post to DBots: ${e}`));
};
