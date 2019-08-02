module.exports = async(client, msg, suffix, guildID) => {
	if (!suffix) return msg.reply(`YOU FORGOT BOTH PARAMETERS?! It's \`>permcheck ${guildID ? "" : "[guildID] "}[userID]\``);
	if (!suffix.split(" ")[1] && !guildID) return msg.reply(`You forgot a parameter! :facepalm: It's \`>permcheck ${guildID ? "" : "[guildID] "}[userID]\``);

	let member,
		guild,
		userID,
		perm;

	userID = msg.mentions.users.first() ? msg.mentions.users.first().id : guildID ? suffix.split(" ")[0] : suffix.split(" ")[1];
	if (!guildID) guildID = suffix.split(" ")[0];

	guild = await client.guilds.get(guildID);
	if (!guild || !guild.available) return msg.reply("Couldn't find that guild.");

	member = await guild.members.get(userID);
	if (!member) return msg.reply("Couldn't find that user.");

	perm = member.hasPermission("MANAGE_GUILD");
	return msg.reply(perm);
};
