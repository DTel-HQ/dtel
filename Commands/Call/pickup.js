module.exports = async(client, msg, suffix, call) => {
	if (call.pickedUp || msg.channel.id === call.from.channel) return;

	try {
		await client.api.channels(call.from.channel).get();
	} catch (_) {
		msg.channel.send({ embed: { color: config.colors.error, title: "Where'd they go?", description: "Couldn't find the other side. Please report this to `*611` as this may have been a troll call." } });
		await r.table("OldCalls").insert(call);
		await r.table("Calls").get(call.id).delete();
		return client.delete(call.from.number, { force: false, log: true, origin: "pickup_from" });
	}

	if (call.to.number === config.supportNumber) {
		let account = await msg.author.account();
		let newBalance = account.balance + config.pickupBonus;
		await r.table("Accounts").get(account.id).update({ balance: newBalance });

		let channel = client.channels.cache.get(config.supportChannel);
		client.supportChannelPerms = JSON.parse(JSON.stringify(channel.permissionOverwrites));
		const perms = JSON.parse(JSON.stringify(channel.permissionOverwrites));
		perms.push(
			{ id: msg.author.id, type: "user", allow: ["SEND_MESSAGES"] },
			{ id: config.supportRole, type: "role", deny: ["SEND_MESSAGES"] },
		);
		await channel.overwritePermissions(perms, "*611 call pickup");
	}

	let channelFrom = await client.channels.fetch(call.from.channel);

	// Pickup - reply first or it'll seem slow
	if (call.to.channel !== config.supportChannel) msg.channel.send({ embed: { color: config.colors.success, title: "You picked up the call.", description: "You can now put the call on `>hold`, or transfer the call to another number by using `>transfer <number>`! Note: if they are trolls, call *611.", footer: { text: call.id } } });
	else client.apiSend({ embed: { color: config.colors.success, title: "You picked up the call.", description: "You can now put the call on `>hold`, or transfer the call to another number by using `>transfer <number>`! Note: if they are trolls, call *611.", footer: { text: call.id } } }, config.supportChannel);
	client.apiSend({ content: call.transferredBy ? "" : channelFrom.type === "dm" ? "" : `<@${call.startedBy}>`, embed: { color: config.colors.success, title: "The other side picked up!", description: "You can now put the call on `>hold`, or transfer a call to another number by using `>transfer <number>`. Note: if they are trolls, call *611.", footer: { text: call.id } } }, call.from.channel);
	client.log(`:white_check_mark: ${call.rcall ? "rcall" : "Call"} \`${call.from.hidden ? "hidden" : call.from.channel} → ${call.to.hidden ? "hidden" : call.to.channel}\` was picked up by ${call.to.hidden ? "Anonymous#0000" : msg.author.tag} (${call.to.hidden ? "hidden" : msg.author.id}). ${call.id}`);
	call.pickedUp = Date.now();
	call.pickedUpBy = msg.author.id;
	await r.table("Calls").get(call.id).update(call);

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
				return client.delete(call.from.number, { force: false, log: true, origin: "pickup_afk_from" });
			}
			try {
				await client.api.channels(call.to.channel).get();
			} catch (_) {
				client.apiSend(":x: The bot can no longer access the opposite side. Please report this by dialing `*611` as it could be a troll call.", call.from.channel);
				await r.table("OldCalls").insert(call);
				await r.table("Calls").get(call.id).delete();
				return client.delete(call.to.number, { force: false, log: true, origin: "pickup_afk_to" });
			}
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.from.channel);
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${call.id}). You can type \`>hangup\` to end it.`, call.to.channel);
		}
	}, 300000);
};
