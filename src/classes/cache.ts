import { Collection } from "discord.js";
import { ReqlClient } from "rethinkdbdash";
import { modelFound } from "./modelFound";

interface options {
	tableName: string;
	r: ReqlClient;
}

export default class DBInterface {
	public cache: Collection<string, object> = new Collection();
	public tableName: string;
	public r: ReqlClient;
	constructor(options: options) {
		this.tableName = options.tableName;
		this.r = options.r;
		Object.assign(this, this.cache)
	}

	async get(id: string | number): Promise<modelFound | null> {
		id = id.toString();
		let res: unknown = this.cache.get(id);
		if (typeof res === "object") return new modelFound({
			tableName: this.tableName,
			r: this.r,
			cached: res,
			cache: this.cache,
		});
		// TODO: Someone who understands TS pls remove this repetition somehow.
		res = this.r.table(this.tableName).get(id).default(null);
		if (typeof res === "object") {
			this.cache.set(id, res);
			return new modelFound({
				tableName: this.tableName,
				r: this.r,
				cached: res,
				cache: this.cache,
			});
		}
		return null;
	}
}
