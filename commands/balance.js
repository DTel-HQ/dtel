module.exports = async(client, msg, suffix) => {
	if (!suffix) {
		let account;
		try {
			account = await Accounts.findOne({ _id: msg.author.id });
			if (!account) throw new Error();
		} catch (err) {
			await Accounts.create(new Accounts({
				_id: msg.author.id,
			}));
			msg.reply("You don't have a DiscordTel account... creating one for you! Please also read this for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
			account = await Accounts.findOne({ _id: msg.author.id });
		}
		msg.channel.send({
			embed: {
				color: 0x007FFF,
				title: "Current Account Status",
				fields: [{
					name: "Your Balance",
					value: `${account.balance}`,
				},
				{
					name: "Recharging",
					value: "https://discordtel.austinhuang.me/en/latest/Payment/",
				},
				{
					name: "Vote for free credits!",
					value: "You can vote for DiscordTel on various bot listings for **40~80 more credits every day**! See [here](https://discordtel.austinhuang.me/en/latest/Payment/#voting-for-us-on-listings) for a list of voting sites!"
				}],
			},
		});
	} else {
		let account, user;
		try {
			user = await client.users.fetch(suffix);
		} catch (err) {
			return msg.reply("This user could not be found.");
		}
		try {
			account = await Accounts.findOne({ _id: user.id });
			if (!account) throw new Error();
		} catch (err) {
			return msg.reply("This user does not have an account.");
		}
		msg.reply(`:checkered_flag: The user **${user.username}** currently has \`${account.balance}\` credits.`);
	}
};
