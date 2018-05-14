const { post } = require("snekfetch");
const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, msg, suffix) => {
	let amount = suffix.substring(0, suffix.indexOf(" ")).trim();
	let currency = suffix.substring(suffix.indexOf(" ") + 1).trim().toUpperCase();
	let account;
	try {
		account = await Accounts.findOne({ _id: msg.author.id });
	} catch (err) {
		await Accounts.create(new Accounts({
			_id: msg.author.id,
		}));
	}
	if (account.balance < parseInt(amount)) {
		return msg.reply(`Insufficient balance! You have ${account.balance} credits.`);
	}
	if (isNaN(amount)) {
		return msg.reply("That's not a number!");
	}
	let snekres;
	try {
		snekres = await post("https://discoin.sidetrip.xyz/transaction").set({
			Authorization: process.env.DISCOIN_TOKEN,
			"Content-Type": "application/json",
		}).send({
			user: msg.author.id,
			amount: parseInt(amount),
			exchangeTo: currency,
		});
	} catch (err) {
		if (err.status === 503) {
			return msg.reply("API Error (Downtime?)! Please contact MacDue#4453.");
		} else if (err.body.status === "error") {
			return msg.channel.send({
				embed: {
					color: 0xFF0000,
					title: "Error: Wrong arguments!",
					description: "You probably typed something wrong in the command. Correct them and try again.",
					fields: [{
						name: "Reason",
						value: err.body.reason,
					}],
				},
			});
		} else if (err.body.status === "declined") {
			if (err.body.reason === "per-user limit exceeded") {
				return msg.channel.send({
					color: 0xFF0000,
					title: "Transaction declined!",
					description: "You reached the daily per-user limit.",
					fields: [{
						name: `Daily Per-User Limit to currency ${err.body.currency}`,
						value: `${err.body.limit} Discoins`,
					}],
				});
			} else if (err.body.reason === "total limit exceeded") {
				return msg.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Transaction declined!",
						description: "You reached the daily per-user limit.",
						fields: [{
							name: `Daily Per-User Limit to currency ${err.body.currency}`,
							value: `${err.body.limit} Discoins`,
						}],
					},
				});
			} else if (err.body.reason === "verify required") {
				return msg.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Transaction declined!",
						description: "You're not verified. Please verify yourself at http://discoin.sidetrip.xyz/verify.",
					},
				});
			} else if (!snekres.body.status === "approved") {
				return msg.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Unexpected Error!",
						description: `\`\`\`${err.body}\`\`\``,
					},
				});
			}
		}
	}
	msg.channel.send({
		embed: {
			color: 0x32CD32,
			title: "Success!",
			description: "Please keep this receipt.",
			fields: [{
				name: "Amount",
				value: `${amount} DTS **=>** ${snekres.body.resultAmount} ${currency}`,
			},
			{
				name: "Receipt ID",
				value: snekres.body.receipt,
			},
			{
				name: `Daily Per-User Limit left for currency ${currency}`,
				value: `${snekres.body.limitNow} Discoins`,
			}],
		},
	});
	account.balance -= parseInt(amount);
	await account.save();
	await client.apiSend(`:repeat: User ${msg.author.tag} requested a Discoin transaction of ¥${amount}`, process.env.LOGSCHANNEL);
};
