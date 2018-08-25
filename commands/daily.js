const { get } = require("snekfetch");

module.exports = async(client, msg, suffix) => {
	let account;
	try {
		account = await Accounts.findOne({ _id: msg.author.id });
		if (!account) throw new Error("Lol you dont have an account");
	} catch (err) {
		account = await Accounts.create(new Accounts({ _id: msg.author.id, balance: 0 }));
		msg.reply("You don't have an account created... Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
	}
	if (account.dailyClaimed) {
		return msg.reply("You already claimed your daily credits!");
	}
	let perms = await client.permCheck(msg.author.id);
	let toGive = 120;
	if (perms.boss) {
		toGive = 300;
	} else if (perms.support) {
		toGive = 200;
	}
	account.balance += toGive;
	account.dailyClaimed = true;
	msg.reply(`Here's your ${toGive} credits!`);
	await account.save();
	await client.apiSend(`:calendar: ${msg.author.tag} (${msg.author.id}) claimed ${toGive} daily credits.`, process.env.LOGSCHANNEL);
};
