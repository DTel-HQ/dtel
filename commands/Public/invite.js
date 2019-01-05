module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: 0x3498DB,
			fields: [
				{
					name: "Join our support server!",
					value: `${config.guildInvite}`,
				},
				{
					name: "Invite discordtel!",
					value: `All permissions are essential.\n${config.botInvite}`,
				},
			],
		},
	});
};
