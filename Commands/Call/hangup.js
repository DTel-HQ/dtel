module.exports = async(client, msg, suffix, call) => {
	if (call.to.number === "08006113835" && msg.channel.id != config.supportChannel) return;

	// Calculate time the call lasted for.
	let duration = Math.round((Date.now() - call.startedAt) / 1000, 1);
	let h = Math.floor(duration / 3600);
	duration -= h * 3600;
	let m = Math.floor(duration / 60);
	duration -= m * 60;
	let s = duration;
	let time = h ? `${h}h${m}m${s}s` : m ? `${m}m${s}s` : `${s}s`;

	// Send the stuff
	msg.channel.send({ embed: { color: config.colors.error, title: "The call has ended!", description: `You have ended the call${call.pickedUp ? ` after ${time}` : ""}.` } });
	client.apiSend({ embed: { color: config.colors.error, title: "The call has ended!", description: `The other side ended the call${call.pickedUp ? ` after ${time}` : ""}.` } }, msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
	await r.table("OldCalls").insert(call);
	await r.table("Calls").get(call.id).delete();
	client.log(`:negative_squared_cross_mark: ${call.rcall ? "Rcall" : "Call"} \`${call.from.hidden ? "hidden" : call.from.channel} → ${call.to.hidden ? "hidden" : call.to.channel}\` was hung up by ${msg.author.tag} (${msg.author.id}) on the ${msg.channel.id === call.from.channel ? "from" : "to"} side. ${call.id}`);
};
