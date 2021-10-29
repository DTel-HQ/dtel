import Client from "./internals/client";
import { Interaction, Guild, Message } from "discord.js";
import Console from "./Internals/Console";
import init, { DTelDatabase } from "./database/database";

import ReadyEvent from "./events/ready";

import InteractionEvent from "./events/interaction";

const winston = Console(`Shard ${process.env.SHARDS}`);

let db: DTelDatabase;

try {
	db = init();
	winston.info("Initialized database.");
} catch (err) {
	console.error(`Failed to connect to MongoDB.\n ${err.stack}`);
	process.exit(-1);
}

const client = new Client({
	intents: [
		"GUILD_MESSAGES",
		"GUILDS",
		"GUILD_VOICE_STATES",
		"DIRECT_MESSAGES",
	],
	partials: ["CHANNEL"],

	constantVariables: {
		db,
		winston,
	},
});


client.on("ready", () => ReadyEvent(client));

// client.on("messageCreate", (msg: Message) => MessageCreateEvent(msg));
client.on("interactionCreate", (interaction: Interaction) => InteractionEvent(client, interaction));
// client.on("guildCreate", (guild: Guild) => GuildCreateEvent(guild));
// client.on("guildDelete", (guild: Guild) => GuildDeleteEvent(guild));

client.login(process.env.TOKEN);
