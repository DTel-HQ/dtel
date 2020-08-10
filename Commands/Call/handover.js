module.exports = async(client, msg, suffix, call) => {
	if (!msg.channel.id === config.supportChannel) return;
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Handover usage", description: "`>ho [userID/mention] [reason]`" } });

	let user = msg.mentions.users.first();
	if (!user) user = suffix.split(" ")[0];
	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Couldn't find a user" } });
	let reason = suffix.split(" ").slice(1).join(" ");

	const perms = client.supportChannelPerms;
	perms.set(user.id || user, { id: user.id || user, allow: ["SEND_MESSAGES"] });
	msg.channel.overwritePermissions(perms,	reason || `Handover by ${msg.author.tag} (${msg.author.id})`);

	msg.channel.send({ embed: { color: config.colors.info, title: `Handed over to ${user.username || user}` } });
};
