module.exports = async(client, msg, suffix) => {
	let user = msg.mentions.users ? msg.mentions.users.first() : client.users.fetch(suffix.split(" ")[0]);
	let months = suffix.split(" ")[1];
	if (!user || !months || months == 0) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">addvip [user] [months]" } });
	if (!Number(months)) return msg.channel.send({ embed: { color: config.colors.error, title: "Wrong usage", description: "Months needs to be a number" } });

	let account = await r.table("Accounts").get(user.id);
	if (!account) {
		account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
		msg.reply(`They don't have an account created...Creating an account for them!`);
	}

	if (account.vip && account.vip + Number(months) < 0) return msg.channel.send({ embed: { color: config.colors.error, title: "Negative amount of months", description: `Their current amount of months (${account.vip}) plus ${Number(months)} would result in ${account.vip + Number(months)}` } });

	await r.table("Accounts").get(account.id).update({ vip: account.vip ? account.vip + Number(months) : Number(months) });
	client.log(`💠 User ${user.tag} (${user.id}) has purchased and received ${months} VIP Months`);
	msg.channel.send({ embed: { color: config.colors.receipt, title: "Succes", description: `${Number(months) > 0 ? "Added" : "Removed"} \`${Number(months) > 0 ? months : months * -1}\` VIP Months to ${user}(${user.id})`, footer: { text: `Executed by: ${msg.author.id}` } } });
	if (Number(months) > 0) (await user.createDM()).send({ embed: { color: config.colors.receipt, title: "Thanks for your purchase!", description: `You have received \`${months}\` VIP Months.`, footer: { text: `Executed by: ${msg.author.id}` } } }).catch(e => null);
	else (await user.createDM()).send({ embed: { color: config.colors.receipt, title: "VIP Months have been removed", description: `There have been \`${months * -1}\` VIP Months removed from your account.`, footer: { text: `Executed by: ${msg.author.id}` } } }).catch(e => null);
};
