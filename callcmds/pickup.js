const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args, callDocument) => {
	if (callDocument.pickedUp) return;
	callDocument.pickedUp = true;
	await callDocument.save();
	message.reply(":white_check_mark: You pick up the call.");
	let toChannel, fromChannel;
	try {
		toChannel = await client.api.channels(callDocument.to.channelID).get();
		fromChannel = await client.api.channels(callDocument.from.channelID).get();
	} catch (err) {
		// Ignore
	}
	if (!toChannel || !fromChannel) {
		callDocument.status = false;
		callDocument.now = Date.now;
		await callDocument.save();
		return message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
	}
	await client.apiSend(":heavy_check_mark: The other side picked up!", callDocument.from.channelID);
	await client.apiSend(`:white_check_mark: The call between channel ${toChannel.id} and channel ${fromChannel.id}} was picked up by __${message.author.tag}__ (${message.author.id}).`, process.env.LOGSCHANNEL);
};
