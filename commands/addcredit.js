const permCheck = require("../modules/permChecker");
const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args) => {
	let userid = args.substring(0, args.indexOf(" ")).trim();
	let amount = args.substring(args.indexOf(" ") + 1).trim();
	const sperms = await permCheck(client, message.author.id);
	if (!sperms.support) {
		return message.reply("Stealing money from the bank?");
	}
	if (!userid || !amount) {
		return message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");
	}
	let user;
	try {
		user = await client.users.fetch(userid);
	} catch (err) {
		return message.reply("Unreachable/Non-existent user. `>addcredit <User_ID> <Credit>`");
	}
	const perms = await permCheck(client, userid);
	if (userid === client.user.id) {
		return message.reply("Uh... I am the bank. Are you in debt?");
	} else if (message.author.bot) {
		return message.reply("**ARE YOU SURE THAT BOTS ARE HUMAN?** <:Monocle:366036726449438731>");
	} else if (userid === message.author.id && !perms.boss) {
		return message.reply("**YOU CAN'T ADD CREDITS TO YOURSELF**, BEANIE! <:xd:359369769327132682>");
	} else if (perms.support && !perms.boss) {
		return message.reply("**NOPE, NOT TODAY!** <:mmLol:356831697385422848>");
	}
	if (isNaN(amount)) {
		return message.reply("**ARE YOU SURE ABOUT THAT?** I'M NOT LETTING YOU BREAK THE ECONOMY! <:BusThinking:341628019472990209>");
	} else if (amount.includes("-")) {
		message.reply("Trying to break the bank, are we?");
		return message.channel.send(`${process.env.PREFIX}blacklist ${message.author.id}`);
	}
	let account;
	try {
		account = await Accounts.findOne({ _id: userid });
		if (!account) throw new Error();
	} catch (err) {
		account = await Accounts.create(new Accounts({ _id: message.author.id, balance: 0 }));
	}
	account.balance += parseInt(amount);
	await account.save();
	message.reply("Done.");
	await client.users.fetch(userid).send(`:money_with_wings: A support member has added ¥${amount} into your account. You now have ¥${account.balance}.`);
	client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content: `:money_with_wings: Support member **${message.author.tag}** added ¥${amount} to **${user.tag}** (${userid}).`,
	}));
};
