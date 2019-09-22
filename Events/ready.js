const { scheduleJob } = require("node-schedule");

module.exports = async() => {
	winston.info("[Discord] Successfully connected to Discord.");
	await client.user.setPresence({ activity: { name: `[${client.shard.id}] Done restarting`, type: 0 } });

	// Set initial playing status
	// Last shard so every shard is ready to do eval
	// Nvm that, only 1 shard with this dumb sharder
	await require("../Internals/init.js")();

	await client.shard.broadcastEval(`this.done = true`);
	winston.info("[Ready] Done spawning all shards");
};
