const { scheduleJob } = require("node-schedule");

// Job to reset lottery and dailies every 24h.
scheduleJob("0 0 0 * * *", async() => {
	if (client.shard.ids[0] != 0) return;
	// Daily reset
	await r.table("Accounts").update({ daily: false });

	// Lottery winner & reset
	let lottery = await r.table("Lottery");
	await r.table("Lottery").delete();
	if (lottery.length) {
		await lottery.sort((a, b) => a.id < b.id ? -1 : 1);
		let lastEntry = lottery[lottery.length - 1];
		let winningNumber = Math.round(Math.random() * lastEntry.number) + 1;

		let winnerID;
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
		user.send(`CONGRATS! You won the jackpot of ¥${lastEntry.jackpot}.`)
			.catch(async _ => {
				let channel = await client.api.channels(lastEntry.channel).get();
				if (!channel || channel.type != "text") return;
				channel.send(`You have won the lottery of ¥${lastEntry.jackpot} <@${winnerID}>!`);
			});
	}

	winston.info("[ScheduleJob] Reset lottery and dailies.");
	client.log(`⏰ The lottery and dailies have been reset.`);
});

// Job to update the playing status regularly.
scheduleJob("*/5 * * * *", async() => {
	let guildCount = (await client.shard.fetchClientValues("guilds.size")).reduce((a, b) => a + b, 0);
	let userCount = (await client.shard.broadcastEval("this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)")).reduce((prev, curr) => prev + curr, 0);
	client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`${guildCount} servers with ${userCount} users. (shard \${this.shard.ids[0]})\`, type: 0 } });`);
	winston.verbose("[ScheduleJob] Updated status.");
});
