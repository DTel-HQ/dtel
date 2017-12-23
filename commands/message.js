const randtoken = require("rand-token"),
	fs = require("fs");
var mailbox_storage = JSON.parse(fs.readFileSync("../json/mailbox.json", "utf8")),
	numbers = JSON.parse(fs.readFileSync("../json/numbers.json", "utf8")),
	accounts = JSON.parse(fs.readFileSync("../json/account.json", "utf8"));

exports.run = (bot, message, args) => {
	if (args.length !== 3) {
		message.reply("Correct usage: `>message <Number> <Content>`. 1 message costs 2 credits. Receiving messages is free by using `>mailbox messages`.");
		return;
	}
	var account = accounts.find(item => item.user === message.author.id);
	if (account === undefined) {
		account = { user: message.author.id, balance: 0 };
		accounts.push(account);
		bot.users.get(message.author.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
	}
	if (account.balance < 2) {
		message.reply("Insufficient fund! 1 message costs 2 credits.");
		return;
	}
	accounts.splice(accounts.indexOf(account), 1);
	account.balance -= 2;
	accounts.push(account);
	fs.writeFile("../json/account.json", JSON.stringify(accounts), "utf8");
	var mailbox = mailbox_storage.find(a => a.channel === numbers.find(a => a.number === args[1]).channel);
	mailbox.messages.push({
		id: randtoken.generate(8),
		from: numbers.find(a => a.channel === message.channel.id).number,
		message: message.content.replace(`>message ${args[1]} `, ""),
		callback: true,
	});
	bot.channels.get(mailbox.channel).send(":mailbox_with_mail: New Message!\n*Check it with `>mailbox messages`*");
	mailbox_storage[mailbox_storage.indexOf(mailbox_storage.find(a => a.channel === numbers.find(a => a.number === args[1]).channel))] = mailbox;
	fs.writeFile("../json/mailbox.json", JSON.stringify(mailbox_storage), err => {
		message.reply(err ? err : "Your message is successfully sent.");
	});
};
