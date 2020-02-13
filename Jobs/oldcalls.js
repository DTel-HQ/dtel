// Job to delete stored messages of calls.
module.export = scheduleJob => scheduleJob("0 0 0 * * *", async() => {
	let date = new Date();

	// start deleting after 2 days, 5 day buffer to ensure none accidentally left.
	let beginDate = new Date().setDate(date.getDate() - 7);
	let endDate = new Date().setDate(date.getDate() - 2);

	let result = await r.table("OldCalls").between(new Date(beginDate), new Date(endDate), { index: "startedAt" }).replace(r.row.without("messages"));

	client.log(`📖 Cleared messages of ${result.replaced} calls.`);
});
