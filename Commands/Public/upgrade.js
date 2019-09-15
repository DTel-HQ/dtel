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
	}

	// Send general embed based on variables
	let embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle(number ? "Upgrade your number" : "Upgrade")
		.addField("Your VIP Months", account.vip ? account.vip : "0", true);
	if (number) {
		embed.addField("VIP Number", vipNumber, true);
		if (vipNumber) {
			embed.setDescription(`Please view the [site](${config.paymentLink}) for a list of perks.`)
				.addField("VIP Expiry", `${vipExpiry.getDate()}-${vipExpiry.getMonth() + 1}-${vipExpiry.getFullYear()}`, true)
				.addField("VIP Options", "Dial `*411` and press (5) to access the VIP settings.\nNote: Only someone with the Manage Guild permission may change the VIP settings.");
		}
		if (account.vip) {
			embed.setDescription(`Enter the amounts of months to upgrade.\n\nPlease view the [site](${config.paymentLink}) for a list of perks.`)
				.setFooter("Press (0) to hangup. This call will automatically be hung up after 60 seconds of inactivity.");
		}
	}
	if (!vipNumber && !account.vip) {
		embed.addField("Upgrade?!", `\`>upgrade\` lets you use your VIP Months to upgrade a normal number to a VIP number.\nClick [here](${config.paymentLink}) for information on buying VIP Months.`)
			.addField("VIP Perks", `\
								**[• Disable number recognition](${config.paymentLink})**\
								\nYou can disable your number recognition. This will make your number and names hidden from the other side and the public logs in our [server](${config.guildInvite}).\
								\n\n**[• Custom name](${config.paymentLink})**\
								\nYou can set a custom name that will show up besides (or instead of) your number when calling.\
								\n\n**[• A VIP Emote](${config.paymentLink})**\
								\nYour messages will have the VIP emote: ${config.callPhones.vip}, instead of the default ${config.callPhones.default}.\
								\n\n**[• Change your number](${config.paymentLink})**\
								\nRequesting a number change (by dialing \`*611\`) won't remove all the messages, contacts, phonebook settings, vip settings, etc.`);
	}


	let omsg = await msg.channel.send({ embed: embed });

	if (!number || !account.vip) return;

	// Make collector
	await r.table("Busy").insert({ id: msg.author.id });
	let collected = (await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^\d*$/.test(m.content) && parseInt(m.content) <= account.vip,
		{ max: 1, time: 60000 }
	)).first();

	await r.table("Busy").get(msg.author.id).delete();
	collected.delete().catch(e => null);
	if (!collected || /^0$/.test(collected.content)) return omsg.delete();

	// remove VIP Months
	account.vip -= parseInt(collected.content);
	await r.table("Accounts").get(account.id).update({ vip: account.vip });

	// set new VIP- & normal expiry date
	let newDate = await new Date();
	if (vipNumber) vipExpiry.setMonth(vipExpiry.getMonth() + parseInt(collected.content));
	else vipExpiry = newDate.setMonth(newDate.getMonth() + parseInt(collected.content));
	if (new Date(number.expiry).getTime() < new Date(vipExpiry).getTime()) number.expiry = vipExpiry;
	await r.table("Numbers").get(number.id).update({ expiry: number.expiry, vip: { expiry: vipExpiry, hidden: number.vip ? number.vip.hidden : false, name: number.vip ? number.vip.name : false } });
	vipExpiry = new Date(vipExpiry);

	let channelEmbed = new MessageEmbed()
		.setColor(config.colors.success)
		.setAuthor(`${msg.author.tag} (${msg.author.id})`, msg.author.displayAvatarURL({ size: 2048, format: "png" }))
		.setTitle("Succesfully upgraded number")
		.setDescription(`This number is now a VIP number until: ${vipExpiry.getDate()}-${vipExpiry.getMonth() + 1}-${vipExpiry.getFullYear()}`)
		.setFooter(`By: ${msg.author.id}`);
	omsg.edit({ embed: channelEmbed }).catch(e => {
		omsg.delete().catch(_ => null);
		msg.channel.send({ embed: channelEmbed });
	});

	if (!msg.guild) return;
	let userEmbed = new MessageEmbed()
		.setColor(config.colors.receipt)
		.setTitle("Your receipt")
		.setDescription(`Months spent: ${collected.content}\nNumber: ${number.id}\nChannel: ${msg.channel} (${msg.channel.id})\nNew VIP expiry date: ${vipExpiry.getDate()}-${vipExpiry.getMonth() + 1}-${vipExpiry.getFullYear()}`);
	(await msg.author.createDM()).send({ embed: userEmbed }).catch(e => null);

	if (msg.guild.owner.user.id === msg.author.id) return;
	let ownerEmbed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle("Your number has been upgraded!")
		.setDescription(`Member ${msg.author} has upgraded a number in your server!`)
		.addField("Number", number.id, true)
		.addField("Channel", msg.channel)
		.addField("Months", collected.content, true)
		.addField("New expiry date", `${vipExpiry.getDate()}-${vipExpiry.getMonth() + 1}-${vipExpiry.getFullYear()}`, true);
	(await msg.guild.owner.user.createDM()).send({ embed: ownerEmbed });
};
