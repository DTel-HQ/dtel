const { db } = require("../Configuration/auth.js");

const Cache = require("../Internals/Cache.js");

const r = global.r = require("rethinkdbdash")({
	db: db.db,
	user: db.user,
	password: db.password,
});

module.exports = async() => new Promise(async(resolve, reject) => {
	const tables = [
		"Accounts",
		"Blacklist",
		"Calls",
		"Lottery",
		"Mailbox",
		"Numbers",
		"OldCalls",
		"Phonebook",
		"Strikes",
	];
	const toCache = [
		"Blacklist",
		"Calls",
	];

	let dblist = await r.dbList().run();
	if (!dblist.includes(db.db)) await r.dbCreate(db.db);
	let tablelist = await r.tableList().run();
	for (let i of tables) if (!tablelist.includes(i)) await r.tableCreate(i).run();
	for (let i of toCache) {
		let cache = global[i] = new Cache(i, r);
		let all = await r.table(i);
		for (let a of all) cache.set(a.id, a);
	}

	await r.branch(r.table("Calls").indexList().contains("channel"), null, r.table("Calls").indexCreate("channel", [r.row("to")("channelID"), r.row("from")("channelID")]));
	await r.branch(r.table("Calls").indexStatus("channel").nth(0)("ready"), null, r.table("Calls").indexWait("channel"));

	resolve(r);
});
