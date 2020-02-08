const { MessageEmbed } = require("discord.js");

module.exports = (client, msg, suffix, call) => {
	if (!call.pickedUp) return;

	const startDate = new Date(call.startedAt);
	const time = Date.now() - startDate.getTime();
	const messages = call.messages ? call.messages.length : 0;

	const embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle("Call status")
		.addField("Time elapsed", client.time(time), true)
		.addField("Message count", messages, true)
		.setFooter(call.id)
		.setTimestamp();
	msg.channel.send({ embed: embed });
};
