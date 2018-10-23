module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: 0x808080,
			title: "Pong!",
			description: `Took ${client.ping}ms :ping_pong:`,
		},
	});
};
