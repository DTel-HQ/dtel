module.exports = async(client, msg, suffix) => {
	let userid = suffix.substring(0, suffix.indexOf(" ")).trim();
	let amount = suffix.substring(suffix.indexOf(" ") + 1).trim();

	const authorPerms = msg.author.getPerms();

	if (!authorPerms.support) return msg.reply("Stealing money from the bank?");
	if (!userid || !amount) return msg.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");

	const userToGive = await client.user.fetch(userid);
	if (!userToGive) return msg.reply("Unreachable/Non-existent user. `>addcredit <User_ID> <Credit>`");

	if (userid === client.user.id) {
		return msg.reply("Uh... I am the bank. Are you in debt?");
	} else if (userToGive.bot) {
		return msg.reply("**ARE YOU SURE THAT BOTS ARE HUMAN?** <:Monocle:366036726449438731>");
	} else if (userid === msg.author.id && !authorPerms.boss) {
		return msg.reply("**YOU CAN'T ADD CREDITS TO YOURSELF**, BEANIE! <:xd:359369769327132682>");
	} else if (userToGive.getPerms().support) {
		return msg.reply("You thought we didn't think of that, didn't you!");
	}

	if (isNaN(amount)) {
		return msg.reply("**ARE YOU SURE ABOUT THAT?** I'M NOT LETTING YOU BREAK THE ECONOMY! <:BusThinking:341628019472990209>");
	} else if (amount.includes("-")) {
		return msg.reply("Trying to break the bank, are we?");
	}

	r.table("Accounts").get(msg.author.id).update({ balance: r.row("balance") + amount })
		.catch(() => r.table("Accounts").insert({ id: userid, balance: amount }));

	let account = r.table("Accounts").get(msg.author.id);
	msg.reply("Done.");

	(await client.users.fetch(userid)).send(`:money_with_wings: A support member has added ¥${amount} into your account. You now have ¥${account.balance}.`);
	await client.apiSend(`:money_with_wings: Support member **${msg.author.tag}** added ¥${amount} to **${userToGive.tag}** (${userid}).`, config.logsChannel);
};
