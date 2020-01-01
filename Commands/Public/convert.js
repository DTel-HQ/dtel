const Scambio = require("@discoin/scambio");

module.exports = async(client, msg, suffix) => {
	const discoinToken = require("../../Configuration/auth.js").discoinToken;
	let error;
	let amount = suffix.split(" ")[0];
	let currency = suffix.split(" ")[1];
	if (!amount || !currency) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: `>convert [amount] [currency]\nSee the [docs](${config.discoinLink}) for more information.` } });
	amount = parseInt(amount);
	currency = currency.toUpperCase();

	let account = await msg.author.account();

	if (isNaN(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Syntax error", description: "That's not a number..." } });
	if (account.balance < amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `Insufficient balance! You have ${account.balance} credits.` } });

	const client2 = new Scambio(discoinToken, "DTS")
	try {
		const newTransaction = await client2.transactions.create ({
			to: currency,
			amount: parseInt(amount),
			user: msg.author.id,
		});
	} catch (err) {
		error = err;
		return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: "```json\n"+JSON.stringify(err.body)+"\n```" } });
	} finally {
		if (!error) {
			account.balance -= amount;
			await r.table("Accounts").get(account.id).update({ balance: account.balance });

			let embed = {
				color: config.colors.receipt,
				title: "Converted!",
				description: `Succesfully converted ¥${amount} into ${newTransaction.payout} ${currency}. You may track your transaction [here](https://dash.discoin.zws.im/#/transactions/${newTransaction.id}/show).`,
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
