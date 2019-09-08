module.exports = async(client, msg, suffix) => {
	let perms = await msg.author.getPerms();

	if (!perms.support || !suffix) {
		let account = await r.table("Accounts").get(msg.author.id).default(null);
		if (!account) {
			account = { id: msg.author.id, balance: 0 };
			await r.table("Accounts").insert(account);
			msg.channel.send({ embed: { color: config.colors.info, title: "Creating an account", description: `You don't have an account created...Creating an account for you! Please also read the [information on payment](${config.paymentLink}).` } });
		}

		msg.channel.send({
			embed: {
				color: config.colors.info,
				title: "Current Account Status",
				fields: [{
					name: "Your Balance",
					value: `¥${account.balance}`,
					inline: true,
				},
				{
					name: "VIP Months",
					value: account.vip ? account.vip : "0",
					inline: true,
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
		if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown user", description: "Couldn't find that number." } });

		let account = await r.table("Accounts").get(userID);
		if (!account) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown account", description: "This user doesn't have an account." } });

		msg.channel.send({
			embed: {
				color: config.colors.info,
				title: `Information for ${user.tag}`,
				fields: [{
					name: "Their Balance",
					value: `¥${account.balance}`,
					inline: true,
				},
				{
					name: "Their Months",
					value: account.vip ? account.vip : "0",
					inline: true,
				},
				{
					name: "Recharging",
					value: "http://discordtel.readthedocs.io/en/latest/Payment/",
				}],
			},
		});
	}
};
