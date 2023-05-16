import { PrismaClient, Prisma } from "@prisma/client";
import { r } from "rethinkdb-ts";
import colors from "ansi-colors";
import cliProgress from "cli-progress";
import { writeFile } from "fs/promises";
import dayjs from "dayjs";

const prisma = new PrismaClient();

const barOpts = (model: string) => ({
	format: `${model} |${colors.cyan("{bar}")}| {percentage}% || {value}/{total} Chunks`,
	barCompleteChar: "\u2588",
	barIncompleteChar: "\u2591",
	hideCursor: true,
});

// NOTE: We're not moving number.promote -- it's kinda broken, not implemented and barely used

// BROKEN NUMBER: 03018327192
// 03010392948
// 03018374828 uc
// 03017897897 uc
// 03016009967 uc
// Channels with 2 numbers that need addressed:
// 790722577189699631
// 885528133183361154
// 961539252242509844

// console.log(allStrikes.filter(s => Object.keys(s).length == 4)[0]);

const moveNumbers = async() => {
	const toInsert: Prisma.NumbersCreateManyInput[] = [];
	const allNumbers = await r.table("Numbers").run();
	const numbersBar = new cliProgress.SingleBar(barOpts("Numbers"));

	numbersBar.start(allNumbers.length, 0);

	for (const number of allNumbers) {
		try {
			const preExist = toInsert.find(n => n.channelID === number.channel);
			if (preExist) {
				console.log("!!");
				console.log(preExist);
			}

			toInsert.push({
				number: number.id,
				channelID: number.channel,
				guildID: number.guild,

				blocked: number.blocked,
				expiry: new Date(number.expiry),

				createdAt: number.createdAt,
				waiting: number.waiting,

				mentions: number.mentions,

				contacts: number.contacts,
				vip: number.vip ? {
					name: number.vip.name || "",
					hidden: number.vip.hidden,
					expiry: new Date(number.vip.expiry),
				} : undefined,
			});
		} catch (e) {
			console.log(` [Numbers] ${number.id} failed.`);
			throw e;
		}
		numbersBar.increment();
	}

	console.info("[Numbers] Pushing to DB...");
	const res = await prisma.numbers.createMany({ data: toInsert });
	console.info(`[Numbers] Successfully pushed ${res.count} records to DB.`);
};

const moveBlacklist = async() => {
	const toInsert: Prisma.BlacklistCreateManyInput[] = [];
	const allBlacklist = await r.table("Blacklist").run();
	const blacklistBar = new cliProgress.SingleBar(barOpts("Blacklist"));

	blacklistBar.start(allBlacklist.length, 0);

	for (const user of allBlacklist) {
		try {
			toInsert.push({
				id: user.id,
				reason: user.reason,
			});
		} catch (e) {
			console.log(`[Blacklist] ${user.id} failed.`);
			throw e;
		}
		blacklistBar.increment();
	}

	console.info("[Blacklist] Pushing to DB...");
	const res = await prisma.blacklist.createMany({ data: toInsert });
	console.info(`[Blacklist] Successfully pushed ${res.count} records to DB.`);
};

const moveStrikes = async() => {
	const toInsert: Prisma.StrikesCreateManyInput[] = [];
	const allStrikes = await r.table("Strikes").run();
	const strikesBar = new cliProgress.SingleBar(barOpts("Strikes"));

	strikesBar.start(allStrikes.length, 0);


	for (const strike of allStrikes) {
		try {
			toInsert.push({
				id: strike.id,
				reason: strike.reason,
				created: {
					set: {
						at: new Date(strike.date || Date.now()),
						by: strike.creator,
					},
				},
				offender: strike.offender,
				// eslint-disable-next-line no-extra-boolean-cast
				type: strike.user == true || strike.user === undefined ? "USER" : "GUILD",
			});
		} catch (e) {
			console.log(`[Strikes] ${strike.id} failed.`);
			throw e;
		}
		strikesBar.increment();
	}

	console.info("[Strikes] Pushing to DB...");
	const res = await prisma.strikes.createMany({ data: toInsert });
	console.info(`[Strikes] Successfully pushed ${res.count} records to DB.`);
};

const moveAccounts = async() => {
	const toInsert: Prisma.AccountsCreateManyInput[] = [];
	const allAccounts = await r.table("Accounts").run();
	const accountsBar = new cliProgress.SingleBar(barOpts("Accounts"));

	accountsBar.start(allAccounts.length, 0);

	for (const account of allAccounts) {
		const notToday = new Date();
		notToday.setDate(29);
		notToday.setMonth(11);
		notToday.setFullYear(2022);
		try {
			toInsert.push({
				id: account.id,
				balance: account.balance,
				vipMonthsRemaining: account.vip || 0,
				dailyClaimedAt: notToday,
			});
		} catch (e) {
			console.log(`[Accounts] ${account.id} failed.`);
			throw e;
		}
		accountsBar.increment();
	}

	console.info("[Accounts] Pushing to DB...");
	const res = await prisma.accounts.createMany({ data: toInsert });
	console.info(`[Accounts] Successfully pushed ${res.count} records to DB.`);
};

interface rdbMailboxMessage {
	from: string,
	number: string,
	message: string,
	time: number,
	id: string,
	user: string,
}

const moveMailbox = async() => {
	const toInsert: Prisma.MailboxCreateManyInput[] = [];
	const allWhitelist = await r.table("Mailbox").run();
	const mailboxBar = new cliProgress.SingleBar(barOpts("Mailbox"));

	const allNumbers = await r.table("Numbers").run();

	mailboxBar.start(allWhitelist.length, 0);

	for (const mailbox of allWhitelist) {
		try {
			const num = allNumbers.find(n => n.channel === mailbox.id);
			if (!num) {
				mailboxBar.increment();
				continue;
			}

			const messages: Prisma.mailboxMessageCreateInput = mailbox.messages?.map((message: rdbMailboxMessage) => ({
				id: message.id,
				from: message.from || message.number,
				message: message.message,
				sent: {
					at: new Date(message.time || Date.now()),
					by: message.user,
				},
			}));

			toInsert.push({
				number: num.id,
				autoreply: mailbox.autoreply,
				receiving: true,
				messages,
			});
		} catch (e) {
			console.log(`[Mailbox] ${mailbox.id} failed.`);
			throw e;
		}
		mailboxBar.increment();
	}

	console.info("[Mailbox] Pushing to DB...");
	const res = await prisma.mailbox.createMany({ data: toInsert });
	console.info(`[Mailbox] Successfully pushed ${res.count} records to DB.`);
};

const moveCalls = async() => {
	const activeCallsToInsert: Prisma.ActiveCallsCreateManyInput[] = [];
	const callMessagesToInsert: Prisma.CallMessagesCreateManyInput[] = [];

	const allActiveCalls = await r.table("Calls").run();
	// const activeCallsBar = new cliProgress.SingleBar(barOpts("Calls"));
	// const archivedCallsBar = new cliProgress.SingleBar(barOpts("ArchivedCalls"));
	// const messagesBar = new cliProgress.SingleBar(barOpts("CallMessages"));

	console.info("\n[Calls] Formatting for Mongo push");
	// activeCallsBar.start(allActiveCalls.length, 0);

	for (const currentCall of allActiveCalls) {
		try {
			activeCallsToInsert.push({
				id: currentCall.id,
				fromNum: currentCall.from.number,
				toNum: currentCall.to.number,
				started: {
					at: new Date(currentCall.startedAt),
					by: currentCall.startedBy,
				},
				pickedUp: currentCall.pickedUp ? {
					at: new Date(currentCall.pickedUp),
					by: currentCall.pickedUpBy,
				} : undefined,
				hold: {
					onHold: !!currentCall.onHold,
					holdingSide: currentCall.from.channel == currentCall.onHold ? "FROM" : "TO",
				},

				randomCall: currentCall.rcall,
			});

			for (const message of currentCall.messages) {
				callMessagesToInsert.push({
					callID: currentCall.id,
					forwardedMessageID: message.dtelmsg || "unknown",
					originalMessageID: message.umsg,
					sender: message.user,
					sentAt: new Date(message.time),
				});
				// messagesBar.increment();
			}
		} catch (e) {
			console.log(`[Calls] ${currentCall.id} failed.`);
			throw e;
		}
		// activeCallsBar.increment();
	}

	const allOldCalls = await r.table("OldCalls").run();
	const archivedCallsToInsert: Prisma.ArchivedCallsCreateManyInput[] = [];

	console.log("\n[Archived Calls] Formatting for Mongo push");
	// archivedCallsBar.start(allOldCalls.length, 0);
	// messagesBar.start(allOldCalls.map(c => c.messages?.length || 0).reduce((a, b) => a + b), 0);

	for (const oldCall of allOldCalls) {
		try {
			const doc = {
				id: oldCall.id,

				fromNum: oldCall.from.number,
				toNum: oldCall.to.number,

				started: {
					at: oldCall.startedAt ? new Date(oldCall.startedAt) : new Date(0),
					by: oldCall.startedBy || "Unknown",
				},

				pickedUp: oldCall.pickedUp ? {
					at: new Date(oldCall.pickedUp),
					by: oldCall.pickedUpBy || "Unknown",
				} : null,

				hold: {
					onHold: !!oldCall.onHold,
					holdingSide: oldCall.from.channel == oldCall.onHold ? "FROM" : "TO",
				},

				ended: {
					at: oldCall.hungUpAt ? new Date(oldCall.hungUpAt) : new Date(0),
					by: oldCall.hungupBy || "Unknown",
				},

				randomCall: oldCall.rcall,
			};
			archivedCallsToInsert.push(doc);

			if (!oldCall.messages || dayjs().subtract(2, "weeks").toDate() > doc.ended.at) continue;

			for (const message of oldCall.messages) {
				callMessagesToInsert.push({
					callID: oldCall.id,
					forwardedMessageID: message.dtelmsg || "unknown",
					originalMessageID: message.umsg,
					sender: message.user,
					sentAt: new Date(message.time),
				});

				// messagesBar.increment();
			}
		} catch (e) {
			console.log(`[Archived Calls] ${oldCall.id} failed.`);
			throw e;
		}
		// archivedCallsBar.increment();
	}
	// callMessagesToInsert = callMessagesToInsert.filter((v, i, a) => a.indexOf(v) === i);

	for (const i of require("./callMessagesToRemove.js")) {
		console.log(`removing from ${i.callID}`);
		const msg = callMessagesToInsert.find(c => c.forwardedMessageID === i.forwardedMessageID)!;
		callMessagesToInsert.splice(callMessagesToInsert.indexOf(msg), 1);
	}

	// for (const message of callMessagesToInsert) {
	// 	const messages = callMessagesToInsert.filter(m => m.originalMessageID === message.originalMessageID || m.forwardedMessageID === message.forwardedMessageID);
	// 	if (messages.length == 1) continue;
	// 	console.log(message);

	// 	callMessagesToInsert.splice(callMessagesToInsert.indexOf(message), 1);
	// }

	console.info("[Calls] Pushing to DB...");
	const callRes = await prisma.activeCalls.createMany({ data: activeCallsToInsert });
	console.info(`[Calls] Successfully pushed ${callRes.count} records to DB.`);

	console.info("\n\n[Archived Calls] Pushing to DB...");
	try {
		for (let i = 0; i < archivedCallsToInsert.length; i += 1000) {
			const records = archivedCallsToInsert.slice(i, i + 1000);
			await prisma.archivedCalls.createMany({ data: records });
		}
		console.log("[Archived Calls] Successfully pushed all records to DB.");
	} catch (e: unknown) {
		await writeFile("archivedCallError.json", (e as object).toString());
		console.log(e);
		process.exit();
	}

	console.info("[Call Messages] Pushing to DB...");
	try {
		const messagesRes = await prisma.callMessages.createMany({ data: callMessagesToInsert });
		console.info(`[Call Messages] Successfully pushed ${messagesRes.count} records to DB.`);
	} catch (e: unknown) {
		await writeFile("callMessageError.json", (e as object).toString());
		console.log(e);
		process.exit();
	}
};

const moveWhitelist = async() => {
	const toInsert: Prisma.GuildConfigsCreateManyInput[] = [];
	const allWhitelist = await r.table("Whitelist").run();
	const whitelistBar = new cliProgress.SingleBar(barOpts("Whitelist/GuildConfigs"));

	whitelistBar.start(allWhitelist.length, 0);

	for (const whitelist of allWhitelist) {
		try {
			toInsert.push({
				id: whitelist.id,
				whitelisted: true,
			});
		} catch (e) {
			console.log(`[Whitelist/GuildConfigs] ${whitelist.id} failed.`);
			throw e;
		}
		whitelistBar.increment();
	}

	console.info("[GuildConfigs] Pushing to DB...");
	const res = await prisma.guildConfigs.createMany({ data: toInsert });
	console.info(`[GuildConfigs] Successfully pushed ${res.count} records to DB.`);
};

const movePhonebook = async() => {
	const toInsert: Prisma.PhonebookCreateManyInput[] = [];
	const allPhonebook = await r.table("Phonebook").run();
	const phonebookBar = new cliProgress.SingleBar(barOpts("Phonebook"));

	const allNumbers = await r.table("Numbers").run();

	phonebookBar.start(allPhonebook.length, 0);

	for (const phonebook of allPhonebook) {
		try {
			const num = allNumbers.find(n => n.id === phonebook.id);
			if (!num) {
				phonebookBar.increment();
				continue;
			}

			toInsert.push({
				number: num.id,
				description: phonebook.description,
			});
		} catch (e) {
			console.log(`[Phonebook] ${phonebook.id} failed.`);
			throw e;
		}
		phonebookBar.increment();
	}

	console.info("[Phonebook] Pushing to DB...");
	const res = await prisma.phonebook.createMany({ data: toInsert });
	console.info(`[Phonebook] Successfully pushed ${res.count} records to DB.`);
};

const moveVotes = async() => {
	const toInsert: Prisma.VotesCreateManyInput[] = [];
	const allVotes = await r.table("Votes").run();
	const votesBar = new cliProgress.SingleBar(barOpts("Votes"));

	for (const votes of allVotes) {
		try {
			toInsert.push({
				userID: votes.id,
				count: votes.amount,
			});
		} catch (e) {
			console.log(`[Votes] ${votes.id} failed.`);
			throw e;
		}
		votesBar.increment();
	}

	console.info("[Votes] Pushing to DB...");
	const res = await prisma.votes.createMany({ data: toInsert });
	console.info(`[Votes] Successfully pushed ${res.count} records to DB.`);
};


(async() => {
	const rpool = await r.connectPool({
		server: "localhost",
		user: "admin",
		password: "",
		db: "DiscordTel",
	});

	await r.table("Numbers").get("03012103214").delete().run();
	await r.table("Phonebook").get("03012103214").delete().run();
	await r.table("Mailbox").get("03012103214").delete().run();

	await r.table("Numbers").get("03015626666").delete().run();
	await r.table("Phonebook").get("03015626666").delete().run();
	await r.table("Mailbox").get("03015626666").delete().run();

	await prisma.activeCalls.deleteMany();
	await prisma.archivedCalls.deleteMany();
	await prisma.blacklist.deleteMany();
	await prisma.strikes.deleteMany();
	await prisma.votes.deleteMany();
	await prisma.accounts.deleteMany();
	await prisma.phonebook.deleteMany();
	await prisma.numbers.deleteMany();
	await prisma.mailbox.deleteMany();
	await prisma.callMessages.deleteMany();
	await prisma.guildConfigs.deleteMany();


	await moveNumbers();
	await moveBlacklist();
	await moveStrikes();
	await moveAccounts();
	await moveMailbox();
	await moveCalls();
	await moveWhitelist();
	await movePhonebook();
	await moveVotes();
})();

/*
[
//   'Accounts',
//   'Blacklist',
//   'Calls',
//   'Cooldowns',
//   'Lottery',
//   'Mailbox',
//   'Numbers',
//   'OldCalls',
//   'Phonebook',
//   'Strikes',
//   'Votes',
//   'Whitelist'
]
*/
