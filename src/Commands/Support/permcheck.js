module.exports = async(client, msg, suffix, guildID) => {
	if (!suffix.split(" ")[1] && !guildID) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: `\`>permcheck [serverID/userID] [userID/serverID]\`` } });
	let member,
		guild,
		userID,
		perm;

	if (guildID) guild = await client.guilds.cache.get(guildID);
	if (!guild) guild = await client.guilds.cache.get(suffix.split(" ")[0]);
	if (!guild) guild = await client.guilds.cache.get(suffix.split(" ")[1]);
	if (!guild || !guild.available) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown guild", description: "Couldn't find a server with that ID." } });

	userID = msg.mentions.users.first() ? msg.mentions.users.first().id : null;
	if (userID) member = await guild.members.cache.get(userID);
	if (!member) member = await guild.members.cache.get(suffix.split(" ")[1]);
	if (!member) member = await guild.members.cache.get(suffix.split(" ")[0]);
	if (!member) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown member", description: "Couldn't find that member within the given server." } });

	perm = member.hasPermission("MANAGE_GUILD");
	if (perm) msg.channel.send({ embed: { color: config.colors.success, title: "True!", description: "This user has sufficient permission." } });
	else msg.channel.send({ embed: { color: config.colors.error, title: "False", description: "This user does not have the required permission." } });
};
