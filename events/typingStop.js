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
	if (callTo) {
		client.channels.get(callTo.from.channelID).stopTyping(true);
	} else if (callFrom) {
		client.channels.get(callFrom.to.channelID).stopTyping(true);
	}
};
