module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: ">addcredit [userid] [amount]" } });

	let user, amount;
	// If they were mentioned
	if (msg.mentions.users.first()) {
		user = msg.mentions.users.first();
		let userpos = suffix.split(" ").indexOf(`<@${user.id}>`);
		if (!userpos) userpos = suffix.split(" ").indexOf(`<@!${user.id}>`);
		if (!userpos) return msg.channel.send({ embed: { color: config.colors.error, title: "No hablo", description: "Couldn't read your arguments." } });

		let amountpos = userpos === 0 ? 1 : 0;
		amount = suffix.split(" ")[amountpos];
	// otherwise if they used an id
	} else if (/\d{17,19}/.test(suffix.split(" ")[0])) {
		user = await client.users.fetch(suffix.split(" ")[0]).catch(() => null);
		amount = suffix.split(" ")[1];
	}

	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown user", description: "Couldn't find that user.\nSynax: `>addcredit [user] [amount]`" } });
	if (!amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Add what...?", description: "You didn't input an amount to add...\nSynax: `>addcredit [user] [amount]`" } });

	// Check for invalid users
	if (user.id === client.user.id) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Thanks but no.", description: "I already have all the money." } });
	} else if (user.bot) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "AI will destroy humans!!!", description: "Are you sure you want to give them more money?" } });
	} else if (user.id === msg.author.id && !msg.author.boss) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Really?", description: "You thought we'd let you do that?" } });
	} else if (user.support && !msg.author.boss) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Seriously...", description: "That's not something you should be trying on the job!" } });
	}

	// Check for invalid input
	if (isNaN(amount)) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "1, 2, 3...", description: "Keep going to find an actual number." } });
	} else if (!/^-?\d*$/.test(amount)) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Is it a bird, is it a plane", description: "well, it's not a number..." } });
	}

	let neg = amount.startsWith("-");
	amount = Number(amount);

	let account = await user.account();

	account.balance += amount;

	if (account.balance < 0) return msg.channel.send({ embed: { color: config.colors.error, title: "We aren't not a loan service.", description: `That request would leave them with ¥${account.balance}.` } });

	await r.table("Accounts").get(user.id).update({ balance: account.balance });

	if (neg) amount = String(amount).substr(1);
	amount = client.format(amount);
	msg.channel.send({ embed: { color: config.colors.receipt, title: `${neg ? "Removed" : "Added"} credits!`, description: `${neg ? "Removed" : "Added"} ¥${amount} ${neg ? "from" : "to"} <@${user.id}>(${user.id})`, footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() } } });
	let dmChannel = await user.createDM().catch(e => null);
	if (dmChannel) dmChannel.send({ embed: { color: config.colors.receipt, title: neg ? "Your balance changed" : "Cash!", description: `A support member has ${neg ? "removed" : "added"} ¥${amount} ${neg ? "from" : "to"} your account. You now have ¥${account.balance}.` } }).catch(() => null);
	await client.log(`:yen: Support member ${msg.author.tag} ${neg ? "removed" : "added"} ¥${amount} ${neg ? "from" : "to"} ${user.tag} (${user.id}).`);
};
