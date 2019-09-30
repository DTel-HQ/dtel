const { MessageEmbed } = require("discord.js");
module.exports = async(client, msg, suffix) => {
	let call = await r.table("OldCalls").get(suffix);
	if (!call) call = await r.table("Calls").get(suffix);
	if (!call) return msg.channel.send({ embed: { color: config.colors.error, title: "No call", description: "Couldn't find a call with that ID..." } });

	let embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle("Call information")
		.setDescription(`Showing details for call: \`${call.id}\`\nUse \`>identify\` to identify people from the bot's messages.`)
		.addField("From", `**Number:** ${call.from.number}\n**Channel:** \`${call.from.channel}\`\n**Hidden:** ${call.from.hidden}\n**Custom name:** ${call.from.name}`, true)
		.addField("To", `**Number:** ${call.to.number}\n**Channel:** \`${call.to.channel}\`\n**Hidden:** ${call.to.hidden}\n**Custom name:** ${call.to.name}`, true)
		.addField("General", `**Picked up:** ${call.pickedUp ? call.pickedUpBy || "true" : "false"}\n**Hung up:** ${!call.hungupBy && !call.pickedUpBy ? "Unknown" : call.hungupBy || "no one"}\n**Random call:** ${!!call.rcall}\n**Transferred by:** ${call.transferredBy ? `\`${call.transferredBy}\`` : "no one"}`)
		.addField("Started at", call.startedAt);
	msg.channel.send({ embed: embed });
};
