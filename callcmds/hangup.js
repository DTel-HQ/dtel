const fs = require("fs");
var mailbox_storage = JSON.parse(fs.readFileSync("../json/mailbox.json"));

exports.run = (bot, message, fs, calls, call) => {
	message.reply(":negative_squared_cross_mark:  You hung up the call.");
	bot.channels.get("282253502779228160").send(`:negative_squared_cross_mark: The call between channel ${call.from.channel} and channel ${call.to.channel} is hung up by __${message.author.username}#${message.author.discriminator}__ (${message.author.id}) on the "from" side.`);
	calls.splice(calls.indexOf(call), 1);
	fs.writeFileSync("../json/call.json", JSON.stringify(calls), "utf8");
	if (bot.channels.get(call.to.channel) !== undefined) {
		if (!mailbox_storage.find(a => a.channel === call.from.channel)) {
			bot.channels.get(call.to.channel).send(":x: Call ended; their mailbox isn't setup");
			return;
		}
		bot.channels.get(call.to.channel).send(`:x: ${mailbox_storage.find(a => a.channel === call.from.channel).settings.autoreply}`);
		bot.channels.get(call.to.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
		recentCall[call.to.channel] = call.from.number;
		/* bot.channels.get(call.to.channel).createCollector(m=>{return (m.content.toLowerCase()==="yes"||m.content.toLowerCase()==="no")&&m.author.id===msg.author.id;},{"max":10,"maxMatches":1,"time":20}).on('collect',function(m){
      switch(m.content){
        case "yes":
        msg.reply(JSON.stringify(call.to));
        bot.channels.get(call.to.channel).send(":question: What message would you like to send?");
        bot.channels.get(call.to.channel).createCollector(m=>m.author.id===msg.author.id,{"max":10,"maxMatches":1,"time":60}).on('collect',function(m){
          mailbox_storage.find(a=>a.channel===call.from.channel).messages.push({
            "id":guid(),
            "from":call.to
          })
        });
        break;
        case "no":
        bot.channels.get(call.to.channel).send("No message will be sent");
        break;
        default:
        bot.channels.get(call.to.channel).send(":question: Error");
        break;
      }
    });*/
	}
};
