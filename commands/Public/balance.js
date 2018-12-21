module.exports = async(client, msg, suffix) => {
	if (!suffix) {
		let account = await r.table("Accounts").get(msg.author.id).default(null);
		if (!account) {
			account = { id: msg.author.id, balance: 0 };
			await r.table("Accounts").insert(account);
			return msg.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
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
					value: "http://discordtel.readthedocs.io/en/latest/Payment/",
				}],
			},
		});
	} else {
		let user;
		try {
			user = msg.mentions.users.first();
			if (!user) user = await client.users.fetch(suffix);
			if (!user) throw new Error();
		} catch (_) {
			return msg.reply("This user could not be found.");
		}
		if (!user) return;

		let account = await r.table("Accounts").get(msg.author.id).default(null);
		if (!account) return msg.reply("This user does not have an account.");

		msg.reply(`:checkered_flag: The user **${user.username}** currently has \`${account.balance}\` credits.`);
	}
};
