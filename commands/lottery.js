const fs = require("fs");
const accounts = JSON.parse(fs.readFileSync("../json/account.json", "utf8"));
var award = JSON.parse(fs.readFileSync("../json/award.json", "utf8"));

module.exports = async(client, message, args) => {
	const support = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	var account = accounts.find(item => item.user === message.author.id);
	if (message.content.split(" ")[1] === undefined) {
		const myentry = award.users.filter(item => item === message.author.id).length;
		message.reply(`You have ${myentry} entries. The current jackpot is ¥${award.amount}.\nTo buy lotteries: \`>lottery <Amount of entries>\`. 1 entry costs 5 credits.`);
		return;
	} else if (isNaN(parseInt(message.content.split(" ")[1]))) {
		message.reply("Not a number!\n`>lottery <Amount of entries>`. 1 Entry costs 5 credits.");
		return;
	} else if (parseInt(message.content.split(" ")[1]) < 0) { message.reply("Get some help."); return; }
	const entries = parseInt(message.content.split(" ")[1]);
	if (account === undefined) {
		account = { user: message.author.id, balance: 0 };
		accounts.push(account);
		client.users.get(message.author.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
	}
	if (account.balance < entries * 5) {
		message.reply("Insufficient fund! 1 Entry costs 5 credits.");
		return;
	}
	accounts.splice(accounts.indexOf(account), 1);
	account.balance -= entries * 5;
	accounts.push(account);
	for (let i = 0; i < entries; i++) {
		award.users.push(message.author.id);
	}
	award.amount += entries * 5;
	fs.writeFileSync("../json/award.json", JSON.stringify(award), "utf8");
	message.reply(`You've bought ${entries} entries. The current jackpot is ¥${award.amount}.`);
	client.channels.get(process.env.LOGSCHANNEL).send(`:tickets: User ${message.author.username} paid ¥${entries * 5} for the lottery. The user now have ¥${account.balance}.`);
};
