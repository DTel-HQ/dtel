const fs = require("fs");
var accounts = JSON.parse(fs.readFileSync("./json/account.json", "utf8"));
var referrals = JSON.parse(fs.readFileSync("./json/refers.json", "utf8"));
var referreds = JSON.parse(fs.readFileSync("./json/guilds.json", "utf8"));

exports.run = (bot, message, args) => {
	if (args[1] === undefined) {
		if (referrals.indexOf(message.author.id) === -1) {
			referrals.push(message.author.id);
			fs.writeFile("./json/refers.json", JSON.stringify(referrals), "utf8");
			message.reply("You're now enrolled as a referrer.");
		}
		message.channel.send({ embed: {
			color: 3447003,
			title: "DiscordTel Referral Program",
			description: "To expand DiscordTel's services, I invite you to refer new users into DiscordTel.",
			fields: [{
				name: "Oooh, how do I do it?",
				value: `It's easy. Ask server owners you've invited to type \`>refer ${message.author.id}\`.`
			},
			{
				name: "What do I get?",
				value: "For every referral you've invited, 100 credits will be paid to you and your referral."
			},
			{
				name: "Can I cheat?",
				value: "*smug* No, sweetheart. You'll understand why."
			}],
		}});
	} else if (message.guild.owner.id !== message.author.id) {
		message.reply("Only server owners can be referrees.");
	} else if (message.author.id === args[1]) {
		message.reply("You can't refer yourself :b:");
	} else if (referrals.indexOf(args[1]) === -1) {
		message.reply("The referrer you've inputted hasn't enrolled. Ask him/her to type `>refer` (Without any arguments) to enroll.");
	} else if (bot.users.get(args[1]) === undefined) {
		message.reply("DiscordTel can no longer reach the referral. Try someone else.");
	} else if (referreds.yes.indexOf(message.guild.id) === -1 || referreds.no.indexOf(message.guild.id) > -1) {
		message.reply("It seems like DiscordTel is **first** added before the start of the referral program.");
	} else {
		message.reply("Congratulations! 100 credits for you!");
		var account = accounts.find(item => item.user === message.author.id);
		if (account !== undefined) {
			accounts.splice(accounts.indexOf(account), 1);
		} else {
			account = { user: message.author.id, balance: 0 };
		}
		account.balance += 100;
		accounts.push(account);
		bot.users.get(args[1]).send(`Good news! ${message.author.tag} (${message.author.id}) is now your referral! 100 credits for you!`);
		var leaccount = accounts.find(item => item.user === args[1]);
		if (leaccount !== undefined) {
			accounts.splice(accounts.indexOf(leaccount), 1);
		} else {
			leaccount = { user: message.author.id, balance: 0 };
		}
		leaccount.balance += 100;
		accounts.push(leaccount);
		bot.channels.get("282253502779228160").send(`:new: ${message.author.tag} (${message.author.id}) and ${bot.users.get(args[1]).tag} (${args[1]}) claimed 100 credits of referral bonus.`);
		fs.writeFileSync("./json/account.json", JSON.stringify(accounts), "utf8");
	}
};
