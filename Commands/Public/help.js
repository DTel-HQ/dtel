module.exports = async(client, msg, suffix) => {
	// rework?
	let avatarURL = await client.user.displayAvatarURL();
	let toSend = {
		embed: {
			color: config.colors.info,
			author: {
				name: client.user.username,
				icon_url: avatarURL,
				url: "https://discordtel.austinhuang.me",
			},
			title: "List of Commands",
			description: "For more information, use `>info` or call customer support: `>dial *611`.",
			fields: [
				{
					name: ">wizard",
					value: "Get yourself a number.",
				},
				{
					name: ">block",
					value: "Block a number from calling this channel. \n`>block [number]`",
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
					value: "Dial a number. \n`>dial [number]`",
				},
				{
					name: ">rdial / >rcall",
					value: "Dial a random number from the `*411` phonebook.",
				},
				{
					name: ">lottery",
					value: "Real gambling right there. \n`>lottery [optional: amount]`",
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
					name: ">transfer",
					value: "Transfer money to another user for a fee. \n`>transfer [user] [amount] [optional: message]`\nAlso to transfer the other side in a call to another number. `>transfer [number]`",
				},
				{
					name: ">upgrade",
					value: "Upgrade your number to a VIP number. Use this to see all the benefits!",
				},
				{
					name: "I don't really need to explain them...Right, my master?",
					value: "`>help`, `>info`, `>invite`, `>links`, `>prefix`, `>ping`",
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
