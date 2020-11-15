module.exports = async(client, msg, suffix) => {
	let avatarURL = await client.user.displayAvatarURL();
	let toSend = {
		embed: {
			color: config.colors.info,
			author: {
				name: client.user.username,
				icon_url: avatarURL,
				url: "https://dtel.austinhuang.me",
			},
			title: "List of *all* the links",
			fields: [
				{
					name: "🔗 Invite the bot",
					value: `[Right here!](${config.botInvite})`,
					inline: true,
				},
				{
					name: "🌎 Join our support guild!",
					value: `[Join now](${config.guildInvite})`,
					inline: true,
				},
				{
					name: "💻 Visit our website!",
					value: `[DTel's website.](${config.siteLink})`,
					inline: true,
				},
				{
					name: "📂 View our GitHub",
					value: `[We are open source!](${config.githubLink})`,
					inline: true,
				},
				{
					name: "💖 Support us!",
					value: `[How to donate?](${config.vipLink})`,
					inline: true,
				},
				{
					name: "📋 Vote for us!",
					value: `[Get your free credits!](${config.voteLink})`,
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
			],
			footer: {
				text: "DTel V3 - made with <3 by Austin Huang, Mitchell Rademaker and their team",
			},
		},
	};
	await msg.channel.send(toSend);
};
