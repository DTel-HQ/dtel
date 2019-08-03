const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const config = require("./Configuration/config.js");

const { ShardingManager } = require("discord.js");
const sharder = new ShardingManager("DiscordTel.js", {
	totalShards: Number(config.shardCount),
	respawn: true,
	token: require("./Configuration/auth.js").discord.token,
});

const winston = global.winston = createLogger({
	transports: [
		new transports.Console({
			colorize: true,
		}),
		new DailyRotateFile({
			filename: "./Logs/Winston-Log-%DATE%-ShardingManager.log",
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
		format.printf(info => `${info.level}: [Shard Master] ${info.message} [${info.timestamp}]`)
	),
});

// const node = new (require("veza"))("DTelIPC")
// 	.on("client.identify", client => winston.info(`[IPC] Client Connected ${client.name}`))
// 	.on("client.destroy", client => console.log(`[IPC] Client Destroyed: ${client.name}`))
// 	.serve(config.IPCPort);

sharder.on("shardCreate", shard => winston.info(`[Sharder] Spawned Shard ID: ${shard.id}`));

sharder.spawn();
