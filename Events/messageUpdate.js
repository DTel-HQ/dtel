module.exports = async(omsg, nmsg) => {
	if (nmsg.author.bot) return;
	const call = await (await r.table("Calls").filter(r.row("from")("channel").eq(nmsg.channel.id).or(r.row("to")("channel").eq(nmsg.channel.id))))[0];
	if (!call || !call.pickedUp || call.onHold || !nmsg.content) return;

	let perms = await nmsg.author.getPerms();

	// Get the channel to edit in
	let editChannel = call.to.channel === nmsg.channel.id ? call.from.channel : call.to.channel;
	try {
		await client.api.channels(editChannel).get();
	} catch (_) {
		r.table("Numbers").get(nmsg.channel.id === call.from.channel ? call.to.number : call.from.number).delete();
		r.table("Phonebook").get(nmsg.channel.id === call.from.channel ? call.to.number : call.from.number).delete();
		r.table("Mailbox").get(editChannel).delete();
		r.table("OldCalls").insert(call);
		r.table("Calls").get(call.id).delete();
		return client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", nmsg.channel.id);
	}

	// Get the message to edit
	let message = call.messages.find(m => m.umsg === omsg.id);
	if (!message) return;

	let phone = config.callPhones.default;
	for (let perm in config.callPhones) if (perms[perm]) phone = config.callPhones[perm];

	let toSend = `**${nmsg.author.tag}${call.to.channel === nmsg.channel.id ? call.from.channel : call.to.channel === config.supportChannel ? `(${nmsg.author.id})` : ""}** ${phone} ${nmsg.content}`;
	let edited = await client.apiEdit(toSend, editChannel, message.dtelmsg);
	if (!edited.id) {
		await client.apiSend(`[EDITED]: ${toSend}`, editChannel);
	}
};
