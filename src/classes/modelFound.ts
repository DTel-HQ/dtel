import { ReqlClient } from "rethinkdbdash";

export interface options {
	tableName: string,
	r: ReqlClient,
	cached: unknown, 
	cache: any, // Can someone figure out how to assign type of d.js collection to these thanks
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

	async delete() {
		this.cache.delete(this.id);
		let res;
		try {
			res = await this.r.table(this.tableName).get(this.id).delete();
		} catch (err) {
			throw new Error(`Could not remove document\n${res}`);
		}
		return res;
	}
};
