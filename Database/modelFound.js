module.exports = class modelFound {
	constructor(options) {
		this.table = options.table;
		this.r = options.r;
		this.result = options.result;
		this.cached = options.cached;

		return this.cached;
	}

	async delete() {
		delete this.cached;
		let res;
		try {
			res = await this.result.remove();
		} catch (err) {
			throw new Error(`Could not remove document\n${res}`);
		}
		return res;
	}
};
