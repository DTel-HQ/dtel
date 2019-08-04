const { MessageEmbed } = require("discord.js");
module.exports = async(client, msg, suffix) => {
	let call = Calls.get(suffix);
	if (!call) call = await r.table("OldCalls").get(suffix);
	if (!call) return msg.channel.send({ embed: { color: 0x660000, title: "No call", description: "Couldn't find a call with that ID" } });

	let embed = new MessageEmbed()
		.setColor(0x3498DB)
		.setTitle("Call information")
		.setDescription(`Showing details for call: \`${call.id}\`\nUse \`>identify\` to identify people from the bot's messages.`)
		.addField("From", `**Number:** ${call.from.number}\n**Channel:** \`${call.from.channel}\`\n**Hidden:** ${call.from.hidden}\n**Custom name:** ${call.from.name}`, true)
		.addField("To", `**Number:** ${call.to.number}\n**Channel:** \`${call.to.channel}\`\n**Hidden:** ${call.to.hidden}\n**Custom name:** ${call.to.name}`, true)
		.addField("General", `**Picked up:**${!!call.pickedUp}\n**Random call:** ${!!call.rcall}`)
		.addField("Started at", call.startedAt);
	msg.channel.send({ embed: embed });
};
