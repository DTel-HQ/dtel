// This embed is used in DTel HQ (the support server)'s #info channel.
const embed = {
	embed: {
		color: 0x3498d8,
		fields: [
			{
				name: ":book: **DTel Server Information**",
				value: "For help with using commands, use `>help`.\nThe invite for this server is https://discord.gg/RN7pxrB. \nThe documentation for DTel is located at https://dtel.austinhuang.me/en/latest/. \nYou can get support by calling `*611`, or you can raise any concerns with the devs by sending us an email.\nIn addition, you can apply to become Customer Support [here](https://dtel.typeform.com/to/wHjMpX).",
			},
			{
				name: ":telephone_receiver: **Getting a number**",
				value: "Type `>wizard` in any server that you have the `Manage Server` permission in (or DMs with the bot) and follow the steps.",
			},
			{
				name: "**Rules**",
				value: ":one: **Don't** advertise your server here, please keep spam in #trash-bin, and don't post anything inappropriate.\n:two: **Don't** call *611 from #public-payphone (it won't let you anyway.)\n:three: **Do not ask for staff**: We will hire people when we need to. In addition, asking about your application is an instant denial.\n:four: **Respect staff.**\n:five: **Do not** ping bosses or other staff directly for support. Instead, >dial *611 in any DTel-enabled channel.",
			},
			{
				name: ":inbox_tray: **Inviting the bot**",
				value: `Use \`>invite\` or click this button: [<:dl:382568980218511361>](${config.botInvite})`,
			},
			{
				name: ":question: **Who's who?**",
				value: "**Regular users** have the <:DTelPhone:310817969498226718> emoji.\n**Customer Support** have the <:GreenPhone:709101494556819507> emoji.\n**Donators** have the <:GoldPhone:709101494242246657> emoji.",
			},
		],
		footer: {
			text: "DTel Headquarters",
			icon_url: client.user.avatarURL({ format: "png" }),
		},
	},
};
