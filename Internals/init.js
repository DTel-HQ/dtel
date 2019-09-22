module.exports = async() => {
	let blacklisted = await r.table("Blacklist");
	for (let blacklist of blacklisted) {
		let guild = await client.api.guilds(blacklist.id).get().catch(e => null);
		if (!guild) continue;
		client.shard.broadcastEval(`let guild = this.guilds.get("${guild.id}"); if (guild) guild.blacklisted = true;`);
	}
};
