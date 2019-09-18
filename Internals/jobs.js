const { scheduleJob } = require("node-schedule");
const { MessageEmbed } = require("discord.js");
const { post } = require("chainfetch");

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
scheduleJob("*/15 * * * * *", async() => {
	if (!client.shard.ids[0] === client.shard.count - 1) return;
	let guildCount = (await client.shard.fetchClientValues("guilds.size")).reduce((a, b) => a + b, 0);
	let sec = new Date().getSeconds();
	if ([14, 15, 16, 44, 45, 46].includes(sec)) {
		let userCount = (await client.shard.broadcastEval("this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)")).reduce((prev, curr) => prev + curr, 0);
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`[\${this.shard.ids[0]}] ${guildCount} servers with ${userCount} users.\`, type: 0 } });`);
	} else {
		let calls = (await r.table("Calls")).length;
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`[\${this.shard.ids[0]}] ${guildCount} servers with ${calls} calls.\`, type: 0 } });`);
	}
	winston.verbose("[ScheduleJob] Updated status.");
});


// Job to delete numbers if expired for a long time
scheduleJob("0 0 0 * * *", async() => {
	const warnDays = 15;
	const deleteDays = 30;

	let time = Date.now();
	const warnMS = time - (warnDays * 86400000);
	const deleteMS = time - (deleteDays * 86400000);

	if (client.shard.ids[0] != 0) return;

	const numbers = await r.table("Numbers");
	let deleted = [];

	for (let number of numbers) {
		let channel = await client.api.channels(number.channel).get();
		if (!channel) {
			await client.delete(number, { force: true, stopLog: true });
			deleted.push(number);
			break;
		}
		let owner = number.guild ? (await client.api.guilds(number.guild).get().catch(e => null)).owner_id : null;

		let embed = new MessageEmbed()
			.setColor(config.colors.error);

		let otitle,
			odesc,
			ctitle,
			cdesc;

		if (new Date(number.expiry).getTime() < deleteMS) {
			await client.delete(number, true);
			deleted.push(number);

			otitle = `Your number has been deleted`;
			odesc = `Your number (${number.id}) in <#${channel.id}> has been deleted as it has been expired for >${deleteDays} days.`;
			ctitle = `This channel's number has been deleted`;
			cdesc = `This channel's number (${number.id}) has been deleted as it has been expired for >${deleteDays} days.`;
		} else if (new Date(number.expiry).getTime() < warnMS && new Date(number.expiry).getTime() > warnMS - 86400000) {
			otitle = `Your number soon be deleted.`;
			odesc = `Your number ${number.id} in <#${channel.id}> has expired and will be automatically deleted in ${deleteDays - warnDays} days. To prevent losing your number (and all that comes with it), please extend the duration of your number by calling \`*233\`. `;
			ctitle = `This number will soon be deleted`;
			cdesc = `This channel's number (${number.id}) has been expired for >${warnDays} days and will automatically be deleted in ${deleteDays - warnDays}. To prevent losing this number and all its settings, please extend it by calling \`*233\`.`;
		} else {
			winston.info("Fine");
			continue;
		}

		embed.setTitle(ctitle)
			.setDescription(cdesc);
		await client.apiSend({ embed: embed }, channel.id).catch(e => null);
		embed.setTitle(otitle)
			.setDescription(odesc)
			.setFooter("You are receiving this as you are the owner of the server.");
		await (await client.users.fetch(owner)).send({ embed: embed }).catch(e => null);
	}

	let haste;
	try {
		haste = await post("https://hastebin.com/documents").send(`// Deleted numbers: ${new Date()}\n\n${deleted.map(n => `${n.id}\n`)}`);
	} catch (err) {
		haste = false;
	}

	let count = deleted.length;
	winston.info(`[ScheduleJob] Deleted ${count} expired numbers`);
	if (haste) client.log(`🔥 Automatically deleted ${count} numbers. Results: <https://hastebin.com/${haste.body.key}>`);
	else client.log(`🔥 Automatically deleted ${count} numbers. Unsuccesful post to hastebin.`);
});
