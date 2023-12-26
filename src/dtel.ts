import i18next from "i18next";
import i18nData from "./internationalization/i18n";
import { populateBlacklistCache } from "./database/db";
import SharderMessageEvent from "./events/sharderMessage";
import { upperFirst } from "./internals/utils";
import CallClient from "./internals/callClient.old";
import { Collection } from "discord.js";
import { prepareClient } from "./instances/client";

populateBlacklistCache();
prepareClient();

i18next.init({
	// debug: config.devMode,
	fallbackLng: "en",
	preload: ["en-US"],

	returnObjects: true,
	resources: i18nData,
});
i18next.services.formatter?.add("upperFirst", value => upperFirst(value));

process.on("message", msg => SharderMessageEvent(msg as Record<string, unknown>));

// Moving calls here because of a potential hard lock on a shard using a collection - ruling out using an extended client as the issue
const calls = new Collection<string, CallClient>();

export { calls };

