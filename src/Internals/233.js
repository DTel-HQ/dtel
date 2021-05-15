import { MessageEmbed } from "discord.js";

module.exports = async(msg, myNumber) => {
	// get account information / make account
	let account = await msg.author.account();

	// Get easy to format date
	const currExpiry = new Date(myNumber.expiry);
	const vipExpiry = myNumber.vip ? new Date(myNumber.vip.expiry) : null;
	const vipNumber = vipExpiry ? new Date(myNumber.vip.expiry).getTime() > Date.now() : false;

	// Get guild's strikes
	let strikes;
	if (msg.guild) strikes = await r.table("Strikes").get(msg.guild.id) || [];

	// Determine maximum amount of months to renew
	let maxMonths = Math.floor(account.balance / config.renewalRate);

	// make the embed
	let embed = new MessageEmbed()
		.setColor(vipNumber ? config.colors.vip : config.colors.info)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
		.setTitle("Number information")
		.setDescription(`${maxMonths ? "Respond with the amount of months you want to renew your number for." : "Your balance is too low."}\nThe renewal rate is <:DTS:668551813317787659>${config.renewalRate}/month.\n[Click here](http://discordtel.austinhuang.me/en/latest/Payment/) for information on how to up your balance.`)
		.addField("Number", myNumber.id, true)
		.addField("Expiration date", `${currExpiry.getDate()}-${currExpiry.getMonth() + 1}-${currExpiry.getFullYear()}`, true)
		.addField("Your credits", `${config.dtsEmoji}${client.format(account.balance)}`, true)
		.addField("VIP Number", vipNumber ? vipNumber : `False [what's this?](${config.vipLink})`, true)
		.addField("VIP expiration date", vipNumber ? `${vipExpiry.getDate()}-${vipExpiry.getMonth() + 1}-${vipExpiry.getFullYear()}` : "N/A", true)
		.addField("Your VIP months", account.vip ? account.vip : "0", true)
		.addField("Blocked numbers", myNumber.blocked && myNumber.blocked.length > 0 ? myNumber.blocked.join("\n") : "None", true)
		.addField("Mentions", myNumber.mentions && myNumber.mentions.length ? myNumber.mentions.map(m => `${myNumber.mentions.indexOf(m) + 1}. ${m}`).join("\n") : "None", true);

	if (msg.guild) embed.addField("Guild strikes", strikes.length ? strikes.map(s => `-${s.reason}`).join("\n") : "None", true);
	if (maxMonths) embed.setFooter("Respond with `0` to hangup. This call will automatically hang up after 3 minutes.");

	// send embed
	let omsg = await msg.channel.send("", { embed: embed });
	if (!maxMonths) return;

	// Message collector
	msg.author.busy = true;
	const collected = await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^\d+$/.test(m.content) && parseInt(m.content) <= maxMonths,
		{ max: 1, time: 180000 },
	);

	// On collection
	msg.author.busy = false;
	omsg.delete().catch(e => null);
	if (!collected.first()) return;
	if (msg.channel.type === "text" && msg.guild.me.hasPermission("MANAGE_MESSAGES")) collected.first().delete().catch(e => null);
	if (/^0*$/.test(collected.first().content)) return msg.channel.send({ embed: { color: config.colors.receipt, title: "Process terminated", description: "Your account has not been charged." } });

	// check for same balance
	let currAccount = await msg.author.account();
	if (account.balance != currAccount.balance) return msg.channel.send({ embed: { color: config.colors.error, title: "Account changed", description: "Your balance has changed, please try again." } });

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
		.setDescription(`Your number has succesfully been renewed for ${collected.first().content} months!`)
		.addField("Number", myNumber.id, true)
		.addField("New expiration date", `${newExpiry.getDate()}-${newExpiry.getMonth() + 1}-${newExpiry.getFullYear()}`, true)
		.addField("Your new balance", `${config.dtsEmoji}${client.format(newBalance)}`, true)
		.addField("Need to recharge?", config.paymentLink);
	msg.channel.send("", { embed: embed });

	// log it
	client.log(`:arrows_counterclockwise: User ${msg.author.username} (${msg.author.id}) renewed ${myNumber.id} for ${collected.first().content} months.`);
};
