module.exports = async(client, channel, member) => {
	if (member.id === client.user.id) return;
	let callTo, callFrom;
	try {
		callTo = await Calls.findOne({ "to.channelID": channel.id });
		if (!callTo) throw new Error();
	} catch (err) {
		try {
			callFrom = await Calls.findOne({ "from.channelID": channel.id });
			if (!callFrom) throw new Error();
		} catch (err2) {
			return null;
		}
	}
	if (callTo && callTo.pickedUp && !callTo.onHold) {
		try {
			const fetched = await client.api.channels(callTo.from.channelID).get();
			client.IPC.send("startTyping", { typings: [{ channel: fetched.id, guild: fetched.guild_id }] });
		} catch (err) {
			console.log(err);
		}
	} else if (callFrom && callFrom.pickedUp && !callFrom.onHold) {
		try {
			const fetched = await client.api.channels(callFrom.to.channelID).get();
			client.IPC.send("startTyping", { typings: [{ channel: fetched.id, guild: fetched.guild_id }] });
		} catch (err) {
			console.log(err);
		}
	}
};
