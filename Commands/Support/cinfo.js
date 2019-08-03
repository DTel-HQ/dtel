const { MessageEmbed } = require("discord.js");
module.exports = async(client, msg, suffix) => {
	let call = Calls.get(suffix);
	if (!call) call = await r.table("Calls").get(suffix);
	if (!call) return msg.channel.send({ embed: { color: 0x660000, title: "No call", description: "Couldn't find a call with that ID" } });

	let embed = new MessageEmbed()
		.setColor(0x3498DB)
		.setTitle("Call information")
		.setDescription(`Showing details for call: \`${call.id}\`\nUse \`>identify\` to identify people from the bot's messages.`)
		.addField("Random call", call.rcall)
		.addField("From", `Number: ${call.from.number}\nChannel: \`${call.from.channel}\`\nHidden: ${call.from.hidden}\nCustom name: ${call.from.name}`)
		.addField("To", `Number: ${call.to.number}\nChannel: \`${call.to.channel}\`\nHidden: ${call.to.hidden}\nCustom name: ${call.to.name}`)
		.addField("Started at", call.startedAt);
};
