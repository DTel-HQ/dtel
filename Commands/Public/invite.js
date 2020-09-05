module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: config.colors.info,
			fields: [
				{
					name: "Join our support server!",
					value: `[Get the latest news, help with the bot and more!](${config.guildInvite})`,
				},
				{
					name: "Invite the bot!",
					value: `[Note: all permissions are essential.](${config.botInvite})`,
				},
			],
		},
	});
};
