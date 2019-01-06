module.exports = async(client, msg, suffix) => {
	if (!suffix) {
		let account = await r.table("Accounts").get(msg.author.id).default(null);
		if (!account) {
			account = { id: msg.author.id, balance: 0 };
			await r.table("Accounts").insert(account);
			msg.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
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
		let userID = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix;
		let user = await client.users.fetch(userID)
			.catch(_ => null);
		if (!user) return msg.reply("That user could not be found.");

		let account = await r.table("Accounts").get(userID);
		if (!account) return msg.reply("This user does not have an account.");

		msg.reply(`:checkered_flag: The user **${user.username}** currently has \`${account.balance}\` credits.`);
	}
};
