module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: ">addcredit [userid] [amount]" } });

	let user, amount;
	// If they were mentioned
	if (msg.mentions.users.first()) {
		user = msg.mentions.users.first();
		// Genuine offbrand fix
		amount = suffix.substring(suffix.indexOf(`${msg.mentions.members.first().toString()}`) + msg.mentions.members.first().toString().length + 1).trim();
	// otherwise if they used an id
	} else if (/\d{17,19}/.test(suffix.split(" ")[0])) {
		user = await client.users.fetch(suffix.split(" ")[0]).catch(() => null);
		amount = suffix.substring(suffix.indexOf(" ") + 1).trim();
	}

	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown user", description: "Couldn't find that user." } });
	if (!amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Add what...?", description: "You didn't input an amount to add..." } });

	// Check for invalid users
	if (user.id === client.user.id) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Thanks but no.", description: "I already have all the money." } });
	} else if (user.bot) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "AI will destroy humans!!!", description: "Are you sure you want to give them more money?" } });
	} else if (user.id === msg.author.id && !(await msg.author.getPerms()).boss) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Really?", description: "You thought we'd let you do that?" } });
	} else if ((await user.getPerms()).support && !(await msg.author.getPerms()).boss) {
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

	let account = await r.table("Accounts").get(user.id);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
	}

	account.balance += amount;

	if (account.balance < 0) return msg.channel.send({ embed: { color: config.colors.error, title: "We aren't not a loan service.", description: `That request would leave them with ¥${account.balance}.` } });

	await r.table("Accounts").get(user.id).update({ balance: account.balance });
	msg.channel.send({ embed: { color: config.colors.success, title: "Success!", description: `${neg ? "Removed" : "Added"} ¥${amount} ${neg ? "from" : "to"} ${user.tag}'s account.`, footer: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() } } });

	if (neg) amount = String(amount).substr(1);

	user.send({ embed: { color: config.colors.receipt, title: neg ? "Your balance changed" : "Cash!", description: `A support member has ${neg ? "removed" : "added"} ¥${amount} ${neg ? "from" : "to"} your account. You now have ¥${account.balance}.` } }).catch(() => null);
	await client.log(`:yen: Support member ${msg.author.tag} ${neg ? "removed" : "added"} ¥${amount} ${neg ? "from" : "to"} ${user.tag} (${user.id}).`);
};
