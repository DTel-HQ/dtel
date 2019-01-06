module.exports = async(client, msg, suffix) => {
	let user, amount;
	// If they were mentioned
	if (msg.mentions.users.first()) {
		user = msg.mentions.users.first();
		// Genuine offbrand fix
		amount = suffix.substring(suffix.indexOf(`${msg.mentions.members.first().toString()}`) + msg.mentions.members.first().toString().length + 1).trim();
	// otherwise if they used an id
	} else if (/\d{17,19}/.test(suffix.split(" ")[0])) {
		user = await client.users.fetch(suffix.split(" ")[0]).catch(() => null);
		amount = suffix.substring(suffix.indexOf(" ") + 1).trim();
	}

	if (!(await msg.author.getPerms()).support) return msg.reply("Stealing money from the bank?");
	if (!user) return msg.reply("Unreachable/Non-existent user. `>addcredit <User_ID> <Credit>`");
	if (!amount) return msg.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");

	// Check for invalid users
	if (user.id === client.user.id) {
		return msg.reply("Uh... I am the bank. Are you in debt?");
	} else if (user.bot) {
		return msg.reply("**ARE YOU SURE THAT BOTS ARE HUMAN?** <:Monocle:366036726449438731>");
	} else if (user.id === msg.author.id && !(await msg.author.getPerms()).boss) {
		return msg.reply("**YOU CAN'T ADD CREDITS TO YOURSELF**, BEANIE! <:xd:359369769327132682>");
	} else if ((await user.getPerms()).support && !(await msg.author.getPerms()).boss) {
		return msg.reply("You thought we didn't think of that, didn't you! (You can't give to support members)");
	}

	// Check for invalid input
	if (isNaN(amount)) {
		return msg.reply("**ARE YOU SURE ABOUT THAT?** I'M NOT LETTING YOU BREAK THE ECONOMY! <:BusThinking:341628019472990209>");
	} else if (!/^-?\d*$/.test(amount)) {
		return msg.reply("Trying to break the bank, are we?");
	}

	let neg = amount.startsWith("-");
	amount = Number(amount);

	let account = await r.table("Accounts").get(user.id).default(null);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
	}

	account.balance += amount;

	if (account.balance < 0) return msg.reply("Thought we'd let you make someone bankrupt?!");

	await r.table("Accounts").get(user.id).update({ balance: account.balance });
	msg.reply("Done.");

	if (neg) amount = String(amount).substr(1);

	user.send(`:yen: A support member has ${neg ? "removed" : "added"} ¥${amount} ${neg ? "from" : "to"} your account. You now have ¥${account.balance}.`).catch(() => null);
	await client.log(`:yen: Support member **${msg.author.tag}** ${neg ? "removed" : "added"} ¥${amount} ${neg ? "from" : "to"} **${user.tag}** (${user.id}).`);
};