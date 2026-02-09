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

const handleFatalError = (error: unknown): void => {
  const err = error instanceof Error
    ? error
    : new Error(typeof error === 'string' ? error : JSON.stringify(error))

  winston.error(`Uncaught Exception: ${err.message}\n${err.stack}`)

  void client.sendCrossShard({
    embeds: [
      new EmbedBuilder()
        .setTitle('Uncaught Exception')
        .setDescription(`\`\`\`${err.message}\n${err.stack ?? ''}\`\`\``)
        .setColor(0xff0000)
    ]
  }, config.supportGuild.channels.badLogs)
};

process.on('uncaughtException', handleFatalError);
process.on('unhandledRejection', handleFatalError);
