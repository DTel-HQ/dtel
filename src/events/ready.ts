import DTelClient from "../internals/client";
import Commands from "../config/commands";
import CallClient from "../internals/callClient";
import config from "../config/config";
import discoin, { Bot, Currency } from "@discoin/scambio";
import auth from "../config/auth";
import { ApplicationCommandStringOption, ApplicationCommandSubCommand } from "discord.js";
import { winston } from "../dtel";

export default async(client: DTelClient): Promise<void> => {
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user!.tag}`);

	// client.application.commands.set(client.commands);
	if (process.env.SHARDS === "0") {
		const discoinCommand = Commands.find(c => c.name === "discoin")!;
		const convertCommand = discoinCommand.options!.find(o => o.name === "convert") as ApplicationCommandSubCommand;
		const firstOption = convertCommand!.options![0] as ApplicationCommandStringOption;

		// Query is a leftover from DTel v3 -- anyone know what it does?
		const allCurrencies = await discoin.currencies.getMany("filter=name||$excl||Test&sort=id,ASC").catch(() => null) as Currency[] | null;
		const allBots = await discoin.bots.getMany("filter=name||$excl||Test&sort=name,ASC").catch(() => null) as Bot[] | null;

		if (!allCurrencies || !allBots) {
			winston.warn("[Discoin] Failed to fetch currencies from Discoin API");
		} else {
			for (const c of allCurrencies) {
				if (c.id === "DTS") continue;
				const bot = allBots.find(b => b.currencies.find(bc => c.id === bc.id));

				const name = bot ? `${bot.name} (${c.id})` : "Unknown";

				firstOption.choices!.push({
					name,
					value: c.id,
				});
			}
		}


		client.application!.commands.set(Commands, "385862448747511812");
		client.application!.commands.set(Commands, "398980667553349649");
	}

	const allCalls = await client.db.calls.findMany({
		where: {
			active: true,
		},
		include: {
			to: {
				include: {
					guild: true,
				},
			},
			from: {
				include: {
					guild: true,
				},
			},
		},
	});

	for (const call of allCalls) {
		client.calls.set(call.id, await CallClient.byID(client, {
			doc: call,
			side: "to",
		}));
	}

	if (client.application.installParams) config.botInvite = client.generateInvite(client.application.installParams);
};
