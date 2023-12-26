import { populateBlacklistCache } from "./database/db";
import SharderMessageEvent from "./events/sharderMessage";
import CallClient from "./internals/callClient.old";
import { Collection } from "discord.js";
import { prepareClient } from "./instances/client";

populateBlacklistCache();
prepareClient();

process.on("message", msg => SharderMessageEvent(msg as Record<string, unknown>));

// Moving calls here because of a potential hard lock on a shard using a collection - ruling out using an extended client as the issue
const calls = new Collection<string, CallClient>();

export { calls };

