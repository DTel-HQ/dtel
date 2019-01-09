module.exports = async(client, msg, suffix, guildID) => {
	let perms = await msg.author.getPerms();
	if (!perms.support) return;

	if (!suffix) return msg.reply(`YOU FORGOT BOTH PARAMETERS?! It's \`>permcheck ${guildID ? "" : "[guildID] "}[userID]\``);
	let member,
		guild,
		userID,
		perm;

	userID = msg.mentions.users.first() ? msg.mentions.users.first().id : guildID ? suffix.split(" ")[0] : suffix.split(" ")[1];
	if (!guildID) guildID = suffix.split(" ")[0];

	guild = await client.guilds.get(guildID);
	if (!guild || !guild.available) return msg.reply("Couldn't find that guild");

	member = await guild.members.get(userID);
	if (!member) return msg.reply("Couldn't find that member");

	perm = member.hasPermission("MANAGE_GUILD");
	return msg.reply(perm);
};
