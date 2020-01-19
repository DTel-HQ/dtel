module.exports = async(client, msg, suffix) => {
	if (!msg.author.support || !suffix) {
		let account = await msg.author.account();

		msg.channel.send({
			embed: {
				color: config.colors.info,
				title: "Current Account Status",
				author: {
					name: msg.author.tag,
					icon_url: msg.author.displayAvatarURL(),
				},
				fields: [{
					name: "Your Balance",
					value: `<:DTS:668551813317787659>${client.format(account.balance)}`,
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
					value: `<:DTS:668551813317787659>${client.format(account.balance)}`,
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
