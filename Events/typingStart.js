module.exports = async(channel, user) => {
	if (user.bot) return;
	let call = await (await r.table("Calls").filter(r.row("from")("channel").eq(channel.id).or(r.row("to")("channel").eq(channel.id))))[0];
	if (!call) return;

	let typeChannel = channel.id === call.from.channel ? call.to.channel : call.from.channel;
	await client.api.channels[typeChannel].typing.post();

	let typingCheck = setInterval(async() => {
		call = await r.table("Calls").get(call.id);
		user = await client.users.get(user.id);
		let userTyping = await user.typingIn(channel.id);
		if (!call || !userTyping) clearInterval(typingCheck);
		else client.api.channels[typeChannel].typing.post();
	}, 5000);
};
