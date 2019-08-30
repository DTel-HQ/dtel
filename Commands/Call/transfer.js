const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix, call) => {
	// Check arguments
	if (!suffix) return msg.reply(":facepalm: You didn't give a number to transfer to.");
	if (["*411", "*233"].includes(suffix)) return msg.reply(":x: You can't transfer to this number.");
	if (config.aliasNumbers[suffix]) suffix = config.aliasNumbers[suffix];

	// Check if they're able to transfer
	if ((call.to.number === "08006113835" || call.from.number === "08006113835") && msg.channel.id != config.supportChannel) return;
	if (!call.pickedUp) return msg.reply(":x: You can't transfer a call before it has been picked up.");

	// A lot more checks
	const toDial = await client.replaceNumber(suffix);
	const toDialDoc = await r.table("Numbers").get(toDial);
	if (!toDialDoc) return msg.reply(":x: that number could not be found.");
	if (toDialDoc.channel === msg.channel.id) return msg.reply(":x: Why are you trying to transfer them to yourself? :thonk:");
	if (toDialDoc.channel === call.to.channel || toDialDoc.channel === call.from.channel) return msg.reply(":x: Trying to make them call themselves?!");
	if (toDialDoc.blocked && toDialDoc.blocked.includes(msg.channel.id == call.from.channel ? call.to.number : call.from.number)) return msg.reply(":x: The other side couldn't be transferred to that number.");
	if (new Date(toDialDoc.expiresAt).getTime() < Date.now()) return msg.reply(":x: Unable to transfer: the number you tried transferring to has been expired.");

	// See if we can reach the other channel
	try {
		await client.api.channels(toDialDoc.channel).get();
	} catch (_) {
		msg.reply(":x: Unable to transfer: the number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
		await r.table("Numbers").get(toDialDoc.id).delete();
		await r.table("Phonebook").get(toDialDoc.id).delete();
		await r.table("Mailbox").get(toDialDoc.channel).delete();
		return;
	}

	// See if the other channel is already in a call
	let activeCall = (await r.table("Calls").filter(r.row("from")("number").eq(toDial).or(r.row("to")("number").eq(toDial))))[0];
	if (activeCall) return msg.reply(":x: Unable to transfer: that number is already in a call.");

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
	};
	await r.table("Calls").insert(newCall);

	let fromNumber = await r.table("Numbers").get(newCall.from.number);
	let fromContact = fromNumber.contacts ? (await fromNumber.contacts.filter(c => c.number === toDial))[0] : null;
	let toContact = toDialDoc.contacts ? (await toDialDoc.contacts.filter(c => c.number === fromNumber.id))[0] : null;
	let fromNumbervip = fromNumber.vip ? new Date(fromNumber.vip.expiry).getTime() > Date.now() : false;

	client.log(`:arrow_right: Channel \`${fromNumbervip ? fromNumber.vip.hidden ? "hidden" : newCall.from.channel : newCall.from.channel}\` has been transferred to \`${toNumbervip ? newCall.to.hidden ? "hidden" : newCall.to.channel : newCall.to.channel}\` by \`${msg.channel.id}\``);
	await msg.reply(`:arrow_right: You have transferred the other side to \`${toDial}\`.`);
	if (newCall.to.number === "08006113835") client.apiSend(`<@&${config.supportRole}>`, newCall.to.channel);
	await client.apiSend(`:arrow_right: You have been transferred by the other side. Now calling ${newCall.to.number === "08006113835" ? "Customer Support" : toNumbervip ? newCall.to.vip.hidden ? newCall.to.vip.name ? `\`${newCall.to.vip.name}\`` : "Hidden" : newCall.to.vip.name ? `\`${newCall.to.vip.name} (${newCall.to.number})\`` : fromContact ? `:green_book:${fromContact.name}` : `\`${newCall.to.number}\`` : fromContact ? `:green_book:${fromContact.name}` : `\`${newCall.to.number}\``}...`, newCall.from.channel);
	client.apiSend(`${toDialDoc.mentions ? `${toDialDoc.mentions.join(" ")}\n` : ""}There is an incoming call from ${fromNumber.id === "08006113835" ? "Customer Support" : fromNumbervip ? fromNumber.vip.hidden ? fromNumber.vip.name ? `\`${fromNumber.vip.name}\`` : "Hidden" : fromNumber.vip.name ? `\`${fromNumber.vip.name} (${fromNumber.id})\`` : toContact ? `:green_book:${toContact.name}` : `\`${fromNumber.id}\`` : toContact ? `:green_book:${toContact.name}` : `\`${fromNumber.id}\``}. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, newCall.to.channel);

	setTimeout(async() => {
		let callDoc = await r.table("Calls").get(newCall.id);
		if (!callDoc || callDoc.pickedUp) return;

		// Delete old call
		client.apiSend(":x: The other side did not pick up (2 minutes).", newCall.from.channel);
		client.apiSend(":x: You missed the call (2 minutes).", newCall.to.channel);
		client.log(`:telephone: The call between channel ${newCall.from.hidden ? "hidden" : newCall.from.channel} and channel ${newCall.to.hidden ? "hidden" : newCall.to.channel} was not picked up.`);
		await r.table("OldCalls").insert(callDoc);
		await r.table("Calls").get(newCall.id).delete();
	}, 120000);
};
