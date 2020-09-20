module.exports = async(client, msg, suffix) => {
	let account = await msg.author.account();

	let d = new Date();
	let h = 23 - d.getHours();
	let m = 59 - d.getMinutes();
	let s = 59 - d.getSeconds();
	let time = client.time(s, m, h);

	if (account.daily) return msg.channel.send({ embed: { color: config.colors.info, title: "Already claimed", description: `You've already claimed your daily credits! Try again in **${time}**.\n\nYou can vote for DTel to get **60+ more credits every day**!\nSee [here](${config.voteLink}) for a list of voting sites.` } });

	let dailies = config.dailies;
	let perms = await msg.author.getPerms();
	let amount = dailies.default;

	for (let perm of Object.keys(dailies)) {
		if (perms[perm] && dailies[perm] > amount) amount = dailies[perm];
	}

	account.balance += amount;

	await r.table("Accounts").get(msg.author.id).update({ balance: account.balance, daily: true });
	await msg.channel.send({ embed: { color: config.colors.success, title: "Claimed your dailies!", description: `Here's your ${config.dtsEmoji}${amount}! You now have ${config.dtsEmoji}${client.format(account.balance)}.\n\nYou can vote for DTel to get **60+ more credits every day**!\n See [here](${config.voteLink}) for a list of voting sites.` } });
	await client.log(`:calendar: \`${msg.author.username}\` (${msg.author.id}) claimed their daily ${config.dtsEmoji}${amount}.`);
};
