module.exports = async(bot, message, args) => {
	message.channel.send({
		embed: {
			title: "Pong! :ping_pong:",
			description: `Took \`${Math.floor(bot.ping)}\`ms to ping DiscordTel!`
		}
	});
};
