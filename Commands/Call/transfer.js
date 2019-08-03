const uuidv4 = require("uuid/v4");

module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.reply(":facepalm: You didn't give a number to transfer to.");
	if (["*411", "*233"].includes(suffix)) return msg.reply(":x: You can't transfer to this number.");
	if (suffix === "*611") suffix = "08006113835";

	const call = await Calls.find(c => c.to.channel == msg.channel.id || c.from.channel == msg.channel.id);
	if (!call || ((call.to.number === "08006113835" || call.from.number === "08006113835") && msg.channel.id != config.supportChannel)) return;
	if (!call.pickedUp) return msg.reply(":x: You can't transfer a call before it has been picked up.");

	const toDial = await client.replaceNumber(suffix);
	const toDialDoc = await r.table("Numbers").get(toDial);
	if (!toDialDoc) return msg.reply(":x: that number could not be found.");
	if (toDialDoc.channel === msg.channel.id) return msg.reply(":x: Why are you trying to transfer them to yourself? :thonk:");
	if (toDialDoc.channel === call.to.channel || toDialDoc.channel === call.from.channel) return msg.reply(":x: Trying to make them call themselves?!");
	if (toDialDoc.blocked && toDialDoc.blocked.includes(msg.channel.id == call.from.channel ? call.to.number : call.from.number)) return msg.reply(":x: The other side couldn't be transferred to that number.");
	if (new Date(toDialDoc.expiresAt).getTime() < Date.now()) return msg.reply(":x: Unable to transfer: the number you tried transferring to has been expired.");

	try {
		await client.api.channels(toDialDoc.channel).get();
	} catch (_) {
		await r.table("Numbers").get(toDial).delete();
		return msg.reply(":x: Unable to transfer: the number is unavailable to dial. It could be deleted, hidden from the client, or it left the corresponding server. Please dial `*611` for further instructions.");
	}

	let activeCall = await Calls.find(c => c.to.number === toDial || c.from.number === toDial);
	if (activeCall) return msg.reply(":x: Unable to transfer: that number is already in a call.");

	await Calls.newGet(call.id).delete();

	let newFrom = msg.channel.id == call.from.channel ? call.to : call.from;
	let toDialvip = toDialDoc.vip ? new Date(toDialDoc.vip.expiry).getTime() > Date.now() : false;

	await Calls.create({
		id: uuidv4(),
		from: {
			channel: newFrom.channel,
			number: newFrom.number,
			hidden: newFrom.hidden,
			name: newFrom.name,
		},
		to: {
			channel: toDialDoc.channel,
			number: toDialDoc.id,
			hidden: toDialvip ? toDialDoc.vip.hidden : false,
			name: toDialvip ? toDialDoc.vip.hidden : false,
		},
		startedAt: new Date(),
	});

	const newCall = await Calls.find(c => c.to.number === toDial || c.from.number === toDial);
	let myNumber = await r.table("Numbers").get(newCall.from.number);
	let fromContact = myNumber.contacts ? (await myNumber.contacts.filter(c => c.number === toDial))[0] : null;
	let toContact = toDialDoc.contacts ? (await toDialDoc.contacts.filter(c => c.number === myNumber.id))[0] : null;
	let myNumbervip = myNumber.vip ? new Date(myNumber.vip.expiry).getTime() > Date.now() : false;

	await client.log(`:arrow_right: Channel \`${myNumbervip ? myNumber.vip.hidden ? "hidden" : newCall.from.channel : newCall.from.channel}\` has been transferred to ${toDialvip ? newCall.to.hidden ? newCall.to.name ? `\`${newCall.to.name}\`` : "hidden" : newCall.to.name ? `\`${newCall.to.name} (${newCall.to.number})\`` : toDial : toDial} by ${msg.channel.id}`);
	await msg.reply(`:arrow_right: You have transferred the other side to ${toDial}.`);
	if (newCall.to.number === "08006113835") client.apiSend(`<@&${config.supportRole}>`, newCall.to.channel);
	await client.apiSend(`:arrow_right: You have been transferred by the other side. Now calling ${newCall.to.number === "08006113835" ? "Customer Support" : toDialvip ? newCall.to.vip.hidden ? newCall.to.vip.name ? `\`${newCall.to.vip.name}\`` : "Hidden" : newCall.to.vip.name ? `\`${newCall.to.vip.name} (${newCall.to.id})\`` : fromContact ? `:green_book:${fromContact.name}` : `\`${newCall.to.id}\`` : fromContact ? `:green_book:${fromContact.name}` : `\`${newCall.to.id}\``}...`, newCall.from.channel);
	client.apiSend(`${toDialDoc.mentions ? `${toDialDoc.mentions.join(" ")}\n` : ""}There is an incoming call from ${myNumber.id === "08006113835" ? "Customer Support" : myNumbervip ? myNumber.vip.hidden ? myNumber.vip.name ? `\`${myNumber.vip.name}\`` : "Hidden" : myNumber.vip.name ? `\`${myNumber.vip.name} (${myNumber.id})\`` : toContact ? `:green_book:${toContact.name}` : `\`${myNumber.id}\`` : toContact ? `:green_book:${toContact.name}` : `\`${myNumber.id}\``}. You can either type \`>pickup\` or \`>hangup\`, or wait it out.`, newCall.to.channel);

	setTimeout(async() => {
		let callDoc = await Calls.get(newCall.id);
		if (!callDoc || callDoc.pickedUp) return;

		client.apiSend(":x: You missed the call (2 minutes).", callDoc.to.channel);
		await Calls.newGet(callDoc.id).delete();

		client.log(`:telephone: The call between channel ${callDoc.from.channel} and channel ${callDoc.to.channel} was not picked up.`);

		await r.table("OldCalls").insert(callDoc);

		let mailbox = await r.table("Mailbox").get(toDial).default(null);
		if (!mailbox) return msg.channel.send(":x: The other side did not pick up the call.");
		msg.channel.send(`:x: The other side did not pick up the call. Automated mailbox message:\n${mailbox.autoReply}\n<@${msg.author.id}>, Type your message or enter \`no\` to exit without sending a message.`);

		let collector = msg.channel.createMessageCollector(nmsg => nmsg.author.id === msg.author.id);
		collector.on("collect", async cmsg => {
			await collector.stop();
			mailbox.messages.push(cmsg.content);
			r.table("Mailbox").get(toDial).update({ messages: mailbox.messages });
			msg.channel.send(":mailbox: Message sent!");
		});
	}, 120000);
};
