module.exports = async(client, msg, suffix) => {
	let user = msg.mentions.users.first() ? msg.mentions.users.first() : await client.users.fetch(suffix.split(" ")[0]).catch(e => null);
	let amount = parseInt(suffix.split(" ")[1]);
	let reason = suffix.split(" ");
	reason.splice(0, 2);
	reason = reason.join(" ");

	// Checks for user and amount
	if (!user || !/^\d+$/.test(amount)) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: `>pay [user] [amount] [optional: message]`" } });
	if (user.bot || msg.author.id === user.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Bot/own user", description: "We don't allow wasting money. (bot/own account)" } });
	if (parseInt(amount) < config.minTransfer) return msg.channel.send({ embed: { color: config.colors.error, title: "Too low an amount", description: `Payments can only happen from ¥${config.minTransfer} and up.` } });

	// The account from which the amount will be taken
	let fromAccount = await r.table("Accounts").get(msg.author.id);
	if (!fromAccount) {
		fromAccount = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(fromAccount);
	}

	// Enough balance?
	if (fromAccount.balance < parseInt(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Balance too low", description: `Your balance is too low. You currently have ${fromAccount.balance}` } });

	// The amount to gift to
	let toAccount = await r.table("Accounts").get(user.id);
	if (!toAccount) {
		toAccount = { id: user.id, balance: 0 };
		await r.table("Accounts").insert(toAccount);
	}

	// Determine the fee
	let fee = Math.round(amount - (amount * config.transferRate));

	// Information embed
	let omsg = await msg.channel.send({ embed: {
		color: config.colors.info,
		author: {
			name: `${msg.author.tag} (${msg.author.id})`,
			icon_url: msg.author.displayAvatarURL(),
		},
		title: "Confirmation",
		description: "(yes) to continue, (no) to cancel.",
		fields: [
			{
				name: "User",
				value: `To: ${user.tag} (${user.id})`,
			},
			{
				name: "Transaction amounts",
				value: `Amount: ¥${amount}\nFee: ¥${fee} (${Math.round((1 - config.transferRate) * 100)}%)\n_The fee will be deducted from the amount to transfer._`,
			},
			{
				name: "Your new balance",
				value: `¥${fromAccount.balance - amount}`,
			},
			{
				name: "Message for receiver",
				value: reason ? reason : "None",
			},
		],
		timestamp: new Date(),
		footer: {
			text: "This call will automatically be hung up after 60 seconds of inactivity",
		},
	} });

	// Collector
	msg.author.busy = true;
	let collected = await msg.channel.awaitMessages(
		m => m.author.id === msg.author.id && /^yes$|^no$/i.test(m.content),
		{ max: 1, time: 60000 }
	);

	// on collection
	msg.author.busy = false;
	omsg.delete().catch(e => null);
	if (!collected.first()) return;
	collected.first().delete().catch(e => null);
	if (/^no$/i.test(collected.first().content)) return;

	// check again
	fromAccount = await r.table("Accounts").get(msg.author.id);
	if (fromAccount.balance < parseInt(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Balance too low", description: `Your balance is too low. You currently have ${fromAccount.balance}` } });

	// update balances
	fromAccount.balance -= amount;
	toAccount.balance += amount - fee;
	await r.table("Accounts").get(fromAccount.id).update({ balance: fromAccount.balance });
	await r.table("Accounts").get(toAccount.id).update({ balance: toAccount.balance });

	// Tell the world about it
	msg.channel.send({ embed: {
		color: config.colors.receipt,
		author: {
			name: `${msg.author.tag} (${msg.author.id})`,
			icon_url: msg.author.displayAvatarURL(),
		},
		title: "Success!",
		description: "You succesfully payed money to someone else. Here is your receipt.",
		fields: [
			{
				name: "User",
				value: `To: ${user.tag} (${user.id})`,
			},
			{
				name: "Transaction amounts",
				value: `Amount: ¥${amount}\nFee: ¥${fee} (${Math.round((1 - config.transferRate) * 100)}%)\n_The fee has been deducted from the transferred amount._`,
			},
			{
				name: "Message for receiver",
				value: reason ? reason : "None",
			},
		],
		timestamp: new Date(),
	} });
	client.log(`💸 User ${msg.author.tag} (${msg.author.id}) payed ¥${amount} to ${user.tag} (${user.id})`);
	user.send({ embed: {
		color: config.colors.receipt,
		author: {
			name: `${msg.author.tag} (${msg.author.id})`,
			icon_url: msg.author.displayAvatarURL(),
		},
		title: "You received money!",
		description: "Someone has payed money to you. Here's your receipt.",
		fields: [
			{
				name: "User",
				value: `From: ${msg.author.tag} (${msg.author.id})`,
			},
			{
				name: "Transaction amounts",
				value: `Amount: ¥${amount}\nFee: ¥${fee} (${Math.round((1 - config.transferRate) * 100)}%)\n_The fee has been deducted from the transferred amount._`,
			},
			{
				name: "Balance",
				value: `Your new balance: ¥${toAccount.balance}`,
			},
			{
				name: "Message from sender",
				value: reason ? reason : "None",
			},
		],
		timestamp: new Date(),
	} }).catch(e => null);
};
