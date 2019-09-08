const { post } = require("chainfetch");

module.exports = async(client, msg, suffix) => {
	let amount = msg.content.split(" ")[0];
	let currency = msg.content.split(" ")[1];
	if (!amount || !currency) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: ">convert [amount] [currency]" } });
	currency = currency.toUpperCase();

	let account = await r.table("Accounts").get(msg.author.id).default(null);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
		msg.reply(`You don't have an account created...Creating an account for you! Please also read for information on payment: <${config.paymentLink}>`);
	}

	if (account.balance < parseInt(amount)) return msg.reply(`Insufficient balance! You have ${account.balance} credits.`);
	if (isNaN(amount)) return msg.reply("That's not a number!");

	let snekres;
	try {
		snekres = await post("https://discoin.sidetrip.xyz/transaction").set({
			Authorization: require("../../Configuration/auth.js").discoinToken,
			"Content-Type": "application/json",
		}).send({
			user: msg.author.id,
			amount: parseInt(amount),
			exchangeTo: currency,
		});
	} catch (err) {
		if (err.status === 503) {
			return msg.reply("API Error (Downtime?)! Please contact MacDue#4453.");
		}
		switch (err.body.status) {
			case "error": {
				return msg.channel.send({
					embed: {
						color: config.colors.error,
						title: "Error: Wrong arguments!",
						description: "You probably typed something wrong in the command. Correct them and try again.",
						fields: [{
							name: "Reason",
							value: err.body.reason,
						}],
					},
				});
			}
			case "declined": {
				switch (err.body.reason) {
					case "per-user limit exceeded": {
						return msg.channel.send({
							color: config.colors.error,
							title: "Transaction declined!",
							description: "You reached the daily per-user limit.",
							fields: [{
								name: `Daily Per-User Limit to currency ${err.body.currency}`,
								value: `${err.body.limit} Discoins`,
							}],
						});
					}
					case "total limit exceeded": {
						return msg.channel.send({
							embed: {
								color: config.colors.error,
								title: "Transaction declined!",
								description: "You reached the daily per-user limit.",
								fields: [{
									name: `Daily Per-User Limit to currency ${err.body.currency}`,
									value: `${err.body.limit} Discoins`,
								}],
							},
						});
					}
					case "verify required": {
						return msg.channel.send({
							embed: {
								color: config.colors.error,
								title: "Transaction declined!",
								description: "You're not verified. Please verify yourself at http://discoin.sidetrip.xyz/verify.",
							},
						});
					}
					default: {
						return msg.channel.send({
							embed: {
								color: config.colors.error,
								title: "Unexpected Error!",
								description: `\`\`\`${err.body}\`\`\``,
							},
						});
					}
				}
			}
		}
	}
};
