const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args, callDocument) => {
	if (!callDocument) return console.log("wtf no calldoc", callDocument);
  else if (!callDocument.pickedUp) return message.reply(":x: You can't put a pending call on hold!")
	let toSend;
	if (callDocument.to.channelID === message.channel.id) {
		toSend = callDocument.from.channelID;
	} else {
		toSend = callDocument.to.channelID;
	}
	message.reply(":hourglass_flowing_sand: You have put this call on hold. Re-do `>hold` to release.");
	await client.apiSend(":hourglass_flowing_sand: The other side has put this call on hold.", toSend);
  callDocument.onHold = true;
	await callDocument.save();
};
