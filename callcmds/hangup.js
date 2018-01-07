const fs = require("fs");

exports.run = (client, message, fs, calls, call) => {
	message.reply(":negative_squared_cross_mark:  You hung up the call.");
	client.channels.get(process.env.LOGSCHANNEL).send(`:negative_squared_cross_mark: The call between channel ${call.from.channel} and channel ${call.to.channel} was hung up by __${message.author.tag}__ (${message.author.id}) on the "from" side.`);
	calls.splice(calls.indexOf(call), 1);
	fs.writeFileSync("../json/call.json", JSON.stringify(calls), "utf8");
	if (client.channels.get(call.to.channel) !== undefined) {
		client.channels.get(call.to.channel).send(":x: The call was hung up.");
		return;
	}
};
