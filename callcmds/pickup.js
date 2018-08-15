const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args, callDocument) => {
	if (callDocument.pickedUp || message.channel.id === callDocument.from.channelID) return;
	let toChannel, fromChannel;
	try {
		toChannel = await client.api.channels(callDocument.to.channelID).get();
		fromChannel = await client.api.channels(callDocument.from.channelID).get();
	} catch (err) {
		// Ignore
	}
	if (!toChannel || !fromChannel) {
		await callDocument.remove();
		return message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
	}
	try {
		await client.apiSend(":heavy_check_mark: The other side picked up!", callDocument.from.channelID);
	} catch (e) {
		if (e.message === "Missing Permissions") {
			await callDocument.remove();
			return message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
		}
	}
	await client.apiSend(`:white_check_mark: The call between channel ${toChannel.id} and channel ${fromChannel.id}} was picked up by __${message.author.tag}__ (${message.author.id}).`, process.env.LOGSCHANNEL);
	callDocument.lastReminder = Date.now();
	callDocument.pickedUp = true;
	await callDocument.save();
	message.reply(":white_check_mark: You pick up the call.");
	let rem = setInterval(async() => {
		callDocument = await Calls.findOne({ _id: callDocument._id });
		if (!callDocument || Date.now() - callDocument.lastReminder < 299999) { clearInterval(rem); } else {
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${callDocument._id}). You can type \`>hangup\` to end it.`, callDocument.from.channelID);
			client.apiSend(`:bulb: Reminder: You still have an ongoing call (${callDocument._id}). You can type \`>hangup\` to end it.`, callDocument.to.channelID);
			callDocument.lastReminder = Date.now();
			await callDocument.save();
		}
	}, 300000);
};
