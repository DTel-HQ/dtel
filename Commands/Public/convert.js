const Discoin = require("@discoin/scambio").default;

module.exports = async(client, msg, suffix) => {
	const DClient = new Discoin(require("../../Configuration/auth.js").discoinToken, "DTS");
	let error;
	let amount = suffix.split(" ")[0];
	let currency = suffix.split(" ")[1];
	if (!amount || !currency) {
		try {
			let currencies = await Discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC");
			let dts = currencies.find(c => c.id === "DTS");
			currencies.splice(currencies.indexOf(dts), 1);
			return msg.channel.send({ embed: {
				color: config.colors.info,
				title: "Command usage",
				description: `\`>convert [amount] [currency]\`\n\`[currency]\` = the 3-letter currency codes written in code blocks below.\nSee the [docs](${config.discoinLink}) or \`>dial 0800DISCOIN\` for more information.`,
				fields: [{
					name: "Current Exchange Rates",
					value: currencies.map(c => `• ${c.name} (\`${c.id}\`): 1 DTS = ${(dts.value / c.value).toFixed(4)} ${c.id}`).join("\n"),
				}],
			} });
		} catch (err) {
			error = err;
			return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: `\`\`\`\n${err}\n\`\`\`` } });
		}
	}
	amount = parseFloat(amount).toFixed(2);
	currency = currency.toUpperCase();

	let account = await msg.author.account();

	if (isNaN(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Syntax error", description: "That's not a number..." } });
	if (account.balance < amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `Insufficient balance! You have ${account.balance} credits.` } });

	let newTransaction;
	try {
		newTransaction = await DClient.transactions.create({
			to: currency,
			amount: amount,
			user: msg.author.id,
		});
	} catch (err) {
		error = err;
		return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: `\`\`\`json\n${JSON.stringify(err.body)}\n\`\`\`` } });
	} finally {
		if (!error) {
			account.balance -= amount;
			await r.table("Accounts").get(account.id).update({ balance: account.balance });

			let embed = {
				color: config.colors.receipt,
				title: "Converted!",
				description: `Succesfully converted <:DTS:668551813317787659>${amount} into ${newTransaction.payout} ${currency}. You may track your transaction [here](https://dash.discoin.zws.im/#/transactions/${newTransaction.id}/show).`,
				author: {
					name: msg.author.tag,
					icon_url: msg.author.displayAvatarURL(),
				},
				timestamp: new Date(),
			};
			msg.channel.send({ embed: embed });
		}
	}
};
