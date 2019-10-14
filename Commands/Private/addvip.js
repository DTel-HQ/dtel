module.exports = async(client, msg, suffix) => {
	let userID = suffix.split(" ")[0];
	let user = msg.mentions.users ? msg.mentions.users.first() : null;
	if (!user) user = await client.users.fetch(userID).catch(e => null);
	let months = suffix.split(" ")[1];
	if (!user || !months || months === 0) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">addvip [user] [months]" } });
	if (!Number(months)) return msg.channel.send({ embed: { color: config.colors.error, title: "Wrong usage", description: "Months needs to be a number" } });

	let account = await user.account();
	let added = Number(months) > 0;

	if (account.vip && account.vip + Number(months) < 0) return msg.channel.send({ embed: { color: config.colors.error, title: "Negative amount of months", description: `Their current amount of months (${account.vip}) plus ${Number(months)} would result in ${account.vip + Number(months)}` } });

	await r.table("Accounts").get(account.id).update({ vip: account.vip ? account.vip + Number(months) : Number(months) });
	client.log(`💠 ${user.tag} (${user.id}) has ${added ? "purchased and received" : "lost"} ${months} VIP months.`);
	msg.channel.send({ embed: { color: config.colors.receipt, title: `${added ? "Added" : "Removed"} VIP Months!`, description: `${added ? "Added" : "Removed"} \`${added ? months : months * -1}\` VIP Months to ${user}(${user.id})`, footer: { text: `${msg.author.id}`, icon_url: msg.author.displayAvatarURL() } } });
	if (added) (await user.createDM()).send({ embed: { color: config.colors.receipt, title: "Thanks for your purchase!", description: `You have received \`${months}\` VIP months.`, footer: { text: `${msg.author.tag}`, icon_url: msg.author.displayAvatarURL() } } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Private DMs", description: "Could not send the user their receipt in DMs." } }));
	else (await user.createDM()).send({ embed: { color: config.colors.receipt, title: "VIP months have been removed", description: `There have been \`${months * -1}\` VIP months removed from your account.`, footer: { text: `${msg.author.tag}`, icon_url: msg.author.displayAvatarURL() } } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Private DMs", description: "Could not send the user their receipt in DMs." } }));
};
