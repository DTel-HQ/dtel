module.exports = async(client, message, args) => {
	message.channel.send({
		embed: {
			title: "Pong! :ping_pong:",
			description: `Took \`${Math.floor(client.ping)}\`ms to ping Discord!`,
		},
	});
};
