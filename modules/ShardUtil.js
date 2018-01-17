// Polyfill for client.shard
module.exports = class ShardUtil {
	constructor(client) {
		this.client = client;
	}

	get id() {
		return Number(process.env.SHARD_ID);
	}

	get count() {
		return Number(process.env.SHARD_COUNT);
	}
};
