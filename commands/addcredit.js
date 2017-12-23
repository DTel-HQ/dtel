const fs = require("fs");
const accounts = JSON.parse(fs.readFileSync("././account.json", "utf8"));

module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.map(member => member.id).indexOf(user_id) > -1;
	if (!support(message.author.id)) {
		message.reply("Stealing money from the bank?");
		return;
	}
	if (args[1] === undefined || args[2] === undefined) {
		message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO constIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");
		return;
	}
	if (bot.users.get(message.content.split(" ")[1]) === undefined) {
		message.reply("Unreachable/Non-existent user. `>addcredit <User_ID> <Credit>`");
		return;
	}
	if (bot.users.get(message.content.split(" ")[1]).bot) {
		message.reply("**ARE YOU SURE THAT BOTS ARE HUMAN?** <:Monocle:366036726449438731>");
		return;
	}
	if (bot.users.get(message.content.split(" ")[1]).id === message.author.id && !bot.guilds.get("281815661317980160").members.get(message.author.id).roles.find("name", "Boss")) {
		message.reply("**YOU CAN'T ADD CREDITS TO YOURSELF**, BEANIE! <:xd:359369769327132682>");
		return;
	}
	if (support(message.content.split(" ")[1])) {
		message.reply("**NOPE, NOT TODAY!** <:mmLol:356831697385422848>");
		return;
	}
	if (isNaN(message.content.split(" ")[2]) && !bot.guilds.get("281815661317980160").members.get(message.author.id).roles.find("name", "Boss")) {
		message.reply("**ARE YOU SURE ABOUT THAT?** I'M NOT LETTING YOU BREAK THE ECONOMY! <:BusThinking:341628019472990209>");
		return;
	}
	let leaccount = accounts.find(item => item.user === message.content.split(" ")[1]);
	if (leaccount === undefined) {
		leaccount = { user: message.content.split(" ")[1], balance: parseInt(message.content.split(" ")[2]) };
		accounts.push(leaccount);
	} else {
		accounts.splice(accounts.indexOf(leaccount), 1);
		leaccount.balance += parseInt(message.content.split(" ")[2]);
		accounts.push(leaccount);
	}
	fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
	message.reply("Done.");
	bot.users.get(leaccount.user).send(`:money_with_wings: A support member has added ¥${message.content.split(" ")[2]} into your account. You now have ¥${leaccount.balance}.`);
	bot.channels.get("282253502779228160").send(`:money_with_wings: Support member ${message.author.username} added ¥${message.content.split(" ")[2]} to <@${leaccount.user}>.`);
};
