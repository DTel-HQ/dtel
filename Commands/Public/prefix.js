module.exports = async(client, msg, suffix) => {
	if (!/^\S{1,4}$/.test(suffix)) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Usage: `>prefix [prefix]`\nNotice that the prefix has to be between 1 and 4 characters.", footer: { text: `To remove your prefix: >prefix ${config.prefix}` } } });

	// to get rid of prefix
	if (suffix === config.prefix) suffix = null;

	// get / make account
	let account = await msg.author.account;

	if (suffix) {
		await r.table("Accounts").get(msg.author.id).update({ prefix: suffix });
	} else {
		delete account.prefix;
		await r.table("Accounts").get(msg.author.id).replace(account);
	}

	if (suffix) return msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: `Your custom prefix is now \`${suffix}\`. You can still use \`${config.prefix}\`.`, footer: { text: `To get rid of your prefix, simply do >prefix ${config.prefix}` } } });
	else return msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: "Your custom prefix has been removed." } });
};
