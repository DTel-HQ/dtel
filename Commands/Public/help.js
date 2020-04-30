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
			description: "For more information, use `>info`, `>links` or call customer support: `>dial *611`.",
			fields: [
				{
					name: "Get yourself a number to call others!",
					value: "Do `>wizard` and follow the prompts. Once you got one, you can...",
				},
				{
					name: ">dial / >call",
					value: "Dial a specific DTel number you have in mind. Or...",
				},
				{
					name: ">rdial / >rcall",
					value: "Dial a random number from the `*411` phonebook. (To register yourself on the phonebook, do `>dial *411`.)",
				},
				{
					name: ">status",
					value: "See how long a call has been going for, plus the message count and call ID.",
				},
				{
					name: ">block",
					value: "Block a number from calling this channel.",
				},
				{
					name: ">contacts",
					value: "A personal contact book for DTel numbers.",
				},
				{
					name: ">mention",
					value: "Get mentioned when there's an incoming call.",
				},
				{
					name: ">transfer",
					value: "Transfer the other side in a call to another number.",
				},
				{
					name: "Currency commands",
					value: "More information about the currency [here](http://discordtel.austinhuang.me/en/latest/Payment/).\n• `>dial *233`: Renew your number registration using credits.\n• `>convert`: Convert your credits into other bot currency via [Discoin](https://discoin.gitbook.io/docs/users-guide).\n• `>daily`: Get daily credits.\n• `>vote`: Vote for us to get more credits!\n• `>pay`: Send money to others (Fees apply).\n• `>lottery`: Daily jackpot!",
				},
				{
					name: "Mailbox commands",
					value: "\n• `>mailbox`: Check mailbox messages or create one.\n• `>message`: Write a message to other number's mailbox.",
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
			footer: {
				text: "DTel V3 - made with <3 by Austin Huang, Mitchell Rademaker and their team",
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
