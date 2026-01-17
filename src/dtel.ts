import { initInternationalization } from "@src/internationalization/i18n";
import { populateBlacklistCache } from "./database/db";
import SharderMessageEvent from "./events/sharderMessage";
import { client, prepareClient } from "@src/instances/client";
import { EmbedBuilder } from "discord.js";
import winston from "winston";
import config from "./config/config";

initInternationalization();
populateBlacklistCache();
prepareClient();

process.on("message", msg => SharderMessageEvent(msg as Record<string, unknown>));


process.setUncaughtExceptionCaptureCallback((error: Error) => {
	winston.error(`Uncaught Exception: ${error.message}\n${error.stack}`);
	client.sendCrossShard({
		embeds: [new EmbedBuilder().setTitle("Uncaught Exception").setDescription(`\`\`\`${error.message}\n${error.stack}\`\`\``).setColor(0xFF0000)],
	}, config.supportGuild.channels.badLogs);
});
