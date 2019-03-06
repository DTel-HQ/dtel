module.exports = async(cmd, msg, suffix) => {
	const call = await Calls.find(c => c.to.channel === msg.channel.id || c.from.channel === msg.channel.id);
	if (!call || !call.pickedUp) return;
	call.lastMessage = new Date().getTime();
	await Calls.update(call);

	const perms = await msg.author.getPerms();
	let phone = config.callPhones.default;
	for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];
	let toSend = msg.channel.id === call.from.channel ? call.to.channel : call.from.channel;

	try {
		client.apiSend(`**${msg.author.tag}${toSend === config.supportChannel ? ` (${msg.author.id})` : ""}** ${phone} ${msg.content}`, toSend);
	} catch (e) {
		await Calls.newGet(call.id).delete();
		client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", msg.channel.id);
	}
};
