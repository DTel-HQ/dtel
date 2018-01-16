module.exports = async(client, message, callDocument) => {
	console.log("ran");
	callDocument.pickedUp = true;
	await callDocument.save();
	message.reply(":white_check_mark: You pick up the call.");
	let toChannel, fromChannel;
	try {
		toChannel = client.channels.get(callDocument.to._id);
		fromChannel = client.channels.get(callDocument.from._id);
	} catch (err) {
		// Ignore
	}
	if (!toChannel || !fromChannel) {
		callDocument.status = false;
		await callDocument.save();
		return message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
	}
	toChannel.send(":heavy_check_mark: The other side picked up!");
	client.channels.get(process.env.LOGSCHANNEL).send(`:white_check_mark: The call between channel ${toChannel._id} and channel ${fromChannel._id}} was picked up by __${message.author.tag}__ (${message.author.id}).`);
	await setTimeout(async() => {
		if (callDocument.status == false) {
			fromChannel.send(":negative_squared_cross_mark: This call has expired (2 minutes).");
		}
		if (!await Mailbox.findOne({ _id: callDocument.to._id })) {
			return fromChannel.send(":x: The call ended.");
		}
		fromChannel.send(`:x: ${(await Mailbox.findOne({ _id: callDocument.from._id })).settings.autoreply}`);
		fromChannel.send(":question: Would you like to leave a message? `>message [number] [message]`");
		client.channels.get(process.env.LOGSCHANNEL).send(`:telephone: The call between channel ${fromChannel._id} and channel ${toChannel._id} is expired.`);
	}, 120010);
};
