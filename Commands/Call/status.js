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
	const seconds = Math.round(time);

	const messages = call.messages ? call.messages.length : 0;

	const statusEmbed = {
		color: config.colors.info,
		title: "Call status",
		fields: [
			{
				name: "Time elapsed",
				value: client.time(seconds, minutes, hours, days),
				inline: true,
			},
			{
				name: "Message count",
				value: messages,
				inline: true,
			},
		],
		timestamp: new Date(),
		footer: {
			text: call.id,
		},
	};
	msg.channel.send({ embed: statusEmbed });
};
