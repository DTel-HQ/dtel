module.exports = async(client, msg, suffix) => {
	let avatarURL = await client.user.displayAvatarURL();
	let toSend = {
		embed: {
			color: config.colors.info,
			author: {
				name: client.user.username,
				icon_url: avatarURL,
				url: "https://discordtel.austinhuang.me",
			},
			title: "List of Customer Support Commands",
			description: `For more information... actually read the [CS Documentation](${config.guidelink}) you dumbo.`,
			fields: [
				{
					name: "💻 Visit our website!",
					value: `[DiscordTel's website](${config.siteLink})`,
				},
				{
					name: "🌎 Join our support guild!",
					value: `[Support guild](${config.guildLink})`,
				},
				{
					name: "💲 Support us by donating!",
					value: `[Information](${config.paymentLink}) on purchasing credits or VIP months.`,
				},
				{
					name: "📋 Support us by voting!",
					value: `You can find information about voting [here](${config.voteLink}) and receive more credits!`,
				},
				{
					name: "💡 Suggest a feature!",
					value: `Go [here](${config.suggestLink}) and help us improve the bot with your suggestion(s)!`,
				},
				{
					name: "💪 Join our team!",
					value: `[Fill in](${config.applyLink}) an application and come strengthen our team. (applications are only looked at when we're searching)`,
				},
			],
			timestamp: new Date(),
			footer: {
				icon_url: "https://avatars1.githubusercontent.com/u/16656689",
				text: "DiscordTel V3 - made with <3 by Austin Huang and his team",
			},
		},
	};

	let dmChannel = await msg.author.createDM();
	try {
		await msg.author.send(toSend);
	} catch (_) {
		await msg.channel.send(toSend);
	}
};
