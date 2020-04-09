import { db } from "../configuration/auth";
import rethinkdb, { ReqlClient } from "rethinkdbdash";
import databaseInterface from "../classes/cache";
import { dbTables } from "../constants/interfaces";

const r: ReqlClient = rethinkdb({
	db: db.db,
	user: db.user,
	password: db.password,
});

module.exports = async() => new Promise(async(resolve: Function) => {
	const tables: string[] = [
		"Accounts",
		"Blacklist",
		"Calls",
		"Cooldowns",
		"Lottery",
		"Mailbox",
		"Numbers",
		"OldCalls",
		"Phonebook",
		"Strikes",
		"Votes",
		"Whitelist",
	];
	const databaseInterfaces: dbTables = {} as any;

	let dblist: string[] = await r.dbList().run();
	if (!dblist.includes(db.db)) r.dbCreate(db.db);
	let tablelist: string[] = await r.tableList().run();

	for (let i of tables) {
		if (!tablelist.includes(i)) r.tableCreate(i).run();
		databaseInterfaces[i.toLowerCase()] = new databaseInterface({
			tableName: i,
			r,
		})
	}

	r.branch(r.table("Calls").indexList().contains("channel"), null, r.table("Calls").indexCreate("channel", [r.row("to")("channel"), r.row("from")("channel")]));
	r.branch(r.table("Calls").indexStatus("channel").nth(0)("ready"), null, r.table("Calls").indexWait("channel"));

	r.branch(r.table("Calls").indexList().contains("fromChannel"), null, r.table("Calls").indexCreate("fromChannel", r.row("from")("channel")));
	r.branch(r.table("Calls").indexStatus("fromChannel").nth(0)("ready"), null, r.table("Calls").indexWait("fromChannel"));

	r.branch(r.table("Calls").indexList().contains("toChannel"), null, r.table("Calls").indexCreate("toChannel", r.row("to")("channel")));
	r.branch(r.table("Calls").indexStatus("toChannel").nth(0)("ready"), null, r.table("Calls").indexWait("toChannel"));

	r.branch(r.table("OldCalls").indexList().contains("startedAt"), null, r.table("OldCalls").indexCreate("startedAt", r.row("startedAt")));
	r.branch(r.table("OldCalls").indexStatus("startedAt").nth(0)("ready"), null, r.table("OldCalls").indexWait("startedAt"));

	r.branch(r.table("Numbers").indexList().contains("channel"), null, r.table("Numbers").indexCreate("channel", r.row("channel")));
	r.branch(r.table("Numbers").indexStatus("channel").nth(0)("ready"), null, r.table("Numbers").indexWait("channel"));

	r.branch(r.table("Numbers").indexList().contains("guild"), null, r.table("Numbers").indexCreate("guild", r.row("guild")));
	r.branch(r.table("Numbers").indexStatus("guild").nth(0)("ready"), null, r.table("Numbers").indexWait("guild"));

	r.branch(r.table("Mailbox").indexList().contains("channel"), null, r.table("Mailbox").indexCreate("channel", r.row("channel")));
	r.branch(r.table("Mailbox").indexStatus("channel").nth(0)("ready"), null, r.table("Mailbox").indexWait("channel"));

	r.branch(r.table("Strikes").indexList().contains("offender"), null, r.table("Strikes").indexCreate("offender", r.row("offender")));
	r.branch(r.table("Strikes").indexStatus("offender").nth(0)("ready"), null, r.table("Strikes").indexWait("offender"));

	if (tablelist.includes("Busy")) r.table("Busy").delete()
	if (tablelist.includes("Cooldowns")) r.table("Cooldowns").delete();
	if (tablelist.includes("Numbers")) r.table("Numbers").update({ waiting: false });

	resolve({
		r, databaseInterfaces
	});
});
