const { MessageEmbed } = require("discord.js");

module.exports = async(msg, myNumber) => {
	// get account information / make account
	let account = await r.table("Accounts").get(msg.author.id);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
	}

	// Get easy to format date
	const currExpiry = new Date(myNumber.expiry);

	// Get guild's strikes
	let strikes;
	if (msg.guild) strikes = await r.table("Strikes").get(msg.guild.id) || [];

	// make the embed
	let embed = new MessageEmbed()
		.setColor(0x3498DB)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle("Number information")
		.setDescription(`Type the amount of months you want to renew your number.\nThe renewalrate is ¥${config.renewRate}/month.\n[Click here](http://discordtel.austinhuang.me/en/latest/Payment/) for information on how to up your balance.`)
		.addField("Number", myNumber.id, true)
		.addField("Expiration date", `${currExpiry.getDate()}-${currExpiry.getMonth()}-${currExpiry.getFullYear()}`, true)
		.addField("Your balance", `¥${account.balance}`, true)
		.addField("Blocked numbers", myNumber.blocked ? myNumber.blocked.join(", ") : "None")
		.addField("Mentions", myNumber.mentions && myNumber.mentions.length ? myNumber.mentions.map(m => `${myNumber.mentions.indexOf(m) + 1}. ${m}`).join(" ") : "None");

	if (msg.guild) embed.addField("Guild strikes", strikes.length ? strikes.map(s => `-${s.reason}`).join("\n") : "None");

	// Determine maximum amount of months to renew
	let maxMonths = Math.floor(account.balance / config.renewRate);
	if (maxMonths) embed.setFooter("(0) to hangup. This call will automatically hang up after 60 seconds.");

	// send embed
	let omsg = await msg.channel.send("", { embed: embed });
	if (!maxMonths) return;

	// Message collector
	const collected = await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^\d+$/.test(m.content) && parseInt(m.content) < maxMonths,
		{ max: 1, time: 60000 }
	);

	omsg.delete();
	if (!collected.first() || collected.first().content === "0") return;
	if (collected.first().guild) collected.first().delete();

	// new date and balance
	let newExpiry = new Date(myNumber.expiry);
	newExpiry.setMonth(newExpiry.getMonth() + parseInt(collected.first().content));
	let newBalance = account.balance - (config.renewRate * parseInt(collected.first().content));

	// update in db
	await r.table("Accounts").get(account.id).update({ balance: newBalance });
	await r.table("Numbers").get(myNumber.id).update({ expiry: newExpiry });

	embed = new MessageEmbed()
		.setColor(0xEEEEEE)
		.setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL())
		.setTitle("Your receipt")
		.setDescription(`The number has succesfully been renewed by ${collected.first().content} months.`)
		.addField("Number", myNumber.id)
		.addField("New expiration date", `${newExpiry.getDate()}-${newExpiry.getMonth()}-${newExpiry.getFullYear()}`)
		.addField("Your new balance", `¥${newBalance}`)
		.addField("How to recharge", config.paymentLink);
	msg.channel.send("", { embed: embed });
};
