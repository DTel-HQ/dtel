import { APITextChannel, REST, ShardClientUtil, ShardingManager } from "discord.js";
import auth from "./config/auth";
import config from "./config/config";
import Console from "./internals/console";
import { PrismaClient } from "@prisma/client";

// Main IPC process
const sharder = new ShardingManager(`${__dirname}/dtel.js`, {
	totalShards: config.shardCount,
	token: auth.discord.token,
});

const winston = Console("Master");

const shardsReady: number[] = [];
sharder.on("shardCreate", shard => {
	winston.info(`Spawned shard ID: ${shard.id}`);

	shard.on("message", message => {
		switch (message.msg) {
			case "callEnded":
			case "callInitiated": {
				sharder.broadcast(message);
				break;
			}

			case "ready": {
				if (shardsReady.includes(message.shardID)) {
					winston.info(`Shard ${message.shardID} is recovering from an issue...`);
					sharder.broadcast({ msg: "resume", shardID: message.shardID });
				} else {
					shardsReady.push(message.shardID);

					if (shardsReady.length === config.shardCount) {
						winston.info("All shards spawned, starting calls and jobs...");
						sharder.broadcast({ msg: "allShardsSpawned" });

						allShardsReady();
					}
				}

				break;
			}
		}
	});
});

const rest = new REST({ version: "9" }).setToken(auth.discord.token);

const shardIdForChannelId = async(id: string) => {
	if (config.shardCount == 1) return 0;
	const channelObject = await rest.get(`/channels/${id}`) as APITextChannel;

	if (!channelObject.guild_id) return 0;

	return ShardClientUtil.shardIdForGuildId(channelObject.guild_id, config.shardCount);
};

const allShardsReady = async(): Promise<void> => {
	const db = new PrismaClient();

	const allCalls = await db.activeCalls.findMany({
		include: {
			to: {
				include: {
					guild: true,
				},
			},
			from: {
				include: {
					guild: true,
				},
			},
		},
	});


	for (const call of allCalls) {
		if (!call.from || !call.to) continue;
		console.log(`Processing ${call.id} on sharder`);

		let fromShard: number, toShard: number;

		try {
			fromShard = await shardIdForChannelId(call.from.channelID); // Primary shard

			toShard = await shardIdForChannelId(call.to.channelID); // Secondary shard
		} catch {
			console.log(`Failed to get shard for ${call.id}. It needs to be ended.`);
			continue;
		}

		sharder.broadcast({
			msg: "callResume",
			callDoc: call,

			fromShard,
			toShard,
		});
	}

	db.$disconnect();
};

winston.info("Spawning shards...");
sharder.spawn();
