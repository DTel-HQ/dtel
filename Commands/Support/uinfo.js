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
		.addField("Blacklisted", blacklisted ? "True" : "False", true)
		.addField("Strikes", strikes.length, true)
		.addField("Busy", user.busy ? "True" : "False", true)
		.addField("DM number", `\`${dmNumber ? dmNumber.id : "None"}\``, true)
		.addField("Balance", `${config.dtsEmoji}${client.format(account.balance)}`, true)
		.addField("VIP months", account.vip || "None", true)
		.setFooter("Use >permcheck to check their permission, >strikes for more information.");
	if (blacklisted || strikes.length) embed_compact.setDescription("Hit the lightbulb for more information on strikes/blacklist.");

	const embedmsg = await msg.channel.send({ embed: embed_compact });
	if (!blacklisted && !strikes.length) return;

	await embedmsg.react(reaction);
	const collected = await embedmsg.awaitReactions((r, u) => u.id === msg.author.id && r.emoji.name === reaction, { time: 45000, max: 1 });
	if (!collected.first()) return;

	const embed_details = new MessageEmbed()
		.setColor(config.colors.info)
		.setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL());
	if (blacklisted) embed_details.addField("Blacklist reason", blacklisted.reason || "empty");
	if (strikes.length) {
		for (let strike of strikes) {
			let creator = await client.users.fetch(strike.creator);
			if (creator) creator = creator.tag;
			embed_details.addField(
				`Strike \`${strike.id}\` by ${creator || strike.creator}`,
				`• Reason: ${strike.reason}\n• Time: ${strike.date || "unknown"}`,
			);
		}
	}

	await embedmsg.edit({ embed: embed_details });
	await embedmsg.reactions.removeAll();
};
