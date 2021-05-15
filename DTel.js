import { Collection } from "discord.js";
import { readdir } from "fs-nextra";
import * as auth from "./configuration/auth.js";
import * as clear from ("clear-module");
import { createLogger, format, transports } from "winston";
const DailyRotateFile = require("winston-daily-rotate-file");
const config = global.config = require("./configuration/config.js");
const aliases = global.aliases = require("./configuration/aliases.js");

module.exports = class extends require("kurasuta").BaseCluster {
	launch() {
		const client = global.client = this.client;

		(async() => {
			await require("./database/init")()
				.then(() => winston.info("[Database] Successfully connected to the database."))
				.catch(err => winston.error(`[Database] An error occured while initializing the database.\n${err}`));

			let events = await readdir("./events");
			for (let e of events) {
				let name = e.replace(".js", "");
				this.client.on(name, async(...args) => (await reload(`./events/${e}`))(...args));
			}
		})();

		const winston = global.winston = createLogger({
			level: "info",
			transports: [
				new transports.Console({
					colorize: true,
				}),
				new DailyRotateFile({
					filename: `./Logs/Winston-Log-%DATE%-Shard${this.client.shard.id}.log`,
					datePattern: "YYY-MM-DD-HH",
					zippedArchive: true,
					maxFiles: "100d",
					maxSize: "20m",
				}),
			],
			exitOnError: false,
			format: format.combine(
				format.colorize(),
				format.timestamp(),
				format.printf(info => `${info.level}: [Shard ${this.client.shard.id}] ${info.message} [${info.timestamp}]`),
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

		this.client.on("disconnect", () => this.client.login());

		// Scheduled jobs
		require("./internals/jobs.js");

		Object.assign(String.prototype, {
			escapeRegex() {
				const matchOperators = /[|\\{} ()[\]^$+*?.]/g;
				return this.replace(matchOperators, "\\$&");
			},
		});

		if (config.devMode) process.on("unhandledRejection", e => winston.error(e.stack));

		this.client.login(auth.discord.token).catch(() => {
			let interval = setInterval(() => {
				this.client.login(auth.discord.token)
					.then(() => {
						clearInterval(interval);
					})
					.catch(() => {
						winston.info("[Discord] Failed to connect. Retrying in 5 minutes...");
					});
			}, 300000);
		});
	}
};
