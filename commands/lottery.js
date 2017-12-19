var fs = require("fs"),
    accounts = JSON.parse(fs.readFileSync("././account.json", "utf8")),
    award = JSON.parse(fs.readFileSync("././award.json", "utf8")),
    support = user_id => bot.guilds.get('281815661317980160').roles.get('281815839936741377').members.map(member => member.id).indexOf(user_id) > -1;

exports.run = (bot, message, args) => {
  var account = accounts.find(item => {return item.user === message.author.id;});
  if (message.content.split(" ")[1] === undefined) {
    var myentry = award.users.filter(item => {return item === message.author.id}).length;
    message.reply("You have "+myentry+" entries. The current jackpot is ¥"+award.amount+".\nTo buy lotteries: `>lottery <Amount of entries>`. 1 entry costs 5 credits.");
    return;
  }
  else if (isNaN(parseInt(message.content.split(" ")[1]))) {
    message.reply("Not a number!\n`>lottery <Amount of entries>`. 1 Entry costs 5 credits.");
    return;
  }
  else if (parseInt(message.content.split(" ")[1]) < 0) {message.reply("Get some help.");return;}
  var entries = parseInt(message.content.split(" ")[1]);
  if (account === undefined) {
    account = {user:message.author.id,balance:0};
    accounts.push(account);
    bot.users.get(message.author.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
  }
  if (account.balance < entries * 5) {
    message.reply("Insufficient fund! 1 Entry costs 5 credits.");
    return;
  }
  accounts.splice(accounts.indexOf(account), 1);
  account.balance -= entries * 5;
  accounts.push(account);
  for (var i = 0; i < entries; i++) {
    award.users.push(message.author.id);
  }
  award.amount += entries * 5;
  fs.writeFileSync("./award.json", JSON.stringify(award), "utf8");
  message.reply("You've bought "+entries+" entries. The current jackpot is ¥"+award.amount+".");
  bot.channels.get("282253502779228160").send(":tickets: User "+message.author.username+" paid ¥"+entries * 5+" for the lottery. The user now have ¥"+account.balance+".");
}
