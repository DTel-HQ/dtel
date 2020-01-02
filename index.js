const { createLogger, format, transports } = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const config = require("./Configuration/config.js");

// const { ShardingManager } = require("discord.js");
// const sharder = new ShardingManager("DiscordTel.js", {
// 	totalShards: Number(config.shardCount),
// 	respawn: true,
// 	token: require("./Configuration/auth.js").discord.token,
// });

const { ShardingManager } = require("kurasuta");
const Discord = require("discord.js");

let structures = require("fs").readdirSync(`${__dirname}/Structures`);
for (let i of structures) {
	console.log(`Loading: ${i}`);
	if (i.endsWith(".js")) require(`${__dirname}/Structures/${i}`)(Discord);
}
const sharder = new ShardingManager(`${__dirname}/DiscordTel.js`, {
	clientOptions: { disableEveryone: true },
	client: require("./Internals/Client.js")(Discord),
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
		format.printf(info => `${info.level}: [Shard Master] ${info.message} [${info.timestamp}]`),
	),
});

// sharder.on("spawn", shard => winston.info(`[Sharder] Spawned Shard ID: ${shard.id}`));

sharder.spawn();
