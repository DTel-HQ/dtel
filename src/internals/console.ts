// Not stolen code
// © SunburntRock89 2021
// © theLMGN 2021
// © Vlad Frangu 2019

import { transports, format, createLogger, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import chalk from "chalk";
import moment from "moment";
import path from "path";
import util from "util";
import config from "../Config/Config"; // oh i was just thinking the classes, dte

export default (type = "Master"): Logger => createLogger({
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 3,
		verbose: 4,
		silly: 5,
	},
	transports: [
		new transports.Console({
			level: config.winston.consoleLevel,
			format: format.combine(
				format.prettyPrint({ depth: 5 }),
				format.label({ label: `[DTel -- ${type}]` }),
				format.colorize(),
				format.timestamp({ format: () => `[${chalk.grey(moment().format("HH:mm:ss"))}]` }),
				format.printf(({ level, message, label, timestamp }) => `${timestamp} - ${level}: ${label} ${typeof message === "object" ? util.inspect(message, false, 2, true) : message}`),
			),
		}),
		new DailyRotateFile({
			level: config.winston.fileLevel,
			format: format.combine(
				format.prettyPrint(),
				format.printf(({ level, message }) => `(${moment().format("DD-MM-YYYY HH:mm:ss")}) (${level.toUpperCase()}) ${typeof message === "object" ? util.inspect(message, false, 2, false) : message}`),
				format.colorize(),
			),
			datePattern: `DD-MM-yyyy`,
			json: false,
			extension: ".log",
			// eslint-disable-next-line no-unused-vars
			filename: path.join(process.cwd(), `../Logs/%DATE%-DTel-${type}`),
		}),
	],
});

