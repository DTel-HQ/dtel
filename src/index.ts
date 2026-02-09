if (process.env.NODE_ENV !== "production") {
	require("tsconfig-paths").register();
}

import { PrismaClient } from "./database/generated/client";
import { APITextChannel, REST, ShardClientUtil, ShardingManager } from "discord.js";
import auth from "./config/auth";
import config from "./config/config";
import Console from "./internals/console";
import { hangupInDb } from "./internals/calls/db/hangup-in-db/HangupInDb";
import { updateCacheWithBlacklistItem } from "./redis/operations/blacklist/UpdateCacheWithBlacklistItem";

// Main IPC process
// process.env.NODE_OPTIONS = `-r ts-node/register --no-warnings -r tsconfig-paths/register`;
if (process.env.NODE_ENV !== "production") {
	process.env.NODE_OPTIONS = " --inspect=0 --expose-gc";
}

// process.env.TS_NODE_PROJECT = `${__dirname}/../tsconfig.json`;
// process.env.TS_NODE_CWD = `${__dirname}/../`;
const fileName = process.env.NODE_ENV === "production" ? "dtel.js" : "dtel.ts";
const sharder = new ShardingManager(`${__dirname}/${fileName}`, {
	totalShards: config.shardCount,
	token: auth.discord.token,
});

const winston = Console("Master");

const shardsReady: number[] = [];
sharder.on("shardCreate", shard => {
	winston.info(`Spawned shard ID: ${shard.id}`);

	shard.on("message", async message => {
		switch (message.msg) {
			case "callEnded":
			case "callInitiated": {
				await sharder.broadcast(message);
				break;
			}

			case "ready": {
				if (shardsReady.includes(message.shardID)) {
					winston.info(`Shard ${message.shardID} is recovering from an issue...`);
					await sharder.broadcast({ msg: "resume", shardID: message.shardID });
				} else {
					shardsReady.push(message.shardID);

					if (shardsReady.length === config.shardCount) {
						winston.info("All shards spawned, starting calls and jobs...");
						await sharder.broadcast({ msg: "allShardsSpawned" });

						await allShardsReady();
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

		let fromShard: number | undefined;
		let toShard: number | undefined;

		try {
			fromShard = await shardIdForChannelId(call.from.channelID); // Primary shard
			// Check to make sure we still have both sides
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			toShard = await shardIdForChannelId(call.to.channelID); // Primary shard
			await sharder.broadcast({
				msg: "resetCallReminderAndCache",
				callDoc: call,
				targetShard: fromShard,
			});
		} catch (error) {
			console.log(`Failed to get shard for ${call.id}`, error);
			hangupInDb(call, "shard-lookup-failure").catch(() => null);

			await sendFailMessageToChannel(call.from.channelID, "Failed to get shard for this call. The call will be ended.").catch(() => null);
			await sendFailMessageToChannel(call.to.channelID, "Failed to get shard for this call. The call will be ended.").catch(() => null);

			continue;
		}
	}

	try {
		await db.blacklist.findMany().then(allBlacklist => {
			allBlacklist.map(item => updateCacheWithBlacklistItem(item.id));
		});
	} catch (error) {
		winston.error("Failed to populate blacklist cache on startup", error);
	}

	await db.$disconnect();
};

function sendFailMessageToChannel(channelId: string, message: string): Promise<unknown> {
	return rest.post(`/channels/${channelId}/messages`, {
		body: {
			content: message,
		},
	});
}

winston.info("Spawning shards...");
void sharder.spawn();
