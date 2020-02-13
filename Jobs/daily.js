// Job to reset lottery and dailies every 24h.
module.export = scheduleJob => scheduleJob("0 0 0 * * *", async() => {
	let winnerID;
	if (client.shard.id != 0) return;
	// Daily reset
	await r.table("Accounts").update({ daily: false });

	// Lottery winner & reset
	let lottery = await r.table("Lottery");
	await r.table("Lottery").delete();
	if (lottery.length) {
		await lottery.sort((a, b) => a.id < b.id ? -1 : 1);
		let lastEntry = lottery[lottery.length - 1];
		let winningNumber = Math.round(Math.random() * lastEntry.number) + 1;

		for (let i in lottery) {
			// find winner
			if (lottery[i].number >= winningNumber) {
				winnerID = lottery[i].userID;
				console.log(`Winning Number: ${winningNumber}, winning ID: ${lottery[i].id}, winning person: ${winnerID}`);
				break;
			}
		}

		let account = await r.table("Accounts").get(winnerID).default(null);
		let balance = account.balance;
		balance += lastEntry.jackpot;

		await r.table("Accounts").get(winnerID).update({ balance: balance });
		let user = await client.users.fetch(winnerID);
		(await user.createDM()).send({ embed: { color: config.colors.lottery, title: "You've won!", description: `You have won the lottery of <:DTS:668551813317787659>${lastEntry.jackpot}.` } })
			.catch(async _ => {
				let channel = await client.api.channels(lastEntry.channel).get();
				if (!channel) return;
				client.apiSend(`<@${winnerID}>`, { embed: { color: config.colors.lottery, title: "You've won!", description: `You have won the lottery of <:DTS:668551813317787659>${lastEntry.jackpot}.` } }, channel.id)
					.catch(e => null);
			});
	}

	winston.info(`[ScheduleJob] Reset lottery and dailies. Lottery won by ${winnerID}`);
	client.log(`⏰ The lottery and dailies have been reset.`);
});
