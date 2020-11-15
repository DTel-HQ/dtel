const { updatePerms } = require("../Internals/modules");

module.exports = async() => {
	await client.shard.broadcastEval(`this.done = true`);

	const supportGuild = client.guilds.cache.get(config.supportGuild) || await client.guilds.fetch(config.supportGuild);
	const accounts = await r.table("Accounts");
	const filteredAccounts = accounts.filter(acc => acc.boss || acc.manager || acc.support || acc.contributor || acc.donator || false);
	for (let account of filteredAccounts) updatePerms(await supportGuild.members.fetch(account.id));

	let blacklist = await r.table("Blacklist");

	for (let i of blacklist) {
		let obj;
		try {
			obj = await client.users.fetch(i.id).catch(null);
		} catch (e) {
			obj = client.guilds.cache.get(i.id);
		}
		if (!obj) continue;
		obj.blacklisted = true;
	}

	try {
		winston.info("[Discord] Successfully connected to Discord.");
		winston.info("[Ready] Done spawning all shards");
		let guildCount = (await client.shard.fetchClientValues("guilds.cache.size")).reduce((a, b) => a + b, 0);
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`>wizard | >help | [In ${guildCount} servers] \`, type: 2 } });`);
	} catch (e) {
		// ignore
	}
};
