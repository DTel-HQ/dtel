module.exports = async(client, msg, suffix, call) => {
	if ((call.to.number === "08006113835" || call.from.number === "08006113835") && msg.channel.id != config.supportChannel) return;
	if (!call.pickedUp) return msg.channel.send({ embed: { color: config.colors.error, title: ":x:", description: "You can't put a call on hold that hasn't been picked up!" } });

	if (call.onHold) {
		if (call.onHold != msg.channel.id) return msg.channel.send({ embed: { color: config.colors.error, title: ":x:", description: "Only the other side can release this hold." } });
		call.onHold = "";
		await client.apiSend({ embed: { color: config.colors.info, title: "Resuming call", description: "The hold has ended." } }, msg.channel.id === call.from.channel ? call.to.channel : call.from.channel);
		await msg.channel.send({ embed: { color: config.colors.info, title: "Resuming call", description: "You have ended the hold." } });
	} else {
		call.onHold = msg.channel.id;
		await msg.channel.send({ embed: { color: config.colors.info, title: "Call holded", description: "You have put this call on hold. Re-do `>hold` to release." } });
		await client.apiSend({ embed: { color: config.colors.info, title: "On hold...", description: "The other side has put this call on hold." } }, call.onHold === call.from.channel ? call.to.channel : call.from.channel);
		// add stop typing
	}
	await r.table("Calls").get(call.id).update(call);
};
