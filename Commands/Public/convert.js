const Discoin = require("@discoin/scambio").default;

module.exports = async(client, msg, suffix) => {
	const DClient = new Discoin(require("../../Configuration/auth.js").discoinToken, "DTS");
	let error;
	let amount = suffix.split(" ")[0];
	let currency = suffix.split(" ")[1];
	if (!amount || !currency) {
		try {
			let currencies = await Discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC"),
			    emojis = client.guilds.get("347859709711089674").emojis,
			    dts = currencies.find(c => c.id === "DTS");
			currencies.splice(currencies.indexOf(dts), 1);
			return msg.channel.send({ embed: {
				color: config.colors.info,
				title: "Command usage",
				description: `\`>convert [amount] [currency]\`\n\`[currency]\` = the 3-letter currency codes written in code blocks below.\nSee the [docs](${config.discoinLink}) or \`>dial 0800DISCOIN\` for more information.`,
				fields: [{
					name: "Current Exchange Rates, relative to DTS",
					value: currencies.map(c => `• ${emojis.find(e => e.name === c.id).toString()} ${c.name}: 1 DTS = ${(dts.value / c.value).toFixed(4)} ${c.id}`).join("\n"),
					inline: true
				},
				{
					name: "Discoin Rates",
					value: `• <:DTS:668563890015174677>: **1 DTS = ${dts.value} D$**\n` + currencies.map(c => `• ${emojis.find(e => e.name === c.id).toString()}: 1 ${c.id} = ${c.value} D$`).join("\n"),
					inline: true
				}],
				image: {url: "https://cdn.discordapp.com/attachments/348628563076841472/674706614217080863/5fm9ifqkgzr31.png"}
			} });
		} catch (err) {
			error = err;
			return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: `\`\`\`\n${err}\n\`\`\`` } });
		}
	}
	amount = parseFloat(parseFloat(amount).toFixed(2));
	currency = currency.toUpperCase();

	let account = await msg.author.account();

	if (isNaN(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Syntax error", description: "That's not a number..." } });
	if (account.balance < amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `Insufficient balance! You have ${account.balance} credits.` } });

	console.log(`[Convert] Amount: ${amount} ${typeof amount}, Currency: ${currency}`)
	let newTransaction;
	try {
		newTransaction = await DClient.transactions.create({
			to: currency,
			amount: amount,
			user: msg.author.id,
		});
	} catch (err) {
		error = err;
		return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: `\`\`\`json\n${err}\n\`\`\`` } });
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
