const clear = require("clear-module");

const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const config = global.config = require("./Configuration/config.js");

const { Collection } = require("discord.js");
const { readdir } = require("fs-nextra");

(async() => {
	await require("./Database/init")()
		.then(() => winston.info("[Database] Successfully connected to the database."))
		.catch(err => winston.error(`[Database] An error occured while initializing the database.\n${err}`));

	let events = await readdir("./Events");
	for (let e of events) {
		let name = e.replace(".js", "");
		client.on(name, async(...args) => (await reload(`./Events/${e}`))(...args));
	}

	let structures = await readdir("./Structures");
	for (let i of structures) if (i.endsWith(".js")) require(`./Structures/${i}`)();
})();


const client = global.client = new (require("./Internals/Client"))({
	disableEveryone: true,
});

const winston = global.winston = createLogger({
	transports: [
		new transports.Console({
			colorize: true,
		}),
		new DailyRotateFile({
			filename: `./Logs/Winston-Log-%DATE%-Shard${client.shard.ids[0]}.log`,
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
		format.printf(info => `${info.level}: [Shard ${client.shard.ids[0]}] ${info.message} [${info.timestamp}]`)
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

scheduleJob("0 0 0 * * *", async() => {
	if (client.shard != 0) return;
	// Daily reset
	await r.table("Accounts").update({ daily: false });

	// Lottery winner & reset
	let lottery = await r.table("Lottery");
	await r.table("Lottery").delete();
	if (lottery.length) {
		await lottery.sort((a, b) => a.id < b.id ? -1 : 1);
		let lastEntry = lottery[lottery.length - 1];
		let winningNumber = Math.round(Math.random() * lastEntry.number) + 1;

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

		await r.table("Accounts").get(winnerID).update({ balance: balance });
		let user = await client.users.fetch(winnerID);
		user.send(`CONGRATS! You won the jackpot of ${lastEntry.jackpot} credits.`);
	}

	return client.log(`:white_check_mark: The lottery and dailies have been reset.`);
});

Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{} ()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

if (config.devMode) process.on("unhandledRejection", e => winston.error(e.stack));
