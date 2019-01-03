module.exports = async(client, msg, suffix) => {
  let lottery = r.table("Lottery");
  let jackpot,
      totalEntries;
  if (!lottery[0]) {
    jackpot = 0;
    currentNumber = 0;
  } else {
    jackpot = lottery[lottery.length - 1].jackpot;
    currentNumber = lottery[lottery.length - 1].number;
  }

  if (!suffix) {
    let entries = await r.table("Accounts").get(msg.author.id).entries;
    if (isNaN(entries)) {
      entries = 0;
      r.table("Accounts").get(msg.author.id).update({ entries: 0 }).run(conn, (err, cursor) => {
        winston.info(`[RethinkDB] Couldn't add entries to account ${msg.author.id}: ${err}`);
      });
    }
    let chance;
    if (currentNumber == 0) {
      chance = 0
    } else {
      chance = (entries / currentNumber) * 100;
    }
    msg.reply(`The current jackpot is ${jackpot} credits.
              \nYou have ${entries} entries.
              \nYour chance to win is: ${chance}%
              \nType \`>lottery [amount]\` to buy entries for ${config.lotteryCost} credits each.`);
  } else if (!suffix[0].match(/[^0-9]/)) {
    let tickets = suffix[0];
    let cost = tickets * config.lotteryCost;
    let balance = await r.table("Accounts").get(msg.author.id).balance;
    if (cost > balance) {
      msg.reply(`This isn't a charity, get enough money first.`);
    } else {
      balance -= cost;
      r.table("Accounts").get(msg.author.id).update({balance: balance}).run(conn, (err, cursor) => {
        if (err) {
          winston.info(`[RethinkDB] Couldn't complete lottery transaction of user ${msg.author.id}: ${err}`);
          return msg.reply("Something went wrong, try again later.");
        } else {
          newNumber = currentNumber + entries;
          jackpot += cost;
          r.table("Lottery").insert({
            id: number,
            userID: msg.author.id,
            jackpot: jackpot,
          }).run(conn, (err, cursor) => {
            if (err) {
              winston.info(`[RethinkDB] Couldn't add ${entries} entries for user ${msg.author.id}: ${err}`);
              msg.reply("Something went wrong, please contact a dev.");
            } else {
              msg.reply(`You have bought ${entries} entries.
                        \nThe current jackpot is ${jackpot}.
                        \nYour chance to win is: ${(entries / newNumber) * 100}%`);
            }
          });
        }
      });
    }
  } else {
    msg.reply("What did you just input? Type: `>lottery [amount]`");
  }
};
