import { createLogger, format, transports, Logger } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import { readdir } from "fs-nextra";
import { ShardingManager, Cluster, SharderEvents } from "kurasuta";
import * as Discord from "discord.js"

(async(): Promise<void> => {
	let structures: any = readdir(`${__dirname}/Structures`, (err, files) => {if (!err) return files; else console.log(err);});
	for (let i of structures) {
		console.log(`Loading: ${i}`);
		if (i.endsWith(".js")) require(`${__dirname}/Structures/${i}`)(Discord);
	}
})();

const sharder: ShardingManager = new ShardingManager(`${__dirname}/DiscordTel.js`, {
	clientOptions: { disableEveryone: true },
	client: require("./Internals/Client.js")(Discord),
	token: require("./Configuration/auth.js").discord.token,
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
