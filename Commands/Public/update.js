const perms = {
	manager: config.managerRole,
	support: config.supportRole,
	donator: config.donatorRole,
	contributor: config.contributorRole,
};

module.exports = async(client, msg, suffix) => {
	if (/help|info/i.test(suffix)) return msg.channel.send({ embed: { color: config.colors.info, description: "Update a user their perms\n`>update [userID]`" } });
	if (!suffix || !msg.author.support) suffix = msg.author.id;

	const id = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix.split(" ")[0];

	const supportGuild = client.guilds.cache.get(config.supportGuild) || await client.guilds.fetch(config.supportGuild)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch HQ server" } }));
	const member = await supportGuild.members.fetch(id)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch member in HQ server" } }));

	let resstr = "";
	for (let perm of suffix.match(/[+-]\w*/g) || []) {
		const permName = perm.slice(1);
		if (!perms[permName]) continue;
		try {
			if (perm.startsWith("+")) {
				await member.roles.add(perms[permName], `Addition requested by ${msg.author.id}`);
				resstr += `✅ ${permName}\n`;
			}	else {
				await member.roles.remove(perms[permName], `Removal requested by ${msg.author.id}`);
				resstr += `❌ ${permName}\n`;
			}
		} catch (e) {
			resstr += `Couldn't ${perm.startsWith("+") ? "add" : "remove"} the ${perm} role`;
		}
	}

	const newPerms = await require("../../Internals/modules").updatePerms(member);
	msg.channel.send({ embed: { author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() }, description: `${resstr}\`\`\`js\n${require("util").inspect(newPerms)}\`\`\`` } });
};
