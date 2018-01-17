const Shard = require("./Shard");
const IPC = require("./SharderIPC");
const cluster = require("cluster");
const http = require("http");

const ipaddress = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 2000;

module.exports = class Sharder {
	constructor(token, count) {
		this.cluster = cluster;
		this.cluster.setupMaster({
			exec: `DiscordTel.js`,
		});
		this.token = token ? token : process.env.CLIENT_TOKEN;
		this.count = count;
		this.mode = "production";

		this.IPC = new IPC(this);
		this.shards = new Map();
		this.guilds = new Map();

		const server = this["isItUp?"] = http.createServer((req, res) => {
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end("👌");
		});

		server.listen(port, ipaddress, () => {
			console.log(`[HTTP Server] Sharders HTTP Server is listening on "${ipaddress}:${port}"`);
		});
	}

	spawn() {
		console.log(`[SHARDER] Spawning shards...`);
		for (let i = 0; i < this.count; i++) {
			this.create(i);
		}
	}

	create(id) {
		let worker = this.cluster.fork({
			CLIENT_TOKEN: this.token,
			SHARD_ID: id,
			SHARD_COUNT: this.count,
			NODE_ENV: this.mode,
		});
		let shard = new Shard(id, worker.process, this, worker);
		this.shards.set(id, shard);
	}

	broadcast(event, message, timeout) {
		const promises = [];
		for (const shard of this.shards.values()) promises.push(shard.send(event, message, timeout));
		return Promise.all(promises);
	}
};
