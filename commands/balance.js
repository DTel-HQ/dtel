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
			msg.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		}
		msg.channel.send({
			embed: {
				color: 0x007FFF,
				title: "Current Account Status",
				fields: [{
					name: "Your Balance",
					value: account.balance,
				},
				{
					name: "Recharging",
					value: "http://discordtel.readthedocs.io/en/latest/Payment/",
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
