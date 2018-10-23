const modelFound = require("../Database/modelFound.js");

module.exports = class Cache extends require("discord.js").Collection {
	constructor(table, r) {
		super();
		this.table = table;
		this.r = r;
	}
	async create(options) {
		let result, cached;
		try {
			result = await this.r.table(this.table).insert(options).run();
			cached = this.set(options.id, options);
		} catch (e) {
			throw new Error(`Could not create\n${e}`);
		}
		return new modelFound({
			options,
			r: this.r,
			table: this.table,
			cached,
		});
	}
};
