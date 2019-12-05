const { scheduleJob } = require("node-schedule");

module.exports = async() => {
	winston.info("[Discord] Successfully connected to Discord.");
	await client.shard.broadcastEval(`this.done = true`);
	winston.info("[Ready] Done spawning all shards");
};
