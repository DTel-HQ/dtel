module.exports = async() => {
	winston.info("[Discord] Successfully connected to Discord.");

	// Set initial playing status
	if (client.shard.ids[0] === client.shard.count - 1) {
		let guildCount = (await client.shard.fetchClientValues("guilds.size")).reduce((a, b) => a + b, 0);
		let shards = [];
		for (let i = 0; i < client.shard.count; i++) shards.push(i);
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: "${guildCount} servers", type: 0 } });`);
	}
};
