const { MessageEmbed } = require("discord.js");
const os = require("os");

module.exports = async(client, msg, suffix) => {
	const DTS = config.dtsEmoji;

	// basic stats
	const guildCount = client.guilds.cache.size;
	const shardCount = client.shard.shardCount;

	const numbers = await r.table("Numbers");
	const numberCount = numbers.length;
	const yellowCount = (await r.table("Phonebook")).length;

	const blacklisted = (await r.table("Blacklist")).length;
	const whitelisted = (await r.table("Whitelist")).length;

	// more advanced
	let noNumber = 0;
	client.guilds.cache.forEach(async guild => {
		if (!(await numbers.filter(n => n.guild === guild.id)).length) noNumber++;
	});

	const expNumbers = (await r.table("Numbers").filter(r.row("expiry").lt(new Date()))).length;
	const d = new Date();
	d.setMonth(d.getMonth() - 1);
	const monthNumbers = (await numbers.filter(n => n.createdAt && new Date(n.createdAt) > new Date(d.getTime()))).length;

	const users = await r.table("Accounts");
	const usersSortedByBalance = users.sort((a, b) => b.balance - a.balance);
	const USBBFiltered = usersSortedByBalance.filter(u => u.balance != 0);
	const totalBalance = client.format(users.reduce((o, n) => o + n.balance, 0));

	const embed = new MessageEmbed()
		.setTitle("DTel Statistics")
		.setColor(config.colors.info)
		.setAuthor(client.user.tag, client.user.avatarURL())
		.addField("Server", `Shards: ${shardCount}\nRAM usage: ${client.format(process.memoryUsage().heapUsed / 1024 / 1024)}MB\nLoad avgs: ${os.loadavg().map(avg => client.format(avg * 100)).join(" | ")}`, true)
		.addField("Numbers", `Total: ${client.format(numberCount)}\nYellowbook: ${yellowCount}\nExpired: ${expNumbers}\nMonthly new: ${monthNumbers}`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Guilds", `Total: ${client.format(guildCount)}\nNo number: ${noNumber}`, true)
		.addField("Lists", `Blacklisted: ${blacklisted}\nWhitelisted; ${whitelisted}`, true)
		.addField("\u200b", "\u200b", true)
		.addField("Economy", `Total: ${DTS}${totalBalance}\nMedian: ${DTS}${client.format(usersSortedByBalance[parseInt(usersSortedByBalance.length / 2)].balance)}\nFiltered median: ${DTS}${client.format(USBBFiltered[parseInt(USBBFiltered.length / 2)].balance)}`, true)
		.addField("Top balances", usersSortedByBalance.slice(0, 5).map(acc => `${DTS}${client.format(acc.balance)} (${acc.id})`), true)
		.setTimestamp();


	return msg.channel.send("", { embed: embed });
};
