module.exports = async(client, msg, suffix, call) => {
	if (!msg.channel.id === config.supportChannel) return;
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Allow usage", description: "`>allow [userID/mention] [reason]`" } });

	let user = msg.mentions.users.first();
	if (!user) user = suffix.split(" ")[0];
	let reason = suffix.split(" ").slice(1).join(" ");

	msg.channel.overwritePermissions([
		{ id: user.id || user, allow: ["SEND_MESSAGES"] },
	], reason || `Allow by ${msg.author.tag} (${msg.author.id})`);
	await r.table("Calls").get(call.id).update({ permissions: [...call.permissions, user.id || user] });
};
