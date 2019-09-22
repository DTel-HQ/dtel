module.exports = async(client, msg, suffix, call) => {
	if ((call.to.number === config.supportNumber || call.from.number === config.supportNumber) && msg.channel.id != config.supportChannel) return;
	if (!call.pickedUp) return msg.channel.send({ embed: { color: config.colors.error, title: "Holding error", description: "You can't put a call on hold that hasn't been picked up!" } });

	let hold;

	if (call.hold) {
		if (call.hold != msg.channel.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "Only the other side can release this hold." } });
		hold = false;
		await client.apiSend({ embed: { color: config.colors.info, title: "Resuming call", description: "The hold has ended." } }, msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
		await msg.channel.send({ embed: { color: config.colors.info, title: "Resuming call", description: "You have ended the hold." } });
	} else {
		hold = msg.channel.id;
		await msg.channel.send({ embed: { color: config.colors.info, title: "Call holded", description: "You have put this call on hold. Re-do `>hold` to release." } });
		await client.apiSend({ embed: { color: config.colors.info, title: "On hold...", description: "The other side has put this call on hold." } }, hold === call.from.channel ? call.to.channel : call.from.channel);
		// add stop typing
	}
	await r.table("Calls").get(call.id).update({ hold: hold });
};
