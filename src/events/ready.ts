import DTelClient from "@src/internals/client";
import Commands from "@src/config/commands";
import config from "@src/config/config";

export const readyHandler = async(client: DTelClient): Promise<void> => {
	client.winston.info(`Ready!`);
	client.winston.info(`Logged in as ${client.user!.tag}`);

	client.user!.setActivity({
		name: `[${process.env.SHARDS}] Starting up...`,
	});

	// client.application.commands.set(client.commands);
	if (process.env.SHARDS === "0") {
		client.application!.commands.set(Commands);
		if (client.application.installParams) config.botInvite = client.generateInvite((await client.application.fetch()).installParams!);

		// client.application!.commands.set(Commands, "385862448747511812");
		// client.application!.commands.set(Commands, "398980667553349649");
	}

	client.shard!.send({ msg: "ready", shardID: Number(process.env.SHARDS) });
};
