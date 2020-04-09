import { Collection } from "discord.js";
import { ReqlClient } from "rethinkdbdash";
import { modelFound } from "./modelFound";

interface options {
	tableName: string;
	r: ReqlClient;
}

/**
 * Caches a table and allows fetching of data
 * @param {string} tableName - Name of the cached table
 * @param {ReqlClient} r - RDB client
 */

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
		if (typeof res === "undefined") {
			res = this.r.table(this.tableName).get(id).default(null);
			if (typeof res === "object" && res !== null) this.cache.set(id, res);
		}
		if (typeof res === "object" && res !== null) return new modelFound({
			tableName: this.tableName,
			r: this.r,
			cached: res,
			cache: this.cache,
		});
		return null;
	}
}
