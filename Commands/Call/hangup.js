module.exports = async(client, msg, suffix, call) => {
	if (call.to.number === config.supportNumber && msg.channel.id != config.supportChannel) return msg.channel.send({ embed: { color: config.colors.error, title: "You cannot hang up on Customer Support!", description: "If your problem is solved, simply indicate so to the responding agent." } });
	let myNumber = await r.table("Numbers").get(call.from.number);

	// Calculate time the call lasted for.
	let duration, h, m, s, time;
	if (call.pickedUp) {
		duration = Math.round((Date.now() - call.pickedUp) / 1000, 1);
		h = Math.floor(duration / 3600);
		duration -= h * 3600;
		m = Math.floor(duration / 60);
		duration -= m * 60;
		s = duration;
		time = client.time(s, m, h);
	}

	let side = msg.channel.id === call.from.channel ? call.from : call.to;
	let hidden = side.hidden;
	call.hungupBy = msg.author.id;

	// Send the stuff
	msg.channel.send({ embed: { color: config.colors.error, title: "The call has ended!", description: `You have ended the call${call.pickedUp ? ` after ${time}` : ""}.`, footer: { text: call.id } } });
	await r.table("Calls").get(call.id).delete();
	await client.apiSend({ embed: { color: config.colors.error, title: "The call has ended!", description: `The other side ended the call${call.pickedUp ? ` after ${time}` : ""}.`, footer: { text: call.id } } }, msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
	await r.table("OldCalls").insert(call);
	await client.log(`:negative_squared_cross_mark: ${call.rcall ? "rcall" : "Call"} \`${call.from.hidden ? "hidden" : call.from.channel} → ${call.to.hidden ? "hidden" : call.to.channel}\` was hung up by ${hidden ? "Anonymous#0000" : msg.author.tag} (${hidden ? "hidden" : msg.author.id}) on the ${msg.channel.id === call.from.channel ? "from" : "to"} side. ${call.id}`);

	if (call.to.channel === config.supportChannel || call.from.channel === config.supportChannel) {
		const channel = client.channels.cache.get(config.supportChannel);
		channel.overwritePermissions(client.supportChannelPerms, `Call hung up (${call.id})`);
	}
};
