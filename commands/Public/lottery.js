module.exports = async(client, msg, suffix) => {
  comp = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  }
  let lottery = {};
  let unsortedLottery = await r.table("Lottery");
  let jackpot,
      totalEntries;
  if (unsortedLottery.length < 1) {
    id = 0;
    jackpot = 0;
    currentNumber = 0;
  } else {
    sortedLottery = await unsortedLottery.sort(comp);
    index = sortedLottery.length - 1;
    lottery = sortedLottery[index];
    id = lottery.id;
    jackpot = lottery.jackpot;
    currentNumber = lottery.number;
  }
  let account = await r.table("Accounts").get(msg.author.id).default(null);
  if (!account) {
    account = { id: msg.author.id, balance: 0 };
    await r.table("Accounts").insert(account);
    return msg.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
  }

  if (!suffix) {
    let ownedTickets = 0;
    let userEntries = await r.table("Lottery").filter({ userID: msg.author.id });
    for (let i in userEntries) {
      ownedTickets += userEntries[i].tickets;
    }
    let chance;
    if (currentNumber == 0) {
      chance = 0
    } else {
      chance = Math.round((ownedTickets / currentNumber) * 100);
    }
    msg.reply(`The current jackpot is ${jackpot} credits.\nYou have ${ownedTickets} entries.\nYour chance to win is: ${chance}%\nType \`>lottery [amount]\` to buy entries for ${config.lotteryCost} credits each.`);
  } else if (!suffix.match(/[^0-9]/)) {
    let tickets = Number(suffix);
    let cost = tickets * config.lotteryCost;
    let balance = account.balance;
    if (cost > balance) {
      msg.reply(`This isn't a charity, get enough money first.`);
    } else {
      balance -= cost;
      r.table("Accounts").get(msg.author.id).update({balance: balance}).then(async result => {
        let newNumber = currentNumber + tickets;
        let newJackpot = jackpot + cost;
        let newID = id + 1;
        r.table("Lottery").insert({
          id: newID,
          userID: msg.author.id,
          jackpot: newJackpot,
          number: newNumber,
          tickets: tickets,
        }).then(async result => {
          let ownedTickets = 0;
          let userEntries = await r.table("Lottery").filter({ userID: msg.author.id });
          for (let i in userEntries) {
            ownedTickets += userEntries[i].tickets;
          }
          msg.reply(`You have bought ${tickets} entries.\nThe current jackpot is ${newJackpot}.\nYour chance to win is: ${(Math.round(Number(ownedTickets) / Number(newNumber) * 100))}%`);
          client.apiSend(`:tickets: Someone just bought ${tickets} lottery tickets.`, config.logsChannel);
        }).catch(async err => {
          winston.info(`[RethinkDB] Couldn't add ${tickets} entries for user ${msg.author.id}: ${err}`);
          msg.reply("Something went wrong, please contact a dev.");
        });
      }).catch(async err => {
        winston.info(`[RethinkDB] Couldn't complete lottery transaction of user ${msg.author.id}: ${err}`);
        return msg.reply("Something went wrong, try again later.");
      });
    }
  } else {
    msg.reply("What did you just input? Type: `>lottery [amount]`");
  }
};
