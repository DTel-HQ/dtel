module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: config.colors.info,
			fields: [
				{
					name: "Join our support server!",
					value: `${config.guildInvite}`,
				},
				{
					name: "Invite the bot!",
					value: `[All permissions are essential](${config.botInvite})`,
				},
			],
		},
	});
};
