import { initInternationalization } from "@src/internationalization/i18n";
import SharderMessageEvent from "./events/sharderMessage";
import { client, prepareClient } from "@src/instances/client";
import { EmbedBuilder } from "discord.js";
import config from "./config/config";
import { winston } from "./instances/winston";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
initInternationalization();
// eslint-disable-next-line @typescript-eslint/no-floating-promises
prepareClient();

process.on("message", msg => SharderMessageEvent(msg as Record<string, unknown>));

const handleFatalError = async(error: unknown, type: "exception" | "rejection"): Promise<void> => {
	const err = error instanceof Error ?
		error :
		new Error(typeof error === "string" ? error : JSON.stringify(error));

	const title = type === "exception" ? "Uncaught Exception" : "Unhandled Rejection";
	winston.error(`${title}: ${err.message}\n${err.stack}`);

	await client.sendCrossShard({
		embeds: [
			new EmbedBuilder()
				.setTitle(title)
				.setDescription(`\`\`\`${err.message}\n${err.stack ?? ""}\`\`\``)
				.setColor(0xff0000),
		],
	}, config.supportGuild.channels.badLogs);
};

process.on("uncaughtException", error => handleFatalError(error, "exception"));
process.on("unhandledRejection", error => handleFatalError(error, "rejection"));
