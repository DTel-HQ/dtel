const { post } = require("chainfetch");

module.exports = async(client, msg, suffix) => {
	let amount = msg.content.split(" ")[0];
	let currency = msg.content.split(" ")[1];
	if (!amount || !currency) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">convert [amount] [currency]" } });
	currency = currency.toUpperCase();

	let account = await msg.author.account;

	if (account.balance < parseInt(amount)) return msg.channel.send({ embed: { color: config.colors.error, title: "Payment error", description: `Insufficient balance! You have ${account.balance} credits.` } });
	if (isNaN(parseInt(amount))) return msg.channel.send({ embed: { color: config.colors.error, title: "Syntax error", description: "That's not a number..." } });

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
			return msg.channel.send({ embed: { color: config.colors.error, title: "API error", description: "API Error (Downtime?)! Please contact MacDue#4453." } });
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
