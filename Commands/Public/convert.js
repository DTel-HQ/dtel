const { post } = require("chainfetch");

module.exports = async(client, msg, suffix) => {
	let error;
	let amount = suffix.split(" ")[0];
	let currency = suffix.split(" ")[1];
	if (!amount || !currency) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: `>convert [amount] [currency]\nSee the [docs](${config.discoinLink}) for more information.` } });
	amount = parseInt(amount);
	currency = currency.toUpperCase();

	let account = await msg.author.account();

	if (isNaN(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Syntax error", description: "That's not a number..." } });
	if (account.balance < amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `Insufficient balance! You have ${account.balance} credits.` } });

	let snekres;
	try {
		snekres = await post("https://discoin.zws.im/transactions").set({
			Authorization: "Bearer "+require("../../Configuration/auth.js").discoinToken,
			"Content-Type": "application/json",
		}).send({
			user: msg.author.id,
			amount: parseInt(amount),
			toId: currency,
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
				description: `Succesfully converted ¥${amount} into ${snekres.body.payout} ${currency}. You may track your transaction [here](https://dash.discoin.zws.im/#/transactions/${snekres.body.id}/show).`,
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
