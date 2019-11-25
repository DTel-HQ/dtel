module.exports = async(client, msg, suffix) => {
	if (!/^\S{1,4}$/.test(suffix)) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: `Usage: \`>prefix [prefix]\`\nNote that prefixes are per-user and have to be between 1 and 4 characters.${msg.author.prefix ? `\nYour current prefix: \`msg.author.prefix}\`` : ""}`, footer: { text: `To remove your prefix: >prefix ${config.prefix}` } } });

	// get / make account
	let account = await msg.author.account();

	if (suffix != config.prefix) {
		await r.table("Accounts").get(account.id).update({ prefix: suffix });
	} else {
		delete account.prefix;
		await r.table("Accounts").get(account.id).replace(account);
	}

	if (suffix != config.prefix) return msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: `Your custom (user) prefix is now \`${suffix}\`. You can still use \`${config.prefix}\`.`, footer: { text: `To get rid of your prefix, simply do >prefix ${config.prefix}` } } });
	else return msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: "Your custom (user) prefix has been removed." } });
};
