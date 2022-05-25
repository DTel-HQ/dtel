import { Interaction, Message } from "discord.js";
import i18next from "i18next";

import config from "./config/config";
// import init, { DTelDatabase } from "./database/database";
import auth from "./config/auth";
import i18ndata from "./internationalization/i18n";
import Client from "./internals/client";
import Console from "./internals/console";

import ReadyEvent from "./events/ready";
import MessageCreateEvent from "./events/messageCreate";
import InteractionEvent from "./events/interactionCreate";
import SharderMessageEvent from "./events/sharderMessage";

const winston = Console(`Shard ${process.env.SHARDS}`);

// let db: DTelDatabase;

// try {
// 	db = init();
// 	winston.info("Initialized database.");
// } catch (err) {
// 	console.error(`Failed to connect to MongoDB.\n ${err.stack}`);
// 	process.exit(-1);
// }

i18next.init({
	debug: config.devMode,
	fallbackLng: "en-US",
	preload: ["en-US"],

	returnObjects: true,
	resources: i18ndata,
});

const client = new Client({
	intents: [
		"GUILD_MESSAGES",
		"GUILDS",
		"GUILD_VOICE_STATES",
		"DIRECT_MESSAGES",
	],
	partials: ["CHANNEL"],
});


client.on("ready", () => ReadyEvent(client));

client.on("messageCreate", (msg: Message) => MessageCreateEvent(client, msg));
client.on("interactionCreate", (interaction: Interaction) => InteractionEvent(client, interaction));
// client.on("guildCreate", (guild: Guild) => GuildCreateEvent(guild));
// client.on("guildDelete", (guild: Guild) => GuildDeleteEvent(guild));

process.on("message", msg => SharderMessageEvent(client, msg));

client.login(process.env.TOKEN);

export { client, winston };
