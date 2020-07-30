const { scheduleJob } = require("node-schedule");

module.exports = async() => {
	winston.info("[Discord] Successfully connected to Discord.");
	await client.shard.broadcastEval(`this.done = true`);
	winston.info("[Ready] Done spawning all shards");
	let guildCount = (await client.shard.fetchClientValues("guilds.cache.size")).reduce((a, b) => a + b, 0);
	client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`>wizard | >help | [In ${guildCount} servers] \`, type: 2 } });`);

	let guild = client.guilds.cache.get(config.supportGuild);
	let bossRole = guild.roles.cache.get(config.bossRole);
	let managerRole = guild.roles.cache.get(config.managerRole);
	let supportRole = guild.roles.cache.get(config.supportRole);
	let donatorRole = guild.roles.cache.get(config.donatorRole);

	for (let i of bossRole.members.values()) {
		i.user.boss = true;
	}
	for (let i of managerRole.members.values()) {
		i.user.manager = true;
	}
	for (let i of supportRole.members.values()) {
		i.user.support = true;
	}
	for (let i of donatorRole.members.values()) {
		i.user.donator = true;
	}

	let blacklist = await r.table("Blacklist");

	for (let i of blacklist) {
		let obj = await client.users.fetch(i.id).catch(null);
		if (!obj) obj = client.guilds.cache.get(i.id);
		if (!obj) continue;
		obj.blacklisted = true;
	}
};
