module.exports = async(bot, message, args) => {
	message.channel.send({
		embed: {
			title: "DiscordTel",
			description: "Pong! :ping_pong:",
			footer: {
				text: `Took ${Math.floor(bot.ping)}ms`,
			},
		},
	});
};
