// import { ApplicationCommandOptionChoice } from "discord.js";
// import { PermissionLevel } from "../interfaces/command";
import DTelClient from "../internals/client";
import Commands from "../config/commands";
import CallClient from "../internals/callClient";

export default async(client: DTelClient): Promise<void> => {
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user!.tag}`);

	// client.application.commands.set(client.commands);
	client.application!.commands.set(Commands, "385862448747511812");

	const allCalls = await client.db.calls.findMany({ where: { active: true }, include: { from: true, to: true } });
	for (const call of allCalls) {
		CallClient.byID(client, {
			doc: call,
			side: "to",
		});
	}
};

