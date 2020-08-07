const { MessageEmbed } = require("discord.js");

const reaction = "💡"

module.exports = async(client, msg, suffix) => {
	// Check if user exists
	let user = msg.mentions.users.first() ? msg.mentions.users.first() : await client.users.fetch(suffix).catch(e => null);
	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid user", description: "How am I supposed to look up non existant user?!" } });
	if (user.bot && user.id != client.user.id) return msg.channel.send({ embed: { color: config.colors.error, title: "You silly", description: "That's a bot you're trying to look up." } });

	// Get all the needed information
	let dmChannel = await user.createDM().catch(e => null);
	let dmNumber;
	if (dmChannel) dmNumber = await r.table("Numbers").getAll(dmChannel.id, { index: "channel" }).nth(0).default(null);
	const strikes = await r.table("Strikes").getAll(user.id, { index: "offender" }).default([]);
	let account = await user.account();
	let blacklisted = await user.blacklisted;

	// Why not
	if (user.bot && user.id === client.user.id) dmNumber = { id: "Id10tsTryC@ll1ngTh!s" };

	// Inform the CS
	const embed_compact = new MessageEmbed()
		.setColor(config.colors.info)
		.setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL())
		.addField("Strikes", strikes.length)
		.addField("Blacklisted", blacklisted ? "True" : "False", true)
		.addField("Busy", user.busy ? "True" : "False", true)
		.addField("DM number", `\`${dmNumber ? dmNumber.id : "None"}\``, true)
		.addField("Balance", `${config.dtsEmoji}${client.format(account.balance)}`, true)
		.addField("VIP months", account.vip || "None", true)
		.setFooter("Use >permcheck to check their permission, >strikes for more information.");

	const embedmsg = await msg.channel.send({ embed: embed });
	await embedmsg.react(reaction);
	const collected = await embedmsg.awaitReactions((r, u) => u.id === msg.author.id && r.emoji.name === reaction, { time: 15000, max: 1 });
	if (!collected.first()) return;

	const embed_full = new MessageEmbed()
		.setColor(config.colors.info)
		.setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL());
	if (blacklisted) embed_full.addField("Blacklist reason", blacklisted.reason || "empty");
	if (strikes.length) embed_full.addField(strikes.length ? `Strikes (${strikes.length})` : "Strikes", strikes.length ? (await strikes.map(s => `Strike by ${s.creator} (${client.users.fetch(s.creator) ? client.users.cache.get(s.creator).tag : "-"})\n${s.reason}`)).join("\n") : "None")

	await embedmsg.edit({ embed: embed_full });
	await embedmsg.reactions.removeAll();
};
