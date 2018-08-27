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
	if (callDocument.onHold === toSend) return message.reply("Only the other side can release a call hold.");
	else if (callDocument.onHold === "") {
		message.reply(":hourglass_flowing_sand: You have put this call on hold. Re-do `>hold` to release.");
		await client.apiSend(":hourglass_flowing_sand: The other side has put this call on hold.", toSend);
		callDocument.onHold = message.channel.id;
	} else if (callDocument.onHold === message.channel.id) {
		message.reply(":hourglass: You have ended the call hold.");
		await client.apiSend(":hourglass: Call hold ended.", toSend);
		callDocument.onHold = "";
	} else return message.reply("Unexpected `callDocument.onHold` value, please report this to `*611`.");
	await callDocument.save();
};
