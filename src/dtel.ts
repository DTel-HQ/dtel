import { Client, Interaction, Guild, Message} from "discord.js";
import Console from "./Internals/Console";

const client = new Client({
	intents: [
		"GUILD_MESSAGES",
		"GUILDS",
		"GUILD_VOICE_STATES",
		"DIRECT_MESSAGES",
	],
	partials: ["CHANNEL"],
});

const winston = Console(`Shard ${process.env.SHARDS}`);

client.on("ready", () => ReadyEvent());

client.on("messageCreate", (msg: Message) => MessageCreateEvent(msg));
client.on("interactionCreate", (interaction: Interaction) => InteractionEvent(interaction));
client.on("guildCreate", (guild: Guild) => GuildCreateEvent(guild));
client.on("guildDelete", (guild: Guild) => GuildDeleteEvent(guild));