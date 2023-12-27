import { ActiveCalls, Numbers } from "@prisma/client";
import CallClient from "@src/internals/callClient.old";
import { Collection } from "discord.js";

export type CallsWithNumbers = ActiveCalls & {
	to: Numbers,
	from: Numbers,
};
// Moving calls here because of a potential hard lock on a shard using a collection - ruling out using an extended client as the issue
const calls = new Collection<string, CallsWithNumbers>();

export { calls };
