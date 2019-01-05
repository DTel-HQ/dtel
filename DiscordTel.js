const clear = require("clear-require");

const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const config = global.config = require("./Configuration/config.js");

const { Collection } = require("discord.js");
const { readdir } = require("fs-nextra");
const { scheduleJob } = require("node-schedule");

(async() => {
	await require("./Database/init")()
		.then(() => winston.info("[Database] Successfully connected to the database."))
		.catch(err => winston.info(`[Database] An error occured while initializing the database.\n${err}`));

	let events = await readdir("./Events");
	for (let e of events) {
		let name = e.replace(".js", "");
		client.on(name, (...args) => require(`./Events/${e}`)(...args));
	}
})();
let structures = require("fs").readdirSync("./Structures");
for (let i of structures) if (i.endsWith(".js")) require(`./Structures/${i}`)();

const client = global.client = new (require("./Internals/Client"))({
	disableEveryone: true,
});

const winston = global.winston = createLogger({
	transports: [
		new transports.Console({
			colorize: true,
		}),
		new DailyRotateFile({
			filename: `./Logs/Winston-Log-%DATE%-Shard${client.shard.id}.log`,
			datePattern: "YYY-MM-DD-HH",
			zippedArchive: true,
			maxFiles: "14d",
			maxSize: "20m",
		}),
	],
	exitOnError: false,
	format: format.combine(
		format.colorize(),
		format.timestamp(),
		format.printf(info => `${info.level}: [Shard ${client.shard.id}] ${info.message} [${info.timestamp}]`)
		// format.simple(),
	),
});

const reload = global.reload = path => new Promise((res, rej) => {
	clear(path);
	try {
		let file = require(path);
		if (!file) res(null);
		res(file);
	} catch (err) {
		res(null);
	}
});

client.login().catch(() => {
	let interval = setInterval(() => {
		client.login()
			.then(() => {
				clearInterval(interval);
			})
			.catch(() => {
				winston.info("[Discord] Failed to connect. Retrying in 5 minutes...");
			});
	}, 300000);
});

client.on("disconnect", () => client.login());

// does this work?
Number(process.env.SHARD_ID) === 0 && scheduleJob({ date: 1, hour: 0, minute: 0, second: 0 }, async() => {
	// daily
	r.table("Accounts").update({ daily: false }).catch(err => {
		winston.info(`[RethinkDB] Couldn't update dailies claimed: ${err}`);
	});

	// lottery
	let unsortedLottery = await r.table("Lottery");
	// instantly clear the entries
	r.table("Lottery").delete().catch(err => {
		winston.info(`Couldn't clear lottery: ${err}`);
	});

	if (unsortedLottery.length > 0) {
		const comp = (a, b) => {
			if (a.id < b.id) {
				return -1;
			}
			if (a.id > b.id) {
				return 1;
			}
			return 0;
		};
		let lottery = await unsortedLottery.sort(comp);

		let lastEntry = lottery[lottery.length - 1];
		// + 1, because tickets start at 1
		let winningNumber = Math.round(Math.random() * lastEntry.id) + 1;
		console.log(winningNumber);
		let winnerID;
		for (let i in lottery) {
			// find winner
			if (lottery[i].number >= winningNumber) {
				winnerID = lottery[i].userID;
				console.log(`Winning Number: ${winningNumber}, winning ID: ${lottery[i].id}, winning person: ${winnerID}`);
				break;
			}
		}
		let account = await r.table("Accounts").get(winnerID).default(null);
		let balance = account.balance;
		balance += lastEntry.jackpot;
		r.table("Accounts").get(winnerID).update({ balance: balance })
			.then(async result => {
				let user = await client.users.fetch(winnerID);
				user.send(`CONGRATS! You won the jackpot of ${lastEntry.jackpot} credits.`);
			})
			.catch(async err => {
				winston.info(`[RethinkDB] Couldn't update balance of the lottery winner, ${winnerID} by +${lastEntry.jackpot}: ${err}`);
			});
	}
	client.apiSend(`:white_check_mark: The lottery and dailies have been reset.`, config.logsChannel);
});

Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

if (config.devMode) process.on("unhandledRejection", e => winston.error(e.stack));
