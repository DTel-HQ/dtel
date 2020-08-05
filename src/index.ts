import { createLogger, format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { ShardingManager, Cluster, SharderEvents } from "kurasuta";
import { ClientOptions } from 'discord.js';

const sharder: ShardingManager = new ShardingManager(`${__dirname}/DiscordTel.js`, {
	clientOptions: { disableEveryone: true } as ClientOptions,
	token: require("./configuration/auth.js").discord.token,
});

const winston: Logger = createLogger({
	level: "info",
	transports: [
		new transports.Console({
			format: format.colorize(),
		}),
		new DailyRotateFile({
			filename: `./Logs/Winston-Log-%DATE%-Sharder.log`,
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
		format.printf((info: any) => `${info.level}: [Sharder] ${info.message} [${info.timestamp}]`)
		// format.simple(),
	),
});

sharder.once(SharderEvents.READY, (shard: Cluster)  => winston.info(`[Sharder] Spawned Shard ID: ${shard.id}`));

sharder.spawn();
