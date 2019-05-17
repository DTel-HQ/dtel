const { MessageEmbed } = require("discord.js");

module.exports = async(msg, myNumber) => {
	// get account information / make account
	let account = await r.table("Accounts").get(msg.author.id);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
	}

	// make the embed
	let embed = new MessageEmbed()
		.setColor(0x3498DB)
		.setTitle("Number information")
		.setDescription(`Type the amount of months you want to renew your number.\nThe renewalrate is ¥${config.renewRate}/month`)
		.addField("Number", myNumber.id)
		.addField("Expiration date", myNumber.expiry)
		.addField("Your balance", `¥${account.balance}`)
		.addField("How to recharge", "http://discordtel.austinhuang.me/en/latest/Payment/");

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

	// new date and balance
	let newExpiry = new Date(myNumber.expiry);
	newExpiry.setMonth(newExpiry.getMonth() + parseInt(collected.first().content));
	let newBalance = account.balance - (config.renewRate * parseInt(collected.first().content));

	// update in db
	await r.table("Accounts").get(account.id).update({ balance: newBalance });
	await r.table("Numbers").get(myNumber.id).update({ expiry: newExpiry });

	embed = new MessageEmbed()
		.setColor(0xEEEEEE)
		.setAuthor(msg.author.tag)
		.setTitle("Your receipt")
		.setDescription(`The number has succesfully been renewed for ${collected.first().content} months.`)
		.addField("Number", myNumber.id)
		.addField("New expiration date", newExpiry)
		.addField("Your new balance", `¥${newBalance}`)
		.addField("How to recharge", "http://discordtel.austinhuang.me/en/latest/Payment/");
	msg.channel.send("", { embed: embed });
};
