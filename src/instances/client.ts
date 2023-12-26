import { Guild, Interaction, Message, Options, PartialMessage, Partials, Typing } from "discord.js";
import Client from "@src/internals/client";
import { guildDeleteHandler } from "@src/events/guildDelete";
import { readyHandler } from "@src/events/ready";
import { messageCreateHandler } from "@src/events/messageCreate";
import { messageUpdateHandler } from "@src/events/messageUpdate";
import { messageDeleteHandler } from "@src/events/messageDelete";
import { interactionCreateHandler } from "@src/events/interactionCreate";
import { guildCreateHandler } from "@src/events/guildCreate";
import { typingStartHandler } from "@src/events/typingStart";

export const client = new Client({
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

export const prepareClient = (): void => {
	client.on("ready", () => readyHandler(client));

	client.on("messageCreate", (msg: Message) => messageCreateHandler(client, msg));
	client.on("messageUpdate", (before: Message | PartialMessage, after: Message | PartialMessage) => messageUpdateHandler(client, before as Message, after as Message));
	client.on("messageDelete", (msg: Message | PartialMessage) => messageDeleteHandler(client, msg as Message));
	client.on("interactionCreate", (interaction: Interaction) => interactionCreateHandler(client, interaction));
	client.on("guildCreate", (guild: Guild) => guildCreateHandler(client, guild));
	client.on("guildDelete", (guild: Guild) => guildDeleteHandler(client, guild));

	client.on("typingStart", (typing: Typing) => typingStartHandler(client, typing));

	client.login(process.env.TOKEN);
};

