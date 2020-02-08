const { MessageEmbed } = require("discord.js");

module.exports = (client, msg, suffix, call) => {
	if (!call.pickedUp) return;

	const startDate = new Date(call.startedAt);
	let time = (Date.now() - startDate.getTime()) / 1000;
	const days = Math.floor(time / (24 * 60 * 60));
	time -= days * (24 * 60 * 60);
	const hours = Math.floor(time / (60 * 60));
	time -= hours * (60 * 60);
	const minutes = Math.floor(time / 60);
	time -= minutes * 60;
	const seconds = time;

	const messages = call.messages ? call.messages.length : 0;

	const embed = new MessageEmbed()
		.setColor(config.colors.info)
		.setTitle("Call status")
		.addField("Time elapsed", client.time(seconds, minutes, hours, days), true)
		.addField("Message count", messages, true)
		.setFooter(call.id)
		.setTimestamp();
	msg.channel.send({ embed: embed });
};
