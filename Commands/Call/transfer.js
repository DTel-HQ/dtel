const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix, call) => {
	// Check arguments
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: "You didn't give a number to transfer to... `>transfer [number]`" } });
	if (["*611", "*411", "*233"].includes(suffix)) return msg.channel.send({ embed: { color: config.colors.error, title: "That'd break the bot...", description: "You can't transfer to this number." } });
	if (config.aliasNumbers[suffix]) suffix = config.aliasNumbers[suffix];

	// Check if they're able to transfer
	if ((call.to.number === config.supportNumber || call.from.number === config.supportNumber) && msg.channel.id != config.supportChannel) return;
	if (!call.pickedUp) return msg.channel.send({ embed: { color: config.colors.error, title: "Please wait", description: "You can't transfer a call before it has been picked up!" } });

	// A lot more checks
	const toDial = await client.replaceNumber(suffix);
	const toDialDoc = await r.table("Numbers").get(toDial);
	if (!toDialDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown number", description: "Couldn't find that number." } });
	if (toDialDoc.channel === msg.channel.id) return msg.channel.send({ embed: { color: config.colors.error, title: "???", description: "Why are you trying to transfer them to yourself?" } });
	if (toDialDoc.channel === call.to.channel || toDialDoc.channel === call.from.channel) return msg.channel.send({ embed: { color: config.colors.error, title: "???", description: "Making them call themselves...?" } });
	if (toDialDoc.blocked && toDialDoc.blocked.includes(msg.channel.id == call.from.channel ? call.to.number : call.from.number)) return msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "We were unable to transfer the other side to that number." } });
	if (new Date(toDialDoc.expiresAt).getTime() < Date.now()) return msg.channel.send({ embed: { color: config.colors.error, title: "Expired", description: "The number you are trying to reach has expired. Please ask them to renew it." } });

	// See if we can reach the other channel
	try {
		await client.api.channels(toDialDoc.channel).get();
	} catch (_) {
		msg.channel.send({ embed: { color: config.colors.error, title: "Unavailable", description: "Unable to transfer: the number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server." } });
		return client.delete(toDialDoc.id, { force: false, log: true, origin: "transfer_to" });
	}

	// See if the other channel is already in a call
	let activeCall = await r.table("Calls").getAll(toDialDoc.channel, { index: "fromChannel" }).nth(0).default(null);
	if (!activeCall) activeCall = await r.table("Calls").getAll(toDialDoc.channel, { index: "toChannel" }).nth(0).default(null);
	if (activeCall) return msg.channel.send({ embed: { color: config.colors.error, title: "Busy line", description: "That number is already in a call." } });

	// All checks returned well, delete current call.
	await r.table("Calls").get(call.id).delete();

	let fromDoc = msg.channel.id == call.from.channel ? call.to : call.from;
	let toNumbervip = toDialDoc.vip ? new Date(toDialDoc.vip.expiry).getTime() > Date.now() : false;

	// Create the transferred call.
	let newCall = {
		id: uuidv4(),
		transferredBy: msg.channel.id,
		from: {
			channel: fromDoc.channel,
			number: fromDoc.number,
			hidden: fromDoc.hidden,
			name: fromDoc.name,
		},
		to: {
			channel: toDialDoc.channel,
			number: toDialDoc.id,
			hidden: toNumbervip ? toDialDoc.vip.hidden : false,
			name: toNumbervip ? toDialDoc.vip.hidden : false,
		},
		startedAt: new Date(),
		startedBy: call.startedBy,
	};
	await r.table("Calls").insert(newCall);

	let fromNumber = await r.table("Numbers").get(newCall.from.number);
	let fromContact = fromNumber.contacts ? (await fromNumber.contacts.filter(c => c.number === toDial))[0] : null;
	let toContact = toDialDoc.contacts ? (await toDialDoc.contacts.filter(c => c.number === fromNumber.id))[0] : null;
	let fromNumbervip = fromNumber.vip ? new Date(fromNumber.vip.expiry).getTime() > Date.now() : false;

	client.log(`:arrow_right: Channel \`${fromNumbervip ? fromNumber.vip.hidden ? "hidden" : newCall.from.channel : newCall.from.channel}\` has been transferred to \`${toNumbervip ? newCall.to.hidden ? "hidden" : newCall.to.channel : newCall.to.channel}\` by \`${msg.channel.id}\``);
	await msg.channel.send({ embed: { color: config.colors.success, title: "Transferring...", description: `You have transferred the other side to \`${toDial}\`.\nThis call has ended.`, footer: { text: call.id } } });
	if (newCall.to.number === config.supportNumber) client.apiSend(`<@&${config.supportRole}>`, newCall.to.channel);
	await client.apiSend({ embed: { color: config.colors.info, title: "You're being transferred...", description: `You have been transferred by the other side. Now dialing ${newCall.to.number === config.supportNumber ? "Customer Support" : toNumbervip ? newCall.to.hidden ? newCall.vip.name ? `\`${newCall.vip.name}\`` : "Hidden" : newCall.to.name ? `\`${newCall.to.name} (${newCall.to.number})\`` : fromContact ? `:green_book:${fromContact.name}` : `\`${newCall.to.number}\`` : fromContact ? `:green_book:${fromContact.name}` : `\`${newCall.to.number}\``}...`, footer: { text: `old: ${call.id}, new: ${newCall.id}` } } }, newCall.from.channel);
	client.apiSend({ content: toDialDoc.mentions ? `${toDialDoc.mentions.join(" ")}\n` : "", embed: { color: config.colors.info, title: "Incoming call", description: `There is an incoming call from ${fromNumber.id === config.supportNumber ? "Customer Support" : fromNumbervip ? fromNumber.vip.hidden ? fromNumber.vip.name ? `\`${fromNumber.vip.name}\`` : "Hidden" : fromNumber.vip.name ? `\`${fromNumber.vip.name} (${fromNumber.id})\`` : toContact ? `:green_book:${toContact.name}` : `\`${fromNumber.id}\`` : toContact ? `:green_book:${toContact.name}` : `\`${fromNumber.id}\``}. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, footer: { text: newCall.id } } }, newCall.to.channel);

	setTimeout(async() => {
		let callDoc = await r.table("Calls").get(newCall.id);
		if (!callDoc || callDoc.pickedUp) return;

		// Delete old call
		client.apiSend({ embed: { color: config.colors.error, title: "Call expired", description: "The other side did not pick up. (2 minutes)", footer: { text: newCall.id } } }, newCall.from.channel);
		client.apiSend({ embed: { color: config.colors.error, title: "Call expired", description: "You missed the call. (2 minutes)", footer: { text: newCall.id } } }, newCall.to.channel);
		client.log(`:telephone: The call between channel ${newCall.from.hidden ? "hidden" : newCall.from.channel} and channel ${newCall.to.hidden ? "hidden" : newCall.to.channel} was not picked up.`);
		await r.table("OldCalls").insert(callDoc);
		await r.table("Calls").get(newCall.id).delete();
	}, 120000);
};
