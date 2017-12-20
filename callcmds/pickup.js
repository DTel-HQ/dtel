exports.run = (bot, message, fs, calls, call) => {
  message.reply(":white_check_mark: You pick up the call.");
  if (bot.channels.get(call.from.channel) === undefined) {
    message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
    calls.splice(calls.indexOf(call), 1);
    fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
    return;
  }
  bot.channels.get(call.from.channel).send(":heavy_check_mark: The call has been picked up!");
  calls.splice(calls.indexOf(call), 1);
  call.status = true;
  call.time = Date.now();
  calls.push(call);
  fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
  bot.channels.get("282253502779228160").send(":white_check_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is picked up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
  setTimeout(function(){
    call = calls.find(function(item) {
      if (	item.from.channel === message.channel.id) {
        return item.from.channel === message.channel.id;
      }
      else if (item.to.channel === message.channel.id) {
        return item.to.channel === message.channel.id;
      }
      else {return undefined;}
    });
    if (call !== undefined) {
      if (call.time <= Date.now() - 120000) {
        bot.channels.get(call.from.channel).send(":negative_squared_cross_mark: This call has expired (2 minutes).");
        calls.splice(calls.indexOf(call), 1);
        fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
        bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
        if(!mailbox_storage.find(a=>a.channel===call.to.channel)){
          bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
          return;
        }
        bot.channels.get(call.from.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.to.channel).settings.autoreply);
        bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
        recentCall[call.from.channel]=call.to.number;
        bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
      }
    }
  },120000);
};
