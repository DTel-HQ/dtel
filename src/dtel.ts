import { populateBlacklistCache } from "./database/db";
import SharderMessageEvent from "./events/sharderMessage";
import { prepareClient } from "@src/instances/client";

populateBlacklistCache();
prepareClient();

process.on("message", msg => SharderMessageEvent(msg as Record<string, unknown>));

