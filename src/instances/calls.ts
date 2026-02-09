import { CallMessages } from "@src/database/generated";
import { Collection } from "discord.js";

export const callMessagesCache = new Collection<string, CallMessages>();
export const callReminderIntervals = new Collection<string, NodeJS.Timeout>();
