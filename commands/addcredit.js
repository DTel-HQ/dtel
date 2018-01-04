// REWRITTEN
module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.has(user_id);
	let userid = args.substring(0, args.indexOf(" ")).trim();
	let amount = args.substring(args.indexOf(" ") + 1).trim();
	if (!support(message.author.id)) {
		return message.reply("Stealing money from the bank?");
	}
	if (!userid || !amount) {
		return message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");
	}
	let user;
	try {
		user = bot.users.get(userid);
	} catch (err) {
		return message.reply("Unreachable/Non-existent user. `>addcredit <User_ID> <Credit>`");
	}
	if (userid === "377609965554237453") {
		return message.reply("Uh... I am the bank. Are you in debt?");
	}
	if (user.bot) {
		return message.reply("**ARE YOU SURE THAT BOTS ARE HUMAN?** <:Monocle:366036726449438731>");
	}
	if (userid === message.author.id && !bot.guilds.get("281815661317980160").members.get(message.author.id).roles.find("name", "Boss")) {
		return message.reply("**YOU CAN'T ADD CREDITS TO YOURSELF**, BEANIE! <:xd:359369769327132682>");
	}
	if (support(userid)) {
		return message.reply("**NOPE, NOT TODAY!** <:mmLol:356831697385422848>");
	}
	if (isNaN(amount)) {
		return message.reply("**ARE YOU SURE ABOUT THAT?** I'M NOT LETTING YOU BREAK THE ECONOMY! <:BusThinking:341628019472990209>");
	}
	let account;
	try {
		account = await Accounts.findOne({ _id: userid });
		if (!account) throw new Error();
	} catch (err) {
		account = await Accounts.create(new Accounts({ _id: message.author.id, balance: 0 }));
	}
	account.balance += amount;
	await account.save();
	message.reply("Done.");
	bot.users.get(userid).send(`:money_with_wings: A support member has added ¥${amount} into your account. You now have ¥${account.balance}.`);
	bot.channels.get("282253502779228160").send(`:money_with_wings: Support member ${message.author.username} added ¥${amount} to <@${userid}>.`);
};
