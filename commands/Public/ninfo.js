const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	let perms = await msg.author.getPerms();
	if (!perms.support) return;

	let id = suffix.split(" ")[0];
	if (!id) return msg.reply("**You forgot the number?!?! `>ninfo [number|channel]`**");

	let number = await r.table("Numbers").get(id);
	if (!number) number = (await r.table("Numbers").filter({ channel: id }))[0];
	if (!number) return msg.reply("Couldn't find that number.");

	let channel = await client.channels.resolve(number.channel);

	const embed = new MessageEmbed()
		.setColor(0x55AA66)
		.setTitle(`${number.id}`)
		.addField(
			"Channel",
			`Name: ${channel.guild ? channel.name : "dm channel"}\nID: \`${channel.id}\``,
			true
		)
		.addField(
			"Expiry",
			`${number.expiry}`,
			true
		);
	if (channel.guild) {
		embed.addField(
			"Guild",
			`Name: ${channel.guild.name}\nID: \`${channel.guild.id}\``,
			true
		);
	}
	return msg.channel.send(embed);
};
