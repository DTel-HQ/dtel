module.exports = async(client, msg, suffix) => {
	// rework?
	let avatarURL = await client.user.displayAvatarURL();
	msg.channel.send({
		embed: {
			color: 3447003,
			author: {
				name: client.user.username,
				icon_url: avatarURL,
				url: "https://discordtel.austinhuang.me",
			},
			title: "List of Commands",
			description: "For more information, use `>info` or `>dial *611`.",
			fields: [
				{
					name: ">wizard",
					value: "Get yourself a number.",
				},
				{
					name: ">block",
					value: "Block a number from calling this channel.",
				},
				{
					name: ">contacts",
					value: "A contact book for DiscordTel numbers.",
				},
				{
					name: ">convert",
					value: "Convert your credits into other bot currency via [Discoin](http://discoin.gitbooks.io/docs).",
				},
				{
					name: ">daily",
					value: "Get daily credits. More information about the currency [here](http://discordtel.austinhuang.me/en/latest/Payment/).",
				},
				{
					name: ">dial / >call",
					value: "Dial a number.",
				},
				{
					name: ">rdial / >rcall",
					value: "Dial a random number from the `*411` phonebook.",
				},
				{
					name: ">lottery",
					value: "Real gambling right there.",
				},
				{
					name: ">mailbox",
					value: "Check mailbox messages or create one.",
				},
				{
					name: ">mention",
					value: "Get mentioned when there's an incoming call.",
				},
				{
					name: ">message",
					value: "Sends a message to another mailbox.",
				},
				{
					name: "I don't really need to explain them...Right, my master?",
					value: "`>help`, `>info`, `>invite`",
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
