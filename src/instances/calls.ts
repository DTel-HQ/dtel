import CallClient from "@src/internals/callClient.old";
import { Collection } from "discord.js";
// Moving calls here because of a potential hard lock on a shard using a collection - ruling out using an extended client as the issue
const calls = new Collection<string, CallClient>();

export { calls };
