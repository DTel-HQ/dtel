module.exports = async(client, msg, suffix) => {
	if (!/^\S{1,4}$/.test(suffix)) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Usage: `>prefix [prefix]`\nNotice that the prefix has to be between 1 and 4 characters.", footer: { text: "To remove your prefix: >prefix >" } } });

	// to get rid of prefix
	if (/^>$/.test(suffix)) suffix = null;

	// get / make account
	let account = await r.table("Accounts").get(msg.author.id);
	if (!account) {
		if (suffix) account = { id: msg.author.id, balance: 0, prefix: suffix };
		else account = { id: msg.author.id, balance: 0 };
		await r.table("Accounts").insert(account);
	} else if (suffix) {
		await r.table("Accounts").get(msg.author.id).update({ prefix: suffix });
	} else {
		delete account.prefix;
		await r.table("Accounts").get(msg.author.id).replace(account);
	}

	if (suffix) return msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: `Your custom prefix is now \`${suffix}\`. You can still use \`${config.prefix}\`.`, footer: { text: `To get rid of your prefix, simply do >prefix ${config.prefix}` } } });
	else return msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: "Your custom prefix has been removed." } });
};
