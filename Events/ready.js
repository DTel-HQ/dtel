module.exports = async() => {
	winston.info("[Discord] Successfully connected to Discord.");

	// Set initial playing status
	// Last shard so every shard is ready to do eval
	if (client.shard.ids[0] === client.shard.count - 1) {
		let guildCount = (await client.shard.fetchClientValues("guilds.size")).reduce((a, b) => a + b, 0);
		let userCount = (await client.shard.broadcastEval("this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)")).reduce((prev, curr) => prev + curr, 0);
		let shards = [];
		for (let i = 0; i < client.shard.count; i++) shards.push(i);
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`${guildCount} servers with ${userCount} users. (shard \${this.shard.ids[0]})\`, type: 0 } });`);
	}
};
