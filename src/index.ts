import { ShardingManager } from "discord.js";
import auth from "./config/auth";
import config from "./config/config";
import Console from "./internals/console";

// Main IPC process
const sharder = new ShardingManager(`${__dirname}/dtel.js`, {
	totalShards: config.shardCount,
	token: auth.discord.token,
});


const winston = Console("Master");

sharder.on("shardCreate", shard => {
	winston.info(`Spawned shard ID: ${shard.id}`);

	shard.on("message", message => {
		switch (message.msg) {
			case "callInitiated": {
				sharder.broadcast(message);
			}
		}
	});
});

winston.info("Spawning shards...");
sharder.spawn();
