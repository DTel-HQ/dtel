module.exports = class modelFound {
	constructor(options) {
		this.table = options.table;
		this.r = options.r;
		this.cached = options.cached;
		this.cache = options.cache;
		for (let i of Object.keys(this.cached)) this[i] = this.cached[i];
	}

	async delete() {
		this.cache.delete(this.id);
		let res;
		try {
			res = await r.table(this.table).get(this.id).delete();
		} catch (err) {
			throw new Error(`Could not remove document\n${res}`);
		}
		return res;
	}
};
