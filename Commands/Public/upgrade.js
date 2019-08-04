const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	// Get their details
	let number = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	let vipExpiry = number ? number.vip ? new Date(number.vip.expiry) : null : null;
	let vipNumber = vipExpiry ? vipExpiry.getTime() > Date.now() : false;

	let account = await r.table("Accounts").get(msg.author.id);
	if (!account) {
		account = { id: msg.author.id, balance: 0, daily: false };
		await r.table("Accounts").insert(account);
		await msg.reply(`You don't have an account created...Creating an account for you! Please also read for information on payment: <${config.paymentLink}>`);
	}

	// Send general embed based on variables
	let embed = new MessageEmbed()
		.setColor(0x3498DB)
		.setTitle(number ? "Upgrade your number" : "Upgrade")
		.addField("Your VIP Months", account.vip ? account.vip : "0", true);
	if (number) {
		embed.addField("VIP Number", vipNumber, true);
		if (vipNumber) embed.addField("VIP Expiry", `${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`, true);
		if (account.vip) embed.setFooter("Enter the amounts of months to upgrade or press (0) to hangup. This call will automatically be hung up after 2 minutes of inactivity.");
	}
	embed.addField(">upgrade?", `\`>upgrade\` lets you use your VIP Months to upgrade a normal number to a VIP number.\nClick [here](${config.paymentLink}) for information on buying VIP Months.`)
		.addField("VIP Perks", `\
• **Custom name**
You can set a custom name that will show up when you call people.
• **A VIP Emote**
When calling, the default phone icon (${config.callPhones.default}) will be replaced with: ${config.callPhones.vip}.
• **Disable number recognition**
You can set your number to be invisible to the people you call. The channel will then also be hidden to the public bot-logs in our [server](${config.guildInvite}).
• **Change your number**
Requesting a number change (by dialing \`*611\`) won't remove all the messages, contacts, phonebook settings, vip settings, etc.
• **Number expiry**
Extends the number's expiry date until the end of the VIP period.
		`)
		.addField("VIP Options", "Dial `*411` and pres (5) to access the VIP settings.\nNote: Only someone with the Manage Guild permission may change the VIP settings.");


	let omsg = await msg.channel.send({ embed: embed });

	if (!number || !account.vip) return;

	// Make collector
	Busy.create({ id: msg.author.id });
	let collected = (await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^\d*$/.test(m.content) && parseInt(m.content) <= account.vip,
		{ max: 1, time: 120000 }
	)).first();

	Busy.newGet(msg.author.id).delete();
	collected.delete().catch(e => null);
	if (!collected || /^0$/.test(collected.content)) return omsg.delete();

	// remove VIP Months
	account.vip -= parseInt(collected.content);
	await r.table("Accounts").get(account.id).update({ vip: account.vip });

	// set new VIP- & normal expiry date
	if (vipNumber) vipExpiry.setMonth(vipExpiry.getMonth() + parseInt(collected.content));
	else vipExpiry = (await new Date()).setMonth((await new Date()).getMonth() + parseInt(collected.content));
	if (new Date(number.expiry).getTime() < new Date(vipExpiry).getTime()) number.expiry = vipExpiry;
	await r.table("Numbers").get(number.id).update({ expiry: number.expiry, vip: { expiry: vipExpiry, hidden: number.vip ? number.vip.hidden : false, name: number.vip ? number.vip.name : false } });
	vipExpiry = new Date(vipExpiry);

	let channelEmbed = new MessageEmbed()
		.setColor(0xffbf00)
		.setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({ size: 2048, format: "png" }))
		.setTitle("Succesfully upgraded number")
		.setDescription(`This number is now a VIP number until: ${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`)
		.setFooter(`By: ${msg.author.id}`);
	omsg.edit({ embed: channelEmbed }).catch(e => {
		omsg.delete().catch(_ => null);
		msg.channel.send({ embed: channelEmbed });
	});

	if (!msg.guild) return;
	let userEmbed = new MessageEmbed()
		.setColor(0xEEEEEE)
		.setTitle("Your receipt")
		.setDescription(`Months spent: ${collected.content}\nNumber: ${number.id}\nChannel: ${msg.channel} (${msg.channel.id})\nNew VIP expiry date: ${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`);
	(await msg.author.createDM()).send({ embed: userEmbed }).catch(e => null);

	if (msg.guild.owner.user.id === msg.author.id) return;
	let ownerEmbed = new MessageEmbed()
		.setColor(0x3498DB)
		.setTitle("Your number has been upgraded!")
		.setDescription(`Member ${msg.author} has upgraded a number in your server!`)
		.addField("Number", number.id, true)
		.addField("Channel", msg.channel)
		.addField("Months", collected.content, true)
		.addField("New expiry date", `${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`, true);
	(await msg.guild.owner.user.createDM()).send({ embed: ownerEmbed });
};
