module.exports = async(client, msg, suffix) => {
	let account = await r.table("Accounts").get(msg.author.id);

	if (!account) {
		account = { id: msg.author.id, balance: 0, daily: false };
		await r.table("Accounts").insert(account);
		await msg.reply(`You don't have an account created...Creating an account for you! Please also read for information on payment: <${config.paymentLink}>`);
	}

	if (account.daily) return msg.reply(`You already claimed your daily credits!\n\nYou can vote for DiscordTel on various bot listings to get **60+ more credits every day**! See ${config.voteLink} for a list of voting sites.`);

	let dailies = config.dailies;
	let perms = await msg.author.getPerms();
	let amount = dailies.default;

	for (let perm of Object.keys(dailies)) {
		if (perms[perm] && dailies[perm] > amount) amount = dailies[perm];
	}

	account.balance += amount;

	await r.table("Accounts").get(msg.author.id).update({ balance: account.balance, daily: true });
	await msg.reply(`Here's your ${amount} credits!\n\nYou can vote for DiscordTel on various bot listings to get **60+ more credits every day**! See ${config.voteLink} for a list of voting sites.`);
	await client.log(`:calendar: ${msg.author.tag} (${msg.author.id}) claimed their daily ¥${amount}.`);
};
