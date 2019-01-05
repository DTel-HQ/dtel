module.exports = async(client, msg, suffix) => {
	msg.channel.send({
		embed: {
			color: 0x808080,
			fields: [
				{
					name: `[Server invite](${config.guildInvite})`,
					value: "This is our Support Server.",
				},
				{
					name: `[Bot invite](${config.guildInvite})`,
					value: "All permissions are essential",
				},
			],
		},
	});
};
