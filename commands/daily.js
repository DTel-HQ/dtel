const { get } = require("snekfetch");
const MessageBuilder = require("../modules/MessageBuilder");
const permCheck = require("../modules/permChecker");

module.exports = async(client, msg, suffix) => {
	let account;
	try {
		account = await Accounts.findOne({ _id: msg.author.id });
		if (!account) throw new Error("Lol you dont have an account");
	} catch (err) {
		account = await Accounts.create(new Accounts({ _id: msg.author.id, balance: 0 }));
		msg.reply("You don't have an account created... Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
	}
	if (account.dailyclaim) {
		return msg.reply("You already claimed your daily credits!");
	}
	let perms = await permCheck(client, msg.author.id);
	let toGive = 120;
	if (perms.boss) {
		toGive = 300;
	} else if (perms.support) {
		toGive = 200;
	}
	if (!toGive) {
		let snekres;
		try {
			snekres = await get("https://discordbots.org/api/bots/377609965554237453/votes?onlyids=true").set({ "content-type": "application/json", Authorization: process.env.DBL_ORG_TOKEN });
		} catch (err) {
			msg.reply("Could not reach discordbots.org. Please try again later");
		}
		if (snekres) {
			if (snekres.body.includes(msg.author.id)) {
				if (perms.support) {
					toGive = 260;
				} else {
					toGive = 180;
				}
			}
		}
	}
	if (toGive) {
		account.balance += toGive;
		account.dailyClaimed = true;
		await account.save();
		await client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
			content: `:calendar: ${msg.author.tag} (${msg.author.id}) claimed ${toGive} daily credits.`,
		}));
		if (toGive == 120) {
			msg.reply("Here's your 120 credits! You can claim again after 01:00 CET (Approx. 23:00 UTC in summer, 00:00 UTC in winter).\nGet 60 more credits daily by upvoting at https://discordbots.org/bot/377609965554237453!");
		} else if (toGive >= 180) {
			msg.reply("Here's your 190 credits! You can claim again after 01:00 CET (Approx. 23:00 UTC in summer, 00:00 UTC in winter).\nRemember to keep upvoting us at https://discordbots.org/bot/377609965554237453!");
		}
	} else {
		msg.reply("Catastrophic Failure");
	}
};
