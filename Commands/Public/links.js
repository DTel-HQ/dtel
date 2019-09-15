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
			title: "List of *all* the links",
			fields: [
				{
					name: "💻 Visit our website!",
					value: `[DiscordTel's website.](${config.siteLink})`,
					inline: true,
				},
				{
					name: "🌎 Join our support guild!",
					value: `[Join now](${config.guildInvite})`,
					inline: true,
				},
				{
					name: "📂 View our GitHub",
					value: `[We are open source!](${config.githubLink})`,
					inline: true,
				},
				{
					name: "💖 Support us!",
					value: `[How to donate?](${config.paymentLink})`,
					inline: true,
				},
				{
					name: "📋 Vote for us!",
					value: `[Get your free credits!](${config.voteLink})`,
					inline: true,
				},
				{
					name: "🔗 Invite the bot",
					value: `[Right here!](${config.botInvite})`,
					inline: true,
				},
				{
					name: `${config.callPhones.donator} VIP Numbers`,
					value: `[How they work](${config.vipLink})`,
					inline: true,
				},
				{
					name: "💡 Suggest a feature!",
					value: `[Suggestions page](${config.suggestLink})`,
					inline: true,
				},
				{
					name: "💪 Join our team!",
					value: `[Apply now!](${config.applyLink})`,
					inline: true,
				},
				{
					name: "\u200b",
					value: "\u200b",
					inline: true,
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
	await msg.channel.send(toSend);
};
