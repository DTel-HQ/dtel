const Discord = require("discord.js");

module.exports = async(client, msg, suffix) => {
	if (!msg.author.support || !suffix) {
		let userStrikes = await r.table("Strikes").getAll(msg.author.id, { index: "offender" }).default([]);
		let guildStrikes = msg.guild ? await r.table("Strikes").getAll(msg.guild.id, { index: "offender" }).default([]) : [];
		let embed = {
			color: config.colors.info,
			author: {
				name: msg.author.tag,
				icon_url: msg.author.displayAvatarURL(),
			},
			fields: [
				{ name: "User strikes", value: userStrikes.length ? userStrikes.map(s => `${userStrikes.indexOf(s) + 1}. ${s.id}: ${s.reason}`).join("\n") : "None" },
			],
			footer: {
				text: "For any questions/complaints about a strike; call *611.",
			},
		};
		if (msg.guild) embed.fields.push({ name: "This guild's strikes", value: guildStrikes.length ? guildStrikes.map(s => `${userStrikes.indexOf(s) + 1}. ${s.id}: ${s.reason}`).join("\n") : "None" });
		return msg.channel.send({ embed: embed });
	}

	let offenderID = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix.split(" ")[0];
	let strikes = await r.table("Strikes").getAll(offenderID, { index: "offender" }).default([]);

	if (!strikes) return msg.channel.send({ embed: { color: config.colors.info, title: "Completely clean!", description: "This ID does not have any strikes." } });

	let embed = new Discord.MessageEmbed()
		.setTitle(`This ${strikes[0] ? strikes[0].user ? "user " : "guild " : "ID"} has ${strikes.length} strikes.`)
		.setColor(config.colors.info)
		.setFooter(`Use \`>rmstrike [ID]\` to remove a strike.`);

	for (let strike of strikes) {
		let creator = (await client.users.fetch(strike.creator)).tag;
		embed.addField(
			`Strike \`${strike.id}\` by ${strike.creator}`,
			`• Reason: ${strike.reason}\n• Time: ${strike.date || "null"}`
		);
	}

	msg.channel.send({ embed: embed });
};
