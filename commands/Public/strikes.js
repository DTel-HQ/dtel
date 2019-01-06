const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (!(await msg.author.getPerms()).support) return;
	if (!suffix) return msg.reply("Where is the ID?!?!");

	let offenderID = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix.split(" ")[0];
	let strikes = await r.table("Strikes").filter({ offender: offenderID });

	if (!strikes) return msg.reply("This ID doesn't have any strikes");

	let embed = new Discord.MessageEmbed()
		.setTitle(`This ${strikes[0] ? strikes[0].user ? "user " : "guild " : "ID"} has ${strikes.length} strikes.`)
		.setColor(0x990000)
		.setFooter(`Use \`>rmstrike [ID]\` to remove a strike.`);

	for (let i in strikes) {
		let strike = strikes[i];
		let creator = (await client.users.fetch(strike.creator)).tag;
		embed.addField(
			`Strike \`${strike.id}\` by ${creator}`,
			`Reason: ${strike.reason}`
		);
	}

	msg.channel.send(embed);
};
