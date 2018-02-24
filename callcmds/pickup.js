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
		await callDocument.save();
		return message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
	}
	client.api.channels(callDocument.from.channelID).messages.post(MessageBuilder({
		content: ":heavy_check_mark: The other side picked up!",
	}));
	let send = content => client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content,
	}));
	send(`:white_check_mark: The call between channel ${toChannel.id} and channel ${fromChannel.id}} was picked up by __${message.author.tag}__ (${message.author.id}).`);
};
