module.exports = async(cmd, msg, suffix, call) => {
	if (!call.pickedUp || call.onhold || !msg.content) return;
	call.lastMessage = new Date().getTime();
	await r.table("Calls").get(call.id).update(call);

	const perms = await msg.author.getPerms();
	let phone = config.callPhones.default;
	for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];
	let toSend = msg.channel.id === call.from.channel ? call.to.channel : call.from.channel;

	try {
		await client.api.channels(toSend).get();
	} catch (_) {
		client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", msg.channel.id);
		await r.table("OldCalls").insert(call);
		await r.table("Calls").get(call.id).delete();
		return client.delete(msg.channel.id === call.from.channel ? call.to.number : call.from.number);
	}

	// Send msg, hidden?
	let hidden = call.from.channel == msg.channel.id ? call.from.hidden : call.to.hidden;
	let sent = await client.apiSend(`**${toSend == config.supportChannel ? msg.author.tag : hidden ? "Anonymous" : msg.author.tag}${toSend === config.supportChannel ? `(${msg.author.id})` : ""}** ${phone} ${msg.content}`, toSend);

	let msgDoc = {
		dtelmsg: sent.id,
		umsg: msg.id,
		user: msg.author.id,
		time: msg.createdTimestamp,
	};
	call.messages ? call.messages.push(msgDoc) : call.messages = [msgDoc];
	await r.table("Calls").get(call.id).update(call);
};
