const perms = {
	manager: config.managerRole,
	support: config.supportRole,
	donator: config.donatorRole,
	contributor: config.contributorRole,
};

module.exports = async(client, msg, suffix) => {
	if (suffix === "info") return msg.channel.send({ embed: { color: config.colors.info, description: "update a user their perms\n`>update [userID]`" } });
	if (!msg.author.support) suffix = msg.author.id;

	const id = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix.split(" ")[0];

	const supportGuild = client.guilds.cache.get(config.supportGuild) || await client.guilds.fetch(config.supportGuild)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch HQ server" } }));
	const member = await supportGuild.members.fetch(suffix)
		.catch(e => msg.channel.send({ embed: { color: config.colors.error, description: "Couldn't fetch member in HQ server" } }));

	let resstr = "";
	for (let perm of suffix.match(/[+-]\w*/g)) {
		const permName = perm.slice(1);
		if (!perms[permName]) continue;
		try {
			if (perm.startsWith("+")) {
				member.roles.add(perms[permName], `Addition requested by ${msg.author.id}`);
				resstr += `✅ ${permName}\n`;
			}	else {
				member.roles.remove(perms[permName], `Removal requested by ${msg.author.id}`);
				resstr += `❌ ${permName}\n`;
			}
		} catch (e) {
			resstr += `Couldn't ${perm.startsWith("+") ? "add" : "remove"} the ${perm} role`;
		}
	}
	if (resstr.length) resstr += "\n";

	const newPerms = await require("../../Internals/modules").updatePerms(member);
	msg.channel.send({ embed: { description: `resstr\`\`\`js\n${require("util").inspect(newPerms)}\`\`\`` } });
};
