module.exports = async(client, msg, suffix) => {
	// rework?
	let avatarURL = await client.user.displayAvatarURL();
	let toSend = {
		embed: {
			color: config.colors.info,
			author: {
				name: client.user.username,
				icon_url: avatarURL,
				url: "https://dtel.austinhuang.me",
			},
			title: "DTel's commands",
			description: "For more information, use `>info`, `>links` or call Customer Support (`>dial *611`).",
			fields: [
				{
					name: "Get yourself a number to call others!",
					value: "Use `>wizard` and follow the prompts. Once you've got one, you can...",
				},
				{
					name: ">dial / >call",
					value: "Dial a specific DTel number you have in mind. Or...",
				},
				{
					name: ">rdial / >rcall",
					value: "Dial a random number from the yellowpages (`*411`). (To register your number in the yellowpages, `>dial *411`.)",
				},
				{
					name: ">status",
					value: "See how long a call has been going for, plus the message count and call ID.",
				},
				{
					name: ">block",
					value: "Block a number from calling you.",
				},
				{
					name: ">contacts",
					value: "Your personal contact book of DTel numbers.",
				},
				{
					name: ">mention",
					value: "Get mentioned when there's an incoming call (guild only).",
				},
				{
					name: ">transfer",
					value: "Transfer the other side of a call to another number.",
				},
				{
					name: "Currency commands",
					value: "More information about the currency [here](http://dtel.austinhuang.me/en/latest/Payment/).\n• `>dial *233`: Renew your number registration using credits.\n• `>convert`: Convert your credits into other bot currency via [Discoin](https://discoin.gitbook.io/docs/users-guide).\n• `>daily`: Get daily credits.\n• `>vote`: Vote for us to get more credits!\n• `>pay`: Send money to others (Fees apply).\n• `>lottery`: Daily jackpot!",
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
					name: "I don't really need to explain these... right, my master?",
					value: "`>help`, `>info`, `>invite`, `>links`, `>prefix` and `>ping`",
				},
			],
			footer: {
				text: "DTel V3 • Made with <3 by Austin Huang, Mitchell Rademaker and their team",
			},
		},
	};

	await msg.author.createDM(); // do we need to do this or does msg.author.send do it for us - rexo
	try {
		await msg.author.send(toSend);
	} catch (_) {
		await msg.channel.send(toSend);
	}
};
