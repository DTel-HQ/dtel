const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	// basic stats
	const guildCount = client.guilds.cache.size;
	const shardCount = client.shard.shardcount;

	const numbers = await r.table("Numbers");
	const numberCount = numbers.length;
	const yellowCount = (await r.table("Phonebook")).length;

	// more advanced
	let noNumber = 0;
	client.guilds.cache.forEach(async guild => {
		if (!(await numbers.filter(n => n.guild === guild.id)).length) noNumber++;
	});

	const expNumbers = (await r.table("Numbers").filter(r.row("expiry").lt(new Date()))).length;
	const d = new Date();
	d.setMonth(d.getMonth() - 1);
	const monthNumbers = (await numbers.filter(n => n.createdAt && new Date(n.createdAt) > new Date(d.getTime()))).length;

	const users = r.table("Users");
	const totalBalance = users.reduce((o, n) => o + n.balance, 0);

	const embed = new MessageEmbed
		.setTitle("DTel Statistics")
		.addAuthor(client.user.tag, client.user.avatarURL())
		.addField("Numbers", `Total: ${numberCount}\nYellowbook: ${yellowCount}\nExpired: ${expNumbers}\nMonthly new: ${monthNumbers}`)
		.addField("Guilds", `Total: ${guildCount}\nNo number: ${noNumber}`)
		.addField("Misc", `Shards: ${shardCount}\nEconomy: ${config.dtsEmoji}${totalBalance}`, true)
		.addTimestamp();


	return msg.channel.send(embed);
};
