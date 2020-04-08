module.exports = async(channel, user) => {
	if (user.bot) return;
	let call = await r.table("Calls").getAll(channel.id, { index: "fromChannel" }).nth(0).default(false);
	if (!call) call = await r.table("Calls").getAll(channel.id, { index: "toChannel" }).nth(0).default(false);
	if (!call || !call.pickedUp || call.hold) return;

	let typeChannel = channel.id === call.from.channel ? call.to.channel : call.from.channel;
	await client.api.channels[typeChannel].typing.post();

	let typingCheck = setInterval(async() => {
		call = await r.table("Calls").get(call.id);
		user = await client.users.cache.get(user.id);
		let userTyping = await user.typingIn(channel.id);
		if (!call || !userTyping || call.hold) clearInterval(typingCheck);
		else client.api.channels[typeChannel].typing.post();
	}, 5000);
};
