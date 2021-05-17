const Discoin = require("@discoin/scambio").default;

module.exports = async(client, msg, suffix) => {
	const DClient = new Discoin(require("../../configuration/auth.js").discoinToken, ["DTS"]);
	let error;
	let amount = suffix.split(" ")[0];
	let currency = suffix.split(" ")[1];

	const emojis = client.guilds.cache.get("347859709711089674").emojis.cache;

	let currencies, dts;
	try {
		currencies = await Discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC");
		dts = currencies.find(c => c.id === "DTS");
	} catch (err) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: `Discoin seems to be down. \n\`\`\`\n${err}\n\`\`\`` } });
	}

	if (!amount || !currency) {
		currencies.splice(currencies.indexOf(dts), 1);
		const content = { embed: {
			color: config.colors.info,
			title: "Command usage",
			description: `\`>convert [amount] [3-letter currency code]\`\nSee the [docs](${config.discoinLink}) or \`>dial 0800DISCOIN\` for info.\n\n${config.dtsEmoji}1 = ${client.format(dts.value)} D$`,
			fields: [],
		} };
		currencies.forEach(curr => {
			let emoji = emojis.find(e => e.name === curr.id).toString();
			content.embed.fields.push({ name: `${emoji} ${curr.id} @ ${client.format(curr.value)} D$`, value: `1 ${dts.id} = ${client.format(Math.round((dts.value / curr.value) * 100) / 100)} [${curr.id}](https://dash.discoin.zws.im/#/currencies/${curr.id}/show "${curr.name}")`, inline: true });
		});
		return msg.channel.send(content);
	}

	amount = parseFloat(parseFloat(amount).toFixed(2));
	currency = currency.toUpperCase();

	let account = await msg.author.account();

	if (isNaN(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Syntax error", description: "That's not a number..." } });
	if (currency === "DTS") return msg.channel.send({ embed: { color: config.colors.error, title: "What are you trying?", description: "You can't convert DTS into DTS...", footer: "Use `>convert` to check Discoin's currencies." } });
	if (!currencies.find(c => c.id === currency)) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid currency", description: "That currency does not exist...", footer: "Use `>convert` to check Discoin's currencies." } });
	if (account.balance < amount) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `Insufficient balance! You have ${account.balance} credits.` } });

	const emoji = emojis.find(e => e.name === currency).toString();

	let newTransaction;
	try {
		newTransaction = await DClient.transactions.create({
			from: "DTS",
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
				description: `Succesfully converted <:DTS:668551813317787659>${client.format(amount)} into ${emoji}${client.format(newTransaction.payout)}. You may track your transaction [here](https://dash.discoin.zws.im/#/transactions/${newTransaction.id}/show).`,
				author: {
					name: msg.author.tag,
					icon_url: msg.author.displayAvatarURL(),
				},
				timestamp: new Date(),
			};
			msg.channel.send({ embed: embed });
			client.log(`<:Discoin:357656754642747403> \`${msg.author.username}\` converted <:DTS:668551813317787659>${client.format(amount)} into ${emoji}${client.format(newTransaction.payout)} using Discoin.`);
		}
	}
};
