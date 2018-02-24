require("dotenv").config();
process.setMaxListeners(0);

const Sharder = require("./Sharding/Sharder");

(async() => {
	const sharder = await new Sharder(process.env.DISCORD_TOKEN, 2);
	sharder.cluster.on("online", worker => {
		console.log(`[SHARDING] Worker ${worker.id} launched`);
	});
	sharder.ready = 0;
	sharder.finished = 0;
	sharder.IPC.on("ready", async() => {
		sharder.ready++;
		if (sharder.ready === sharder.count) {
			console.log("[SHARDING] All shards connected.");
		}
	});


	let shardFinished = () => {
		if (sharder.finished > -1) sharder.finished++;
		if (sharder.finished === sharder.count) {
			console.log(`DTel 611, how can I help you today?`);
			sharder.finished = -1;
		}
	};

	// Shard has finished all work
	sharder.IPC.on("finished", shardFinished);

	// Shard requests changes to gulid cache
	sharder.IPC.on("guilds", async msg => {
		let guilds = msg.latest;
		if (!guilds) guilds = [];
		for (let guild of guilds) {
			sharder.guilds.set(guild, parseInt(msg.shard));
		}
		if (msg.remove) {
			for (let guild of msg.remove) {
				sharder.guilds.delete(guild);
			}
		}
	});

	// Shard requests JavaScript code to be executed
	sharder.IPC.on("eval", async(msg, callback) => {
		const promises = [];
		sharder.shards.forEach(shard => promises.push(shard.eval(msg)));
		callback(await Promise.all(promises));
	});

	sharder.IPC.on("stopTyping", async data => {
		data.hangups.forEach(hangupData => {
			const shard = sharder.guilds.get(hangupData.guild);
			if (shard) sharder.IPC.send("stopTyping", hangupData, shard);
		});
	});

	sharder.spawn();
})();
