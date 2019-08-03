const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	// Get their details
	let number = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	let vipExpiry = number.vip ? number.vip.expiry ? new Date(number.vip.expiry) : null : null;
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
		.setDescription(`Upgrade let's you upgrade your number to a VIP number. VIP numbers get the following perks:
		 	• The ability to add a custom name to your number.
			• The ability to remove number recognition.
			• A special VIP emote in calls: :insertSpecialEmote:

			To access special features: dial \`*411\`
			Please note: only someone with manage_server can change the VIP settings`);
	if (number) {
		embed.addField("VIP Number", vipNumber, true);
		if (vipNumber) embed.addField("VIP Expiry", `${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`, true);
		if (account.vip) embed.addFooter("Enter the amounts of months to upgrade or press (0) to hangup. This call will automatically be hung up after 2 minutes of inactivity.");
	}

	let omsg = await msg.channel.send({ embed: embed });

	if (!number || !account.vip) return;

	// Make collector
	let collected = (await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^d+$/.test(m.content) && parseInt(m.content < account.vip),
		{ max: 1, time: 120000 }
	)).first();

	if (!collected || /^0$/.test(collected.content)) return;

	// remove VIP Months
	account.vip -= parseInt(collected.content);
	await r.table("Accounts").get(account.id).update({ vip: account.vip });

	// set new VIP expiry date
	if (vipNumber) vipExpiry.setMonth(vipExpiry.getMonth() + parseInt(collected.content));
	else vipExpiry = new Date().setMonth(new Date().getMonth() + parseInt(collected.content));
	await r.table("Numbers").get(number.id).update({ vip: { expiry: vipExpiry, hidden: number.vip.hidden || false, name: number.vip.name || false } });

	let channelEmbed = new MessageEmbed()
		.setColor(0xffbf00)
		.setAuthor(msg.author.tag, msg.author.displayAvatarURL({ size: 2048, format: "png" }))
		.setTitle("Succesfully upgraded number")
		.setDescription(`This number is now a VIP number until: ${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`)
		.setFooter(`By: ${msg.author.id}`);
	msg.channel.send({ embed: embed });

	if (!msg.guild) return;
	let userEmbed = new MessageEmbed()
		.setColor(0xEEEEEE)
		.setTitle("Your receipt")
		.setDescription(`You have spent ${collected.content} VIP Months to upgrade ${number.id} in ${msg.channel}(${msg.channel.id})\nThe new VIP expiry date is: ${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`);
	(await msg.author.createDM()).send({ embed: userEmbed }).catch(e => null);

	if (msg.guild.owner.user.id === msg.author.id) return;
	let ownerEmbed = new MessageEmbed()
		.setColor(0x3498DB)
		.setTitle("Your number has been upgraded!")
		.setDescription(`Member ${msg.author.tag}(${msg.author.id}) has upgraded number ${number.id} in ${msg.channel}(${msg.channel.id}) for ${collected.content} Months!\nThe new VIP expiry date is: ${vipExpiry.getDate()}-${vipExpiry.getMonth()}-${vipExpiry.getFullYear()}`);
	(await msg.guild.owner.user.createDM()).send({ embed: ownerEmbed });
};
