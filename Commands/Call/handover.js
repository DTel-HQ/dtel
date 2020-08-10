module.exports = async(client, msg, suffix, call) => {
	if (!msg.channel.id === config.supportChannel) return;
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Handover usage", description: "`>ho [userID/mention] [reason]`" } });

	let user = msg.mentions.users.first();
	if (!user) user = suffix.split(" ")[0];
	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Couldn't find a user" } });
	let reason = suffix.split(" ").slice(1).join(" ");

	const perms = JSON.parse(JSON.stringify(client.supportChannelPerms));
	perms.push({ id: user.id || user, allow: ["SEND_MESSAGES"] }, { id: config.supportRole, deny: ["SEND_MESSAGES"], allow: ["VIEW_CHANNEL"] });
	msg.channel.overwritePermissions(perms,	reason || `Handover by ${msg.author.tag} (${msg.author.id})`);

	msg.channel.send({ embed: { color: config.colors.info, title: `Handed over to ${user.username || user}` } });
};
