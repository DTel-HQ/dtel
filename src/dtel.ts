import { Interaction, Message, Options, Partials, Typing } from "discord.js";
import i18next from "i18next";

import config from "./config/config";
import i18nData from "./internationalization/i18n";
import Client from "./internals/client";
import Console from "./internals/console";

import ReadyEvent from "./events/ready";
import MessageCreateEvent from "./events/messageCreate";
import InteractionEvent from "./events/interactionCreate";
import TypingStartEvent from "./events/typingStart";

import SharderMessageEvent from "./events/sharderMessage";
import { populateBlacklistCache } from "./database/db";
import { upperFirst } from "./internals/utils";

populateBlacklistCache();

const winston = Console(`Shard ${process.env.SHARDS}`);

i18next.init({
	debug: config.devMode,
	fallbackLng: "en-US",
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
client.on("interactionCreate", (interaction: Interaction) => InteractionEvent(client, interaction));
// client.on("guildCreate", (guild: Guild) => GuildCreateEvent(guild));
// client.on("guildDelete", (guild: Guild) => GuildDeleteEvent(guild));

client.on("typingStart", (typing: Typing) => TypingStartEvent(client, typing));


process.on("message", msg => SharderMessageEvent(client, msg as Record<string, unknown>));

client.login(process.env.TOKEN);

export { client, winston };
