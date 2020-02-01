module.exports = async(client, msg, suffix) => {
	// Edit later
	msg.channel.send({
		embed: {
			color: config.colors.info,
			author: {
				name: "DiscordTel",
				icon_url: client.user.displayAvatarURL(),
				url: "https://discordtel.austinhuang.me",
			},
			title: "📖 DiscordTel Information",
			description: `For command help, use \`>help\`. More detailed documentation is available at [my website](${config.siteLink}).`,
			fields: [
				{
					name: "📞 Getting a number",
					value: "Before getting a number, you need to reserve a channel for your phone. Once you have done this, you'll have to run the `>wizard` command in the channel to get a number.",
				},
				{
					name: "✏ Numbers",
					value: "Most numbers have a prefix of `03XX`, where `XX` represents your shard number. There are some numbers with a prefix of `0900`, which are DM numbers (numbers you can assign in a direct message with the client), and they act the same as `03XX` numbers, which can *also* have the same digits as `03XX` numbers. Numbers starting with `0800` or `0844`, as well as short codes starting with `*` or `#` are for special uses.",
				},
				{
					name: "💰 Credits",
					value: `You can either earn credits using this bot, transfer credits from other clients, or donate to DiscordTel's development in exchange of credits. See [this page](${config.paymentLink}) for details.\nAfter recharging, dial \`*233\` or \`>balance\` to check balance.`,
				},
				{
					name: "🔖 Phonebook",
					value: "To use the phonebook, first dial `*411`. You can scroll through the phonebook by pressing `1`, add/edit/remove your number from the phonebook by pressing `2`, and check special numbers by pressing `3`.",
				},
				{
					name: "📥 Invite the bot",
					value: `Type \`>invite\` or click this button: [<:dl:382568980218511361>](${config.botInvite})`,
				},
				{
					name: "📋 Suggest a feature",
					value: `Suggest a feature for DiscordTel [here](${config.suggestLink}) and we will take a look at it.`,
				},
				{
					name: "💬 Join our team",
					value: `Strengthen our support team by [applying](${config.applyLink}). Applications will be looked at when we're looking to hire, don't ask about the status of it.`,
				},
				{
					name: "📌 Official Server",
					value: config.guildInvite,
				},
				{
					name: ":desktop: Official Website",
					value: config.siteLink,
				},
			],
			timestamp: new Date(),
			footer: {
				text: "Made with <3 by Austin Huang and his team",
			},
		},
	});
};
