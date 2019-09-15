const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (!(await msg.author.getPerms()).support || !suffix) {
		let userStrikes = await r.table("Strikes").filter({ offender: msg.author.id });
		let guildStrikes = msg.guild ? await r.table("Strikes").filter({ offender: msg.guild.id }) : [];
		let embed = {
			color: config.colors.info,
			title: `Strikes for ${msg.author.tag} (${msg.author.id})`,
			fields: [
				{ name: "User strikes", value: userStrikes.length ? userStrikes.map(s => `-${s.reason}`).join("\n") : "None" },
			],
			footer: {
				text: "For any questions/complaints about a strike; call *611.",
			},
		};
		if (msg.guild) embed.fields.push({ name: "This guild's strikes", value: guildStrikes.length ? guildStrikes.map(s => `-${s.reason}`).join("\n") : "None" });
		return msg.channel.send({ embed: embed });
	}

	let offenderID = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix.split(" ")[0];
	let strikes = await r.table("Strikes").filter({ offender: offenderID });

	if (!strikes) return msg.channel.send({ embed: { color: config.colors.info, title: "Completely clean!", description: "This ID does not have any strikes." } });

	let embed = new Discord.MessageEmbed()
		.setTitle(`This ${strikes[0] ? strikes[0].user ? "user " : "guild " : "ID"} has ${strikes.length} strikes.`)
		.setColor(config.colors.info)
		.setFooter(`Use \`>rmstrike [ID]\` to remove a strike.`);

	for (let strike of strikes) {
		let creator = (await client.users.fetch(strike.creator)).tag;
		embed.addField(
			`Strike \`${strike.id}\` by ${strike.creator}`,
			`Reason: ${strike.reason}`
		);
	}

	msg.channel.send({ embed: embed });
};
