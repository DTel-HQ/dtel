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

Number(process.env.SHARD_ID) === 0 && scheduleJob({ hour: 0, minute: 0, second: 0 }, async() => { // does this work?
	// daily
	r.table("Accounts").update({daily: false}).run(conn, (err, cursor) => {
		if (err) winston.info(`[RethinkDB] Couldn't update dailies claimed: ${err}`);
	});
	// lottery
	let lottery = r.table("Lottery");
	r.table("Lottery").delete(); // instantly clear the entries
	r.table("Accounts").update({entries: 0}).run(conn, (err, cursor) => {
		if (err) winston.info(`[RethinkDB] Couldn't update entry count on accounts: ${err}`);
	});
	if (lottery[0]) {
		let lastEntry = lottery[lottery.length - 1];
		let winningNumber = Math.floor(Math.random() * lastEntry.id) + 1; // + 1, because tickets start at 1
		let winnerID;
		for (let entry in entries) {
			if (entry.id >= winningNumber) { // find winner
				winnerID = entry.userID;
				break;
			}
		}
		let balance = await r.table("Accounts").get(winnerID).balance;
		balance += lastEntry.jackpot;
		r.table("Accounts").get(winnerID).update({balance: balance}).run(conn, async (err, cursor) => {
			if (err) {
				winston.info(`[RethinkDB] Couldn't update balance of the lottery winner, ${winnerID} by +${lastEntry.jackpot}: ${err}`);
			} else {
				let user = await client.users.fetch(winnderID);
				user.send(`CONGRATS! You won the jackpot of ${lastEntry.jackpot} credits.`);
			}
		});
	}
});

Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

if (config.devMode) process.on("unhandledRejection", e => winston.error(e.stack));
