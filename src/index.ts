//import { createLogger, format, transports, Logger } from "winston";
//import DailyRotateFile from "winston-daily-rotate-file";
import { Master } from "eris-sharder";

new Master(require("./configuration/auth.js").discord.token,
	`${__dirname}/discordtel.js`,
	{ clientOptions: { allowedMentions: { everyone: false, roles: true, users: true } } }
);

//const winston: Logger = createLogger({
//	level: "info",
//	transports: [
//		new transports.Console({
//			format: format.colorize(),
//		}),
//		new DailyRotateFile({
//			filename: `./Logs/Winston-Log-%DATE%-Sharder.log`,
//			datePattern: "YYY-MM-DD-HH",
//			zippedArchive: true,
//			maxFiles: "100d",
//			maxSize: "20m",
//		}),
//	],
//	exitOnError: false,
//	format: format.combine(
//		format.colorize(),
//		format.timestamp(),
//		format.printf((info: any) => `${info.level}: [Sharder] ${info.message} [${info.timestamp}]`)
//		// format.simple(),
//	),
//});

//sharder.once(SharderEvents.READY, (shard: Cluster)  => winston.info(`[Sharder] Spawned Shard ID: ${shard.id}`));

//sharder.start(); shard is automatically started in the constructor
