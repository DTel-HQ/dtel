const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	// Check if user exists
	let user = msg.mentions.users.first() ? msg.mentions.users.first() : await client.users.fetch(suffix);
	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid user", description: "How am I supposed to look up non existant user?!" } });
	if (user.bot && user.id != client.user.id) return msg.channel.send({ embed: { color: config.colors.error, title: "You silly", description: "That's a bot you're trying to look up." } });

	// Get all the needed information
	let dmChannel = await user.createDM().catch(e => null);
	let dmNumber;
	if (dmChannel) dmNumber = await r.table("Numbers").getAll(dmChannel.id, { index: "channel" });
	const strikes = await r.table("Strikes").getAll(user.id, { index: "offender" }).default([]);
	let account = await user.account();
	let blacklisted = user.blacklisted;

	// Why not
	if (user.bot && user.id === client.user.id) dmNumber = { id: "Id10tsTryC@ll1ngTh!s" };

	// Inform the CS
	const embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL())
		.addField("Blacklisted", blacklisted ? "True" : "False", true)
		.addField("DM number", `\`${dmNumber ? dmNumber.id : "None"}\``, true)
		.addField("Prefix", `\`${account.prefix || ">"}\``, true)
		.addField("Balance", `¥${client.format(account.balance)}`, true)
		.addField("VIP months", account.vip || "None", true)
		.addBlankField(true)
		.addField(strikes.length ? `Strikes (${strikes.length})` : "Strikes", strikes.length ? (await strikes.map(s => `Strike by ${s.creator} (${client.users.fetch(s.creator) ? client.users.get(s.creator).tag : "-"})\n${s.reason}`)).join("\n") : "None")
		.setFooter("Use >permcheck to check their permission, >strikes for more information.");

	msg.channel.send({ embed: embed });
};
