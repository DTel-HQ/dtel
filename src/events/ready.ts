import DTelClient from "../internals/client";
import Commands from "../config/commands";
import CallClient from "../internals/callClient";
import config from "../config/config";

export default async(client: DTelClient): Promise<void> => {
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user!.tag}`);

	// client.application.commands.set(client.commands);
	client.application!.commands.set(Commands, "385862448747511812");
	client.application!.commands.set(Commands, "398980667553349649");

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
