const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const numberSchema = require("./numberSchema");
const callSchema = require("./callSchema");
const phonebookSchema = require("./phonebookSchema");
const accountSchema = require("./accountSchema");
const mailboxSchema = require("./mailboxSchema");
const blacklistSchema = require("./blacklistSchema");
const oldCallSchema = require("./oldCallSchema");
const lotterySchema = require("./lotterySchema");
const strikeSchema = require("./strikeSchema");
const addToGlobal = (name, val) => {
	global[name] = val;
};
exports.initialize = url => new Promise((resolve, reject) => {
	mongoose.connect(url, {
		useMongoClient: true,
		promiseLibrary: global.Promise,
	});
	const [
		Numbers,
		Calls,
		Phonebook,
		Accounts,
		Mailbox,
		Blacklist,
		OldCalls,
		Lottery,
		Strikes,
	] = [
		mongoose.model("numbers", numberSchema),
		mongoose.model("calls", callSchema),
		mongoose.model("phonebook", phonebookSchema),
		mongoose.model("accounts", accountSchema),
		mongoose.model("mailbox", mailboxSchema),
		mongoose.model("blacklist", blacklistSchema),
		mongoose.model("oldCalls", oldCallSchema),
		mongoose.model("lottery", lotterySchema),
		mongoose.model("strikes", strikeSchema),
	];
	mongoose.connection
		.on("error", err => reject(err))
		.once("open", () => {
			addToGlobal("Numbers", Numbers);
			addToGlobal("Calls", Calls);
			addToGlobal("Phonebook", Phonebook);
			addToGlobal("Accounts", Accounts);
			addToGlobal("Mailbox", Mailbox);
			addToGlobal("Blacklist", Blacklist);
			addToGlobal("OldCalls", OldCalls);
			addToGlobal("Lottery", Lottery);
			addToGlobal("Strikes", Strikes);
			addToGlobal("Database", {
				Numbers, numbers: Numbers,
				Calls, calls: Calls,
				Phonebook, phonebook: Phonebook,
				Accounts, accounts: Accounts,
				Mailbox, mailbox: Mailbox,
				Blacklist, blacklist: Blacklist,
				OldCalls, oldCalls: OldCalls,
				Lottery, lottery: Lottery,
				Strikes, strikes: Strikes,
				Raw: mongoose.connection,
			});
			resolve(global.Database);
		});
});

exports.get = exports.getConnection = () => global.Database;
