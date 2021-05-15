import { createLogger, format, transports } from "winston";
const DailyRotateFile = require("winston-daily-rotate-file");
import * as auth from "./configuration/auth.js";

// import * as config from "./configuration/config.js";

// const { ShardingManager } = require("discord.js");
// const sharder = new ShardingManager("DiscordTel.js", {
// 	totalShards: Number(config.shardCount),
// 	respawn: true,
// 	token: require("./configuration/auth.js").discord.token,
// });

import { ShardingManager } from "kurasuta";
const Discord = require("discord.js");

let structures = require("fs").readdirSync(`${__dirname}/structures`);
for (let i of structures) {
	console.log(`Loading: ${i}`);
	if (i.endsWith(".js")) require(`${__dirname}/structures/${i}`)(Discord);
}
const sharder = new ShardingManager(`${__dirname}/dtel.js`, {
	clientOptions: { disableMentions: "everyone" },
	client: require("./internals/Client.js")(Discord),
	token: auth.discord.token,
	clusterCount: 1,
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
