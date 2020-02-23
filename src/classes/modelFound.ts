import { ReqlClient } from "rethinkdbdash";
import { Collection } from "discord.js";

export interface options {
	tableName: string,
	r: ReqlClient,
	cached: unknown,
	cache: Collection<string, object>,
}

export class modelFound {
	public tableName: string;
	public r: ReqlClient;
	public cached: unknown;
	public cache: any;
	id: any;

	constructor(options: options) {
		this.tableName = options.tableName;
		this.r = options.r;
		this.cached = options.cached;
		this.cache = options.cache;

		Object.assign(this, this.cached)
	}

	delete() {
		this.cache.delete(this.id);
		let res;
		try {
			res = this.r.table(this.tableName).get(this.id).delete();
		} catch (err) {
			throw new Error(`Could not remove document\n${res}`);
		}
		return res;
	}
};
