const fs = require("fs");
const accounts = JSON.parse(fs.readFileSync("../json/account.json", "utf8"));
const request = require("request");
const Discord = require("discord.js");

module.exports = async(bot, message, args) => {
	let account = accounts.find(item => item.user === message.author.id);
	if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
		message.reply("`>convert <amount> <currency code>`\nCurrency codes have a length of 3 letters. They are available at <http://discoin.sidetrip.xyz/rates>.");
		return;
	}
	if (account === undefined) {
		account = { user: message.author.id, balance: 0 };
	}
	if (account.balance < parseInt(message.content.split(" ")[1])) {
		message.reply(`Insufficient balance! You have ${account.balance} credits.`);
		return;
	}
	request.post({ url: "http://discoin.sidetrip.xyz/transaction", json: { user: message.author.id, amount: parseInt(message.content.split(" ")[1]), exchangeTo: message.content.split(" ")[2].toUpperCase() }, headers: { Authorization: process.env.DISCOIN_TOKEN } }, (error, response, body) => {
		if (error || response.statusCode === 503) {
			message.reply("API Error (Downtime?)! Please contact MacDue#4453.");
		} else if (body.status === "approved") {
			message.channel.send({ embed: {
				color: 0x32CD32,
				title: "Success!",
				description: "Please keep this receipt.",
				fields: [
					{
						name: "Amount",
						value: `${message.content.split(" ")[1]} DTS **=>** ${body.resultAmount} ${message.content.split(" ")[2].toUpperCase()}`,
					},
					{
						name: "Receipt ID",
						value: body.receipt,
					},
					{
						name: `Daily Per-User Limit left for currency ${message.content.split(" ")[2].toUpperCase()}`,
						value: `${body.limitNow} Discoins`,
					},
				],
			} });
			accounts.splice(accounts.indexOf(account), 1);
			account.balance -= parseInt(message.content.split(" ")[1]);
			accounts.push(account);
			fs.writeFileSync("../json/account.json", JSON.stringify(accounts), "utf8");
			bot.channels.get(process.env.LOGSCHANNEL).send(`:repeat: User ${message.author.username} requested a Discoin transaction of ¥${message.content.split(" ")[1]}.`);
		} else if (body.status === "error") {
			message.channel.send({ embed: {
				color: 0xFF0000,
				title: "Error: Wrong arguments!",
				description: "You probably typed something wrong in the command. Correct them and try again.",
				fields: [
					{
						name: "Reason",
						value: body.reason,
					},
				],
			} });
		} else if (body.status === "declined" && body.reason === "per-user limit exceeded") {
			message.channel.send({ embed: {
				color: 0xFF0000,
				title: "Transaction declined!",
				description: "You reached the daily per-user limit.",
				fields: [
					{
						name: `Daily Per-User Limit to currency ${body.currency}`,
						value: `${body.limit} Discoins`,
					},
				],
			} });
		} else if (body.status === "declined" && body.reason === "total limit exceeded") {
			message.channel.send({ embed: {
				color: 0xFF0000,
				title: "Transaction declined!",
				description: "You reached the daily per-user limit.",
				fields: [
					{
						name: `Daily Per-User Limit to currency ${body.currency}`,
						value: `${body.limit} Discoins`,
					},
				],
			} });
		} else if (body.status === "declined" && body.reason === "verify required") {
			message.channel.send({ embed: {
				color: 0xFF0000,
				title: "Transaction declined!",
				description: "You're not verified. Please verify yourself at http://discoin.sidetrip.xyz/verify.",
			} });
		}
	});
};
