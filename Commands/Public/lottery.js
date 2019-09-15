module.exports = async(client, msg, suffix) => {
	let lottery = await r.table("Lottery");

	// Check if they have an account
	let account = await r.table("Accounts").get(msg.author.id);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
	}

	let id, jackpot, currentNumber, index, totalEntries, lastEntry;

	// Sort entries based on ID
	if (lottery.length < 1) {
		id = 0;
		jackpot = 0;
		currentNumber = 0;
	} else {
		await lottery.sort((a, b) => a.id < b.id ? -1 : 1);
		index = lottery.length - 1;
		lastEntry = lottery[index];
		id = lastEntry.id;
		jackpot = lastEntry.jackpot;
		currentNumber = lastEntry.number;
	}

	if (!suffix) {
		let ownedTickets = 0;
		let userEntries = await r.table("Lottery").filter({ userID: msg.author.id });
		for (let entry of userEntries) {
			ownedTickets += entry.tickets;
		}
		let chance;
		if (currentNumber == 0) {
			chance = 0;
		} else {
			chance = Math.round((ownedTickets / currentNumber) * 100);
		}
		msg.channel.send({ embed: { color: config.colors.lottery, title: "Lottery information", description: `The current jackpot is ¥${jackpot}.\nYou have ${ownedTickets} tickets.\nYour chance to win is: ${chance}%\nType \`>lottery [amount]\` to buy tickets for ${config.lotteryCost} credits each.` } });
	} else if (/^\d+$/.test(suffix) && !/^0.*/.test(suffix)) {
		let tickets = Number(suffix);
		let cost = tickets * config.lotteryCost;
		let balance = account.balance;
		if (cost > balance) {
			msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: "This isn't a charity, get enough money first." } });
		} else {
			balance -= cost;
			await r.table("Accounts").get(msg.author.id).update({ balance: balance });
			let newNumber = currentNumber + tickets;
			let newJackpot = jackpot + cost;
			let newID = id + 1;
			await r.table("Lottery").insert({
				id: newID,
				userID: msg.author.id,
				channel: msg.channel.id,
				jackpot: newJackpot,
				number: newNumber,
				tickets: tickets,
			});
			let ownedTickets = 0;
			let userEntries = await r.table("Lottery").filter({ userID: msg.author.id });
			for (let entry of userEntries) {
				ownedTickets += entry.tickets;
			}
			msg.channel.send({ embed: { color: config.colors.lottery, title: "Succesful purchase", description: `You have bought ${tickets} tickets.\nThe current jackpot is ¥${newJackpot}.\nYour chance to win is: ${(Math.round(Number(ownedTickets) / Number(newNumber) * 100))}%` } });
			client.log(`:tickets: ${msg.author.tag} just bought ${tickets} lottery tickets.`);
		}
	} else {
		msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "What did you just input? Type: `>lottery [amount]` to purchase tickets or `>lottery` to see lottery stats." } });
	}
};
