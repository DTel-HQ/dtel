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
	let member = await supportGuild.members.fetch(id)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch member in HQ server" } }));

	if (!msg.author.boss) {
		const newPerms = await require("../../internals/modules").updatePerms(member);
		return msg.channel.send({ embed: { author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() }, description: `\`\`\`js\n${require("util").inspect(newPerms)}\`\`\`` } });
	}

	let resstr = "";
	const permsArr = suffix.match(/[+-]\w*/g) || [];
	permsArr.push("end");
	permsArr.forEach(async perm => {
		if (perm === "end") {
			const newPerms = await require("../../internals/modules").updatePerms(member);
			return msg.channel.send({ embed: { author: { name: member.user.tag, icon_url: member.user.displayAvatarURL() }, description: `${resstr}\`\`\`js\n${require("util").inspect(newPerms)}\`\`\`` } });
		} else {
			const permName = perm.slice(1);
			if (!perms[permName]) return;
			try {
				if (perm.startsWith("+")) {
					member = await member.roles.add(perms[permName], `Addition requested by ${msg.author.id}`);
					resstr += `✅ ${permName}\n`;
				}	else {
					member = await member.roles.remove(perms[permName], `Removal requested by ${msg.author.id}`);
					resstr += `❌ ${permName}\n`;
				}
			} catch (e) {
				resstr += `Couldn't ${perm.startsWith("+") ? "add" : "remove"} the ${permName} role`;
			}
		}
	});
};
