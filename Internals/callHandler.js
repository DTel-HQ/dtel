module.exports = async(cmd, msg, suffix) => {
	const call = await Calls.find(c => c.to.channel === msg.channel.id || c.from.channel === msg.channel.id);
	if (!call || !call.pickedUp || call.onhold || !msg.content) return;
	call.lastMessage = new Date().getTime();
	await Calls.update(call);

	const perms = await msg.author.getPerms();
	let phone = config.callPhones.default;
	for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];
	let toSend = msg.channel.id === call.from.channel ? call.to.channel : call.from.channel;

	try {
		await client.api.channels(toSend).get();
	} catch (_) {
		await r.table("Numbers").get(msg.channel.id === call.from.channel ? call.to.number : call.from.number).delete();
		await r.table("Phonebook").get(msg.channel.id === call.from.channel ? call.to.number : call.from.number).delete();
		await r.table("Mailbox").get(msg.channel.id === call.from.channel ? call.to.channel : call.from.channel).delete();
		await r.table("OldCalls").insert(call);
		await Calls.newGet(call.id).delete();
		return client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", msg.channel.id);
	}

	let sent = await client.apiSend(`**${msg.author.tag}${toSend === config.supportChannel ? `(${msg.author.id})` : ""}** ${phone} ${msg.content}`, toSend);

	let msgDoc = {
		dtelmsg: sent.id,
		umsg: msg.id,
		user: msg.author.id,
		time: msg.createdTimestamp,
	};
	call.messages ? call.messages.push(msgDoc) : call.messages = [msgDoc];
	await Calls.update(call);
};
