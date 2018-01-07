module.exports = async(client, message, callDocument) => {
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
	let side;
	if (message.channel.id === toChannel.id) {
		side = "to";
	} else {
		side = "from";
	}
	if (!toChannel || !fromChannel) {
		callDocument.status = false;
		await callDocument.save();
		return message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
	}
	fromChannel.send(":heavy_check_mark: The other side picked up!");
	client.channels.get(process.env.LOGSCHANNEL).send(`:white_check_mark: The call between channel ${toChannel._id} and channel ${fromChannel._id}} was picked up by __${message.author.tag}__ (${message.author.id}).`);
	setTimeout(() => {

	});
};
