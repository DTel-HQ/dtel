module.exports = async(client, msg, suffix) => {
	let call = await Calls.find(c => c.to.channel === msg.channel.id);
	if (!call || call.pickedUp) return;

	try {
		await client.api.channels(call.from.channel).get();
	} catch (_) {
		await r.table("OldCalls").insert(call);
		await Calls.newGet(call.id).delete();
		await r.table("Numbers").get(call.from.number).delete();
		await r.table("Phonebook").get(call.from.number).delete();
		await r.table("Mailbox").get(call.from.channel).delete();
		return msg.reply(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.");
	}

	// Pickup - reply first or it'll seem slow
	msg.reply(":white_check_mark: You picked up the call.\n\nYou can now put the call on `>hold`, or transfer the call to another number by using `>transfer <number>`!");
	client.apiSend(":heavy_check_mark: The other side picked up!\n\nYou can now put the call on `>hold`, or transfer a call to another number by using `>transfer <number>`.", call.from.channel);
	client.log(`:white_check_mark: ${call.rcall ? "Rcall" : "Call"} \`${call.from.hidden ? "hidden" : call.from.channel} → ${call.to.hidden ? "hidden" : call.to.channel}\` was picked up by ${msg.author.tag} (${msg.author.id}). ${call.id}`);
	call.pickedUp = true;
	await Calls.update(call);

	if (call.to.number == "08006113835") {
		let account = await r.table("Accounts").get(msg.author.id);
		if (!account) {
			account = { id: msg.author.id, balance: 0 };
			await r.table("Accounts").insert(account);
		}
		let newBalance = account.balance + config.pickupBonus;
		r.table("Accounts").get(account.id).update({ balance: newBalance });
	}

	let afkInterval = setInterval(async() => {
		call = await Calls.get(call.id);
		if (!call) return clearInterval(afkInterval);
		if (!call.lastMessage || call.lastMessage + 290000 < new Date().getTime()) {
			try {
				await client.api.channels(call.from.channel).get();
			} catch (_) {
				await r.table("OldCalls").insert(call);
				await Calls.newGet(call.id).delete();
				await r.table("Numbers").get(call.from.number).delete();
				await r.table("Phonebook").get(call.from.number).delete();
				await r.table("Mailbox").get(call.from.channel).delete();
				return client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", call.to.channel);
			}
			try {
				await client.api.channels(call.to.channel).get();
			} catch (_) {
				await r.table("OldCalls").insert(call);
				await Calls.newGet(call.id).delete();
				await r.table("Numbers").get(call.to.number).delete();
				await r.table("Phonebook").get(call.to.number).delete();
				await r.table("Mailbox").get(call.to.channel).delete();
				return client.apiSend(":x: The bot can no longer access the opposite side. Please report this by calling `*611` as it could be a troll call.", call.from.channel);
			}
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.from.channel);
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.to.channel);
		}
	}, 300000);
};
