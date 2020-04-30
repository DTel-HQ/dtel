const embed = {
	embed: {
		fields: [
			{
				name: ":book: DTel Server Information",
				value: "For command help, use `>help`.\nOur invite for the server is https://discord.gg/RN7pxrB. \nThe documentation is located at https://dtel.austinhuang.me/en/latest/. \nYou can get support by either calling `*611`, or you can raise any concerns with the devs, by sending us an email.",
			},
			{
				name: ":telephone_receiver: Getting a number",
				value: "Type `>wizard` in any server that you have the Manage Server permission in.",
			},
			{
				name: "Rules",
				value: ":one: Don't advertise your server here, please keep spam in #trash-bin, and don't post anything inappropriate.\n:two: Don't call *611 from #public-payphone. (it won't let you anyway)\n:three: Do not ask for staff: We will hire people when we have a need to.\n:four: Respect staff.\n:five: Do not promote communism or capitalism.\n:six: Shitposting is allowed, except in #old-suggestion-box.",
			},
			{
				name: ":inbox_tray: Inviting the bot:",
				value: `Use the command \`>invite\` or click this button: [:dl:](${config.botInvite})\``,
			},
			{
				name: ":question: Who is who?",
				value: "Regular users have the :DTelPhone: emoji.Customer Support have the :telephone_receiver: emoji.",
			},
		],
		footer: {
			text: "DTel Headquarters",
		},
	},
};
