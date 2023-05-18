import { Guild, Interaction, Message, Options, PartialMessage, Partials, Typing } from "discord.js";
import i18next from "i18next";

import Client from "./internals/client";
import Console from "./internals/console";
import i18nData from "./internationalization/i18n";

import InteractionEvent from "./events/interactionCreate";
import MessageCreateEvent from "./events/messageCreate";
import MessageDeleteEvent from "./events/messageDelete";
import MessageUpdateEvent from "./events/messageUpdate";
import GuildCreateEvent from "./events/guildCreate";
import GuildDeleteEvent from "./events/guildDelete";
import ReadyEvent from "./events/ready";
import TypingStartEvent from "./events/typingStart";

import { populateBlacklistCache } from "./database/db";
import SharderMessageEvent from "./events/sharderMessage";
import { upperFirst } from "./internals/utils";

populateBlacklistCache();

const winston = Console(`Shard ${process.env.SHARDS}`);

i18next.init({
	// debug: config.devMode,
	fallbackLng: "en",
	preload: ["en-US"],

	returnObjects: true,
	resources: i18nData,
});
i18next.services.formatter?.add("upperFirst", value => upperFirst(value));

const client = new Client({
	intents: [
		"Guilds",
		"GuildVoiceStates",
		"GuildMessages",
		"GuildMessageTyping",
		"GuildEmojisAndStickers",
		"DirectMessages",

		// Privileged
		"MessageContent",
	],
	partials: [Partials.Channel],
	makeCache: Options.cacheWithLimits({
		...Options.DefaultMakeCacheSettings,
		MessageManager: 1,
		GuildInviteManager: 0,
		GuildEmojiManager: 0,
		GuildStickerManager: 0,
		UserManager: 1000,
	}),
});

client.on("ready", () => ReadyEvent(client));

client.on("messageCreate", (msg: Message) => MessageCreateEvent(client, msg));
client.on("messageUpdate", (before: Message | PartialMessage, after: Message | PartialMessage) => MessageUpdateEvent(client, before as Message, after as Message));
client.on("messageDelete", (msg: Message | PartialMessage) => MessageDeleteEvent(client, msg as Message));
client.on("interactionCreate", (interaction: Interaction) => InteractionEvent(client, interaction));
client.on("guildCreate", (guild: Guild) => GuildCreateEvent(client, guild));
client.on("guildDelete", (guild: Guild) => GuildDeleteEvent(client, guild));

client.on("typingStart", (typing: Typing) => TypingStartEvent(client, typing));


process.on("message", msg => SharderMessageEvent(client, msg as Record<string, unknown>));

client.login(process.env.TOKEN);

export { client, winston };

