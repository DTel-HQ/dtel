module.exports = async(client, msg, suffix, call) => {
	try {
		await client.api.channels(call.from.channel).get();
	} catch (_) {
		msg.channel.send({ embed: { color: config.colors.error, title: "Where'd they go?", description: "Couldn't find the other side. Please report this to `*611` as this may have been a troll call." } });
		await r.table("OldCalls").insert(call);
		await r.table("Calls").get(call.id).delete();
		return client.delete(call.from.number);
	}

	// Pickup - reply first or it'll seem slow
	msg.channel.send({ embed: { color: config.colors.success, title: "You picked up the call.", description: "You can now put the call on `>hold`, or transfer the call to another number by using `>transfer <number>`! Note: if they are trolls, call *611." } });
	client.apiSend({ embed: { color: config.colors.success, title: "The other side picked up!", description: "You can now put the call on `>hold`, or transfer a call to another number by using `>transfer <number>`. Note: if they are trolls, call *611." } }, call.from.channel);
	client.log(`:white_check_mark: ${call.rcall ? "Rcall" : "Call"} \`${call.from.hidden ? "hidden" : call.from.channel} → ${call.to.hidden ? "hidden" : call.to.channel}\` was picked up by ${msg.author.tag} (${msg.author.id}). ${call.id}`);
	call.pickedUp = true;
	await r.table("Calls").get(call.id).update(call);

	if (call.to.number == "08006113835") {
		let account = await r.table("Accounts").get(msg.author.id);
		if (!account) {
			account = { id: msg.author.id, balance: 0 };
			await r.table("Accounts").insert(account);
		}
		let newBalance = account.balance + config.pickupBonus;
		await r.table("Accounts").get(account.id).update({ balance: newBalance });
	}

	let afkInterval = setInterval(async() => {
		call = await r.table("Calls").get(call.id);
		if (!call) return clearInterval(afkInterval);
		if (!call.lastMessage || call.lastMessage + 290000 < new Date().getTime()) {
			try {
				await client.api.channels(call.from.channel).get();
			} catch (_) {
				client.apiSend(":x: The bot can no longer access the opposite side. Please report this by dialing `*611` as it could be a troll call.", call.to.channel);
				await r.table("OldCalls").insert(call);
				await r.table("Calls").get(call.id).delete();
				return client.delete(call.from.number);
			}
			try {
				await client.api.channels(call.to.channel).get();
			} catch (_) {
				client.apiSend(":x: The bot can no longer access the opposite side. Please report this by dialing `*611` as it could be a troll call.", call.from.channel);
				await r.table("OldCalls").insert(call);
				await r.table("Calls").get(call.id).delete();
				return client.delete(call.to.number);
			}
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.from.channel);
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.to.channel);
		}
	}, 300000);
};
