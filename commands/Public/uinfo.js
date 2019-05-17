const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (!(await msg.author.getPerms()).support) return;

	// Check if user exists
	let user;
	try {
		user = await client.users.fetch(suffix);
	} catch (err) {
		return msg.channel.send("How am I supposed to look up a wrong ID?!");
	}

	// Get all the needed information
	const dmChannel = await user.createDM();
	const dmNumber = (await r.table("Numbers").filter({ channel: dmChannel.id }))[0];
	const strikes = await r.table("Strikes").filter({ offender: user.id });
	const account = await r.table("Accounts").get(suffix).default(null);

	// Inform the CS
	const embed = new MessageEmbed()
		.setColor(3447003)
		.setAuthor(`${user.tag} (${user.id})`, user.displayAvatarURL())
		.addField("Blacklisted", await Blacklist.get(suffix) ? "True" : "False", true)
		.addField("DM number", `\`${dmNumber ? dmNumber.id : "None"}\``, true)
		.addField("Balance", `¥${account.balance}`, true)
		.addField(strikes.length ? `Strikes (${strikes.length})` : "Strikes", strikes.length ? (await strikes.map(s => s.reason)).join("\n") : "None")
		.setFooter("Use >permcheck to check their permission");

	msg.channel.send("", { embed: embed });
};
