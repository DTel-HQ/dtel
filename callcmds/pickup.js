// const fs = require("fs");
// var mailbox_storage = JSON.parse(fs.readFileSync("../json/mailbox.json"));

// module.exports = async(client, message, fs, calls, call) => {
// 	message.reply(":white_check_mark: You pick up the call.");
// 	if (client.channels.get(call.from.channel) === undefined) {
// 		message.reply(":x: The bot has lost permission to send your message to the opposite side. This means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
// 		calls.splice(calls.indexOf(call), 1);
// 		fs.writeFileSync("../json/call.json", JSON.stringify(calls), "utf8");
// 		return;
	// }
	// client.channels.get(call.from.channel).send(":heavy_check_mark: The other side picked up!");
	// calls.splice(calls.indexOf(call), 1);
	// call.status = true;
	// call.time = Date.now();
	// calls.push(call);
	// fs.writeFileSync("../json/call.json", JSON.stringify(calls), "utf8");
	// client.channels.get(process.env.LOGSCHANNEL).send(`:white_check_mark: The call between channel ${call.from.channel} and channel ${call.to.channel} was picked up by __${message.author.tag}__ (${message.author.id}).`);
	setTimeout(() => {
		call = calls.find(item => {
			if (item.from.channel === message.channel.id) {
				return item.from.channel === message.channel.id;
			} else if (item.to.channel === message.channel.id) {
				return item.to.channel === message.channel.id;
			} else { return undefined; }
		});
		if (call !== undefined) {
			if (call.time <= Date.now() - 120000) {
				client.channels.get(call.from.channel).send(":negative_squared_cross_mark: This call has expired (2 minutes).");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("../json/call.json", JSON.stringify(calls), "utf8");
				client.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
				if (!mailbox_storage.find(a => a.channel === call.to.channel)) {
					client.channels.get(call.from.channel).send(":x: The call ended.");
					return;
				}
				client.channels.get(call.from.channel).send(`:x: ${mailbox_storage.find(a => a.channel === call.to.channel).settings.autoreply}`);
				client.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
				recentCall[call.from.channel] = call.to.number;
				client.channels.get(process.env.LOGSCHANNEL).send(`:telephone: The call between channel ${call.from.channel} and channel ${call.to.channel} is expired.`);
			}
		}
	}, 120000);
};
