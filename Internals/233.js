const { MessageEmbed } = require("discord.js");

module.exports = async(msg, myNumber) => {
	// get account information / make account
	let account = await msg.author.account;

	// Get easy to format date
	const currExpiry = new Date(myNumber.expiry);
	const vipExpiry = myNumber.vip ? new Date(myNumber.vip.expiry) : null;
	const vipNumber = vipExpiry ? new Date(myNumber.vip.expiry).getTime() > Date.now() : false;

	// Get guild's strikes
	let strikes;
	if (msg.guild) strikes = await r.table("Strikes").get(msg.guild.id) || [];

	// make the embed
	let embed = new MessageEmbed()
		.setColor(vipNumber ? config.colors.vip : config.colors.info)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle("Number information")
		.setDescription(`Type the amount of months you want to renew your number.\nThe renewalrate is ¥${config.renewalRate}/month.\n[Click here](http://discordtel.austinhuang.me/en/latest/Payment/) for information on how to up your balance.`)
		.addField("Number", myNumber.id, true)
		.addField("Expiration date", `${currExpiry.getDate()}-${currExpiry.getMonth() + 1}-${currExpiry.getFullYear()}`, true)
		.addField("Your balance", `¥${account.balance}`, true)
		.addField("VIP Number", vipNumber, true)
		.addField("VIP expiration date", vipNumber ? `${vipExpiry.getDate()}-${vipExpiry.getMonth() + 1}-${vipExpiry.getFullYear()}` : "N/A", true)
		.addField("Your VIP months", account.vip ? account.vip : "0", true)
		.addField("Blocked numbers", myNumber.blocked ? myNumber.blocked.join("\n") : "None", true)
		.addField("Mentions", myNumber.mentions && myNumber.mentions.length ? myNumber.mentions.map(m => `${myNumber.mentions.indexOf(m) + 1}. ${m}`).join("\n") : "None", true);

	if (msg.guild) embed.addField("Guild strikes", strikes.length ? strikes.map(s => `-${s.reason}`).join("\n") : "None", true);

	// Determine maximum amount of months to renew
	let maxMonths = Math.floor(account.balance / config.renewalRate);
	if (maxMonths) embed.setFooter("(0) to hangup. This call will automatically hung up after 3 minutes.");

	// send embed
	let omsg = await msg.channel.send("", { embed: embed });
	if (!maxMonths) return;

	// Message collector
	await r.table("Busy").insert({ id: msg.author.id });
	const collected = await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^\d+$/.test(m.content) && parseInt(m.content) < maxMonths,
		{ max: 1, time: 180000 }
	);

	// On collection
	await r.table("Busy").get(msg.author.id).delete();
	omsg.delete().catch(e => null);
	if (!collected.first()) return;
	collected.first().delete().catch(e => null);
	if (/^0$/.test(collected.first().content)) return;

	// new date and balance
	let newExpiry = myNumber.expiry < Date.now() ? new Date() : new Date(myNumber.expiry);
	newExpiry.setMonth(newExpiry.getMonth() + parseInt(collected.first().content));
	let newBalance = account.balance - (config.renewalRate * parseInt(collected.first().content));

	// update in db
	await r.table("Accounts").get(account.id).update({ balance: newBalance });
	await r.table("Numbers").get(myNumber.id).update({ expiry: newExpiry });

	embed = new MessageEmbed()
		.setColor(config.colors.receipt)
		.setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL())
		.setTitle("Your receipt")
		.setDescription(`The number has succesfully been renewed by ${collected.first().content} months.`)
		.addField("Number", myNumber.id, true)
		.addField("New expiration date", `${newExpiry.getDate()}-${newExpiry.getMonth() + 1}-${newExpiry.getFullYear()}`, true)
		.addField("Your new balance", `¥${newBalance}`, true)
		.addField("Need to recharge?", config.paymentLink);
	msg.channel.send("", { embed: embed });
};
