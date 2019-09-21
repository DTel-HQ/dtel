module.exports = async(channel, user) => {
	if (user.bot) return;
	let call = await channel.call;
	if (!call || !call.pickedUp || call.hold) return;

	let typeChannel = channel.id === call.from.channel ? call.to.channel : call.from.channel;
	await client.api.channels[typeChannel].typing.post();

	let typingCheck = setInterval(async() => {
		call = await r.table("Calls").get(call.id);
		user = await client.users.get(user.id);
		let userTyping = await user.typingIn(channel.id);
		if (!call || !userTyping || call.hold) clearInterval(typingCheck);
		else client.api.channels[typeChannel].typing.post();
	}, 5000);
};
