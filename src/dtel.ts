import { initInternationalization } from "@src/internationalization/i18n";
import { populateBlacklistCache } from "./database/db";
import SharderMessageEvent from "./events/sharderMessage";
import { prepareClient } from "@src/instances/client";

initInternationalization();
populateBlacklistCache();
prepareClient();

process.on("message", msg => SharderMessageEvent(msg as Record<string, unknown>));

