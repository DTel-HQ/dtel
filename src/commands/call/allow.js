module.exports = async(client, msg, suffix, call) => {
	if (!msg.channel.id === config.supportChannel) return;
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Allow usage", description: "`>allow [userID/mention] [reason]`" } });

	let user = msg.mentions.users.first();
	if (!user) user = suffix.split(" ")[0];
	if (user.id) user = user.id;

	if (!msg.channel.members.get(user)) return msg.channel.send({ embed: { color: config.colors.error, title: "Couldn't find that CS member" } });
	let reason = suffix.split(" ").slice(1).join(" ");

	const perms = msg.channel.permissionOverwrites;
	perms.set(user, { id: user, allow: ["SEND_MESSAGES"] });
	msg.channel.overwritePermissions(perms, reason || `Allow by ${msg.author.tag} (${msg.author.id})`);
	msg.channel.send({ embed: { color: config.colors.info, title: `Allowed ${user.username || user}` } });
};
