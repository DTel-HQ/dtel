const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args, callDocument) => {
	if (!callDocument) return console.log("wtf no calldoc");
	let toSend;
	if (callDocument.to.channelID === message.channel.id) {
		toSend = client.api.channels(callDocument.from.channelID).messages;
	} else {
		toSend = client.api.channels(callDocument.to.channelID).messages;
	}
	let send = content => client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content,
	}));
	message.reply(":negative_squared_cross_mark:  You hung up the call.");
	send(`:negative_squared_cross_mark: The call between channel ${callDocument.from.channelID} and channel ${callDocument.to.channelID} was hung up by __${message.author.tag}__ (${message.author.id}) on the "from" side.`);
	await toSend.post(MessageBuilder({
		content: ":x: The other side ended the call..",
	}));
	// Stop typing... somehow.
	// TODO: IPC this
	await OldCalls.create(new OldCalls(callDocument));
	await callDocument.remove();
};
