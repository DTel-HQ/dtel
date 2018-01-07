module.exports = async(client, message, args) => {
	message.reply("check your DM!");
	message.author.send({
		embed: {
			color: 3447003,
			author: {
				name: "DiscordTel",
				icon_url: "https://github.com/austinhuang0131/discordtel/raw/rewrite/discordtel.png",
				url: "https://discordtel.austinhuang.me",
			},
			title: "📖 DiscordTel Information",
			description: "For command help, use `>help`. More detailed documentation is available at [my website](https://discordtel.austinhuang.me/en/latest).",
			fields: [
				{
					name: "📞 Getting a number",
					value: "Before getting a number, you need to reserve a channel for your phone. Once you have done this, you'll have to run the `>wizard` command in the channel to get a number.",
				},
				{
					name: "✏ Number prefixes",
					value: "Most numbers have a prefix of `03XX`, where `XX` represents your shard number. There are some numbers with a prefix of `0900`, which are DM numbers (numbers you can assign in a direct message with the client), and they act the same as `03XX` numbers, which can *also* have the same digits as `03XX` numbers. Numbers starting with `0800` or `0844`, as well as short codes starting with `*` or `#` are for special uses.",
				},
				{
					name: "💰 Recharging",
					value: "You can either earn credits in the client, transfer credits from other clients, or donate to DiscordTel's development in exchange of credits. See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.\nAfter recharging, dial `*233` or `>balance` to check balance.",
				},
				{
					name: "🔖 Phonebook",
					value: "To use the phonebook, first dial `*411`. You can check for an existing **11-digit** number by pressing `1`, search the phonebook with **keywords** by pressing `2`. add/edit/remove your number from the phonebook by pressing `3`, and check a special number by pressing `4`.",
				},
				{
					name: "📥 Invite the bot",
					value: "Type `>invite` or click this button: [<:dl:382568980218511361>](https://discordapp.com/oauth2/authorize?client_id=377609965554237453&scope=bot&permissions=67169284)",
				},
				{
					name: "📌 Official Server",
					value: "https://discord.gg/RN7pxrB",
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
