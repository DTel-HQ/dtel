module.exports = async(client, msg, suffix) => {
	if (!msg.author.support || !suffix) {
		let account = await msg.author.account();

		msg.channel.send({
			embed: {
				color: config.colors.info,
				title: "Your credits and VIP months",
				author: {
					name: msg.author.tag,
					icon_url: msg.author.displayAvatarURL(),
				},
				fields: [{
					name: "Credits",
					value: `${config.dtsEmoji}${client.format(account.balance)}`,
					inline: true,
				},
				{
					name: "VIP Months",
					value: account.vip ? account.vip : `0 ([what they are and how to get them](${config.vipLink}))`,
					inline: true,
				},
				{
					name: "Recharging",
					value: `[Click here](${config.paymentLink})`,
				}],
			},
		});
	} else {
		let userID = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix;
		let user = await client.users.fetch(userID)
			.catch(_ => null);

		let account = user ? user.bot ? { balance: "Infinity", vip: "Infinity" } : null : null;
		if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown user", description: "Couldn't find that number." } });
		if (!account) account = await r.table("Accounts").get(userID);
		if (!account) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown account", description: "This user doesn't have an account." } });

		msg.channel.send({
			embed: {
				color: config.colors.info,
				title: `Information for ${user.tag}`,
				author: {
					name: user.tag,
					icon_url: user.displayAvatarURL(),
				},
				fields: [{
					name: "Their Balance",
					value: `${config.dtsEmoji}${client.format(account.balance)}`,
					inline: true,
				},
				{
					name: "Their Months",
					value: account.vip ? account.vip : "0",
					inline: true,
				},
				{
					name: "Recharging",
					value: "https://dtel.austinhuang.me/en/latest/Payment/",
				}],
			},
		});
	}
};
