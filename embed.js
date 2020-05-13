const embed = {
	embed: {
		color: 0x3498d8,
		fields: [
			{
				name: ":book: DTel Server Information",
				value: "For command help, use `>help`.\nOur invite for the server is https://discord.gg/RN7pxrB. \nThe documentation is located at https://dtel.austinhuang.me/en/latest/. \nYou can get support by either calling `*611`, or you can raise any concerns with the devs, by sending us an email.\nIn addition, you can apply to become Customer Support [here](https://dtel.typeform.com/to/wHjMpX)",
			},
			{
				name: ":telephone_receiver: Getting a number",
				value: "Type `>wizard` in any server that you have the `Manage Server` permission in.",
			},
			{
				name: "Rules",
				value: ":one: **Don't** advertise your server here, please keep spam in #trash-bin, and don't post anything inappropriate.\n:two: **Don't** call *611 from #public-payphone. (it won't let you anyway)\n:three: **Do not ask for staff**: We will hire people when we have a need to. In addition, asking about your application is an instant denial\n:four: Respect staff.\n:five: **Do not** ping bosses or other staff directly for support, instead, dial *611 in any DTel enabled channel.",
			},
			{
				name: ":inbox_tray: Inviting the bot:",
				value: `Use the command \`>invite\` or click this button: [<:dl:382568980218511361>](${config.botInvite})`,
			},
			{
				name: ":question: Who is who?",
				value: "**Regular users** have the <:DTelPhone:310817969498226718> emoji.\n**Customer Support** have the <:GreenPhone:709101494556819507> emoji.",
			},
		],
		footer: {
			text: "DTel Headquarters",
			icon_url: client.user.avatarURL({ format: "png" }),
		},
	},
};
