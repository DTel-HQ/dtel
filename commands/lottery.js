const permCheck = require("../modules/permChecker");
const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, msg, suffix) => {
	let perms = permCheck(client, msg.author.id);
	let account;
	try {
		account = await Accounts.findOne({ _id: msg.author.id });
		if (!account) throw new Error();
	} catch (err) {
		msg.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		account = await Accounts.create(new Accounts({
			_id: msg.author.id,
		}));
	}
	let activeLottery;
	try {
		activeLottery = await Lottery.findOne({ active: true });
		if (!activeLottery) throw new Error();
	} catch (err) {
		return msg.reply("There doesn't seem to be an active lottery right now, please try again later.");
	}
	if (!suffix && activeLottery) {
		let userentries = activeLottery.entries.filter(e => e === msg.author.id);
		return msg.reply(`You have ${userentries.count} entries. The current jackpot is ¥${activeLottery.jackpot}.\nTo enter type: \`>lottery <Amount of entries>\`. 1 entry costs 5 credits.`);
	} else if (isNaN(parseInt(suffix))) {
		return msg.reply("Not a number!\n`>lottery <Amount of entries>`. 1 Entry costs 5 credits.");
	}
	let toBuy = parseInt(suffix);
	if (account.balance < toBuy * 5) {
		return msg.reply("Insufficient funds! 1 Entry costs 5 credits.");
	}
	account.balance -= toBuy * 5;
	await account.save();
	for (let i = 0; i < toBuy; i++) activeLottery.entries.push(msg.author.id);
	activeLottery.jackpot += toBuy * 5;
	await activeLottery.save();
	msg.reply(`You've bought ${toBuy} entries. The current jackpot is ¥${activeLottery.jackpot}.`);
	client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content: `:tickets: User **${msg.author.tag}** paid ¥${toBuy * 5} for the lottery. The they now have ¥${account.balance}.`,
	}));
};
