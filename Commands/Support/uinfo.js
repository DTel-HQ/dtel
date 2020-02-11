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
		.addField("Busy", user.busy, true)
		.addField("DM number", `\`${dmNumber ? dmNumber.id : "None"}\``, true)
		.addField("Prefix", `\`${account.prefix || ">"}\``, true)
		.addField("Balance", `<:DTS:668551813317787659>${client.format(account.balance)}`, true)
		.addField("VIP months", account.vip || "None", true)
		.setFooter("Use >permcheck to check their permission, >strikes for more information.");

	if (strikes.length) {
		for (let i = 0; i < strikes.length; i++) {
			let strike = strikes[0];
			let striker = client.users.fetch(strike.creator).catch(e => null);
			embed.addField(`Strike by ${strike.creator}${striker ? ` (${striker.tag})` : ""}`, strike.reason);
		}
	}

	msg.channel.send({ embed: embed });
};
