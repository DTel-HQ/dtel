module.exports = class SharderIPC {
	constructor(sharder) {
		this.sharder = sharder;

		this.onEvents = new Map();
		this.onceEvents = new Map();
	}

	send(event, payload, shard, timeout) {
		try {
			if (shard === "*") {
				return this.sharder.broadcast(event, payload, timeout);
			} else {
				shard = this.sharder.shards.get(shard);
				if (!shard) shard = this.sharder.shards.get(0);
				return shard.send(event, payload, timeout);
			}
		} catch (err) {
			console.log(`[SHARDER IPC] Error at sending ${JSON.stringify(payload)}!\n${err.stack}`);
		}
	}

	on(event, callback) {
		this.onEvents.set(event, callback);
	}

	once(event, callback) {
		this.onceEvents.set(event, callback);
	}
};
