const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args, callDocument) => {
	if (!callDocument) return console.log("wtf no calldoc", callDocument);
	if (callDocument.to.number === "08006113835") return message.reply(":x: You can't hangup on `*611`."); 
	let toSend;
	let side; //rename
	if (callDocument.to.channelID === message.channel.id) {
		toSend = callDocument.from.channelID;
		side = 'from';
	} else {
		toSend = callDocument.to.channelID;
		side = 'to';
	}
	message.reply(":negative_squared_cross_mark: You hung up the call.");
	await client.apiSend(`:negative_squared_cross_mark: The call between channel ${callDocument.from.channelID} and channel ${callDocument.to.channelID} was hung up by __${message.author.tag}__ (${message.author.id}) on the ${side} side.`, process.env.LOGSCHANNEL);
	await client.apiSend(":x: The other side ended the call.", toSend);
	try {
		let hangups = [];
		try {
			const fromChannel = await client.api.channels(callDocument.from.channelID).get();
			hangups.push({ channel: fromChannel.id, guild: fromChannel.guild_id });
			const toChannel = await client.api.channels(callDocument.to.channelID).get();
			hangups.push({ channel: toChannel.id, guild: toChannel.guild_id });
		} catch (err) {
			console.log(err);
		}
		client.IPC.send("stopTyping", { hangups });
		await OldCalls.create(new OldCalls(callDocument.toObject()));
		await callDocument.remove();
	} catch (_) {
		// Ignore
	}
};
