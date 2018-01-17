module.exports = async(client, message, args, callDocument) => {
	let toSend;
	if (callDocument.to.channelID === message.channel.id) {
		toSend = client.channels.get(callDocument.from.channelID);		
	} else {
		toSend = client.channels.get(callDocument.to.channelID);
	}
	message.reply(":negative_squared_cross_mark:  You hung up the call.");
	client.channels.get(process.env.LOGSCHANNEL).send(`:negative_squared_cross_mark: The call between channel ${callDocument.from.channelID} and channel ${callDocument.to.channelID} was hung up by __${message.author.tag}__ (${message.author.id}) on the "from" side.`);
	toSend.send(":x: The call was hung up.");
	await callDocument.remove();
};
