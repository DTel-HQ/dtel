module.exports = async(client, message, args) => {
	let avatarURL = await client.user.displayAvatarURL();
	message.channel.send({
		embed: {
			color: 3447003,
			author: {
				name: "DiscordTel",
				icon_url: avatarURL,
				url: "https://discordtel.austinhuang.me",
			},
			title: "List of Commands",
			description: "For more information, use `>info` or call our support number: `>dial *611`. Making troll-calls to this number can and will result in a blacklist.",
			fields: [
				{
					name: "\>dial / >call",
					value: "Dial a number",
				},
				{
					name: "\>rdial / >rcall",
					value: "Dial a random number from the `*411` phonebook",
				},
				{
					name: "\>wizard",
					value: "Get yourself a number",
				},
				{
					name: "\>mailbox",
					value: "Check mailbox messages, plus various settings",
				},
				{
					name: "\>message",
					value: "Sends a message to another mailbox",
				},
				{
					name: "\>convert",
					value:
            "Convert your credits into other bot currency via [Discoin](http://discoin.gitbooks.io/docs)",
				},
				{
					name: "\>daily",
					value: "Get daily credits",
				},
				{
					name: "\>lottery",
					value: "Real gambling right there",
				},
				{
					name: "I don't really need to explain them...Right, my master?",
					value: "`>invite`, `>info`, `>help`",
				},
			],
			timestamp: new Date(),
			footer: {
				icon_url: "https://avatars1.githubusercontent.com/u/16656689?s=460&v=4",
				text: "Made with <3 by Austin Huang and his team",
			},
		},
	});
};
