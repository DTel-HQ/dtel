const { scheduleJob } = require("node-schedule");
const { MessageEmbed } = require("discord.js");
const { post } = require("chainfetch");
const { get } = require("snekfetch");
const auth = require("../Configuration/auth.js");

// Job to reset lottery and dailies every 24h.
scheduleJob("0 0 0 * * *", async() => {
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
		(await user.createDM()).send({ embed: { color: config.colors.lottery, title: "You've won!", description: `You have won the lottery of ¥${lastEntry.jackpot}.` } })
			.catch(async _ => {
				let channel = await client.api.channels(lastEntry.channel).get();
				if (!channel) return;
				client.apiSend(`<@${winnerID}>`, { embed: { color: config.colors.lottery, title: "You've won!", description: `You have won the lottery of ¥${lastEntry.jackpot}.` } }, channel.id)
					.catch(e => null);
			});
	}

	winston.info(`[ScheduleJob] Reset lottery and dailies. Lottery won by ${winnerID}`);
	client.log(`⏰ The lottery and dailies have been reset.`);
});

// Job to update CS perms
scheduleJob("*/5 * * * *", async() => {
	let roles = [config.supportRole, config.donatorRole];
	let guild = client.guilds.get(config.supportGuild);
	for (let role of roles) {
		guild.members.forEach(async member => {
			await member.user.setPerms();
		});
	}
});

// Job to update the playing status regularly.
scheduleJob("*/15 * * * * *", async() => {
	if (!client.done) return;
	let guildCount = (await client.shard.fetchClientValues("guilds.size")).reduce((a, b) => a + b, 0);
	let sec = new Date().getSeconds();
	if ([14, 15, 16, 44, 45, 46].includes(sec)) {
		let userCount = (await client.shard.broadcastEval("this.guilds.reduce((prev, guild) => prev + guild.memberCount, 0)")).reduce((prev, curr) => prev + curr, 0);
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`${guildCount} servers and ${userCount} users | >help | [\${this.shard.id}]\`, type: 3 } });`);
	} else {
		let calls = (await r.table("Calls")).length;
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`${guildCount} servers and ${calls} calls | >help | [\${this.shard.id}] \`, type: 2 } });`);
	}
	winston.verbose("[ScheduleJob] Updated status.");
});

// Get Discoin transactions
scheduleJob("*/5 * * * *", async() => {
	if (!client.shard.id === client.shard.shardCount - 1 || !client.done) return;
	let result = await get("http://discoin.sidetrip.xyz/transactions").set("Authorization", auth.discoinToken).set("Content-Type", "application/json")
		.catch(e => {
			client.apiSend(`Yo, there might be something wrong with the Discoin API.\n\`\`\`\n${e}\n\`\`\``, "326075875466412033");
			return null;
		});
	if (!result) return;
	for (let t of result.body) {
		if (t.type) continue;

		// Try to fetch user → send error to manager channel;
		let user = await client.users.fetch(t.user);
		if (!user) {
			client.apiSend(`<@${config.supportRole}>\n[DISCOIN Couldn't find user ${t.user} to give ${t.amount}`);
			continue;
		}

		// add amount
		let account = await user.account();
		account.balance += t.amount;
		await r.table("Accounts").get(account.id).update({ balance: account.balance });

		// Send msgs
		user.send({ embed: { color: config.colors.receipt, title: "You received credits", description: `An amount of ¥${t.amount} has been added to your account through Discoin.`, timestamp: new Date(), author: { name: client.user.username, icon_url: client.user.displayAvatarURL() } } });
		client.log(`:repeat: ${user.username} (${user.id}) received ¥${t.amount} from Discoin`);
	}
});

// Vote check
scheduleJob("*/5 * * * *", async() => {
	let guildCount = (await client.shard.fetchClientValues("guilds.size")).reduce((a, b) => a + b, 0);

	let result = await get("http://hill-playroom.glitch.me/dtel")
		.set("Authorization", auth.tokens.blspace)
		.set("Content-Type", "application/json")
		.set("count", guildCount.toString())
		.catch(e => {
			client.apiSend(`Yo, there might be something wrong with the glitch API.\n\`\`\`\n${e}\n\`\`\``, "377945714166202368");
			return null;
		});
	if (!result) return client.apiSend(`Yo, there might be something wrong with the glitch API.`, "377945714166202368");

	let votes = JSON.parse(result.text.toString());
	let users = Object.keys(votes);

	for (let user of users) {
		user = await client.users.fetch(user).catch(e => null);
		if (!user) {
			continue;
		}

		// save new balance
		let account = await user.account();
		account.balance += votes[user.id];
		await r.table("Accounts").get(account.id).update({ balance: account.balance });

		// save the votes for leaderboard
		let monthlyVotes = await r.table("Votes").get(user.id);
		if (!monthlyVotes) {
			monthlyVotes = { id: user.id, amount: 0 };
			await r.table("Votes").insert(monthlyVotes);
		}
		monthlyVotes.amount += votes[user.id] / 10;
		await r.table("Votes").get(user.id).update({ amount: monthlyVotes.amount });

		// Let the user know and log the votes
		user.send({ embed: { color: config.colors.receipt, title: "Thanks for voting!", description: `You received ¥${votes[user.id]} for voting!`, author: { name: client.user.username, icon_url: client.user.displayAvatarURL() }, timestamp: new Date() } });
		client.log(`:ballot_box: ${user.tag} (${user.id}) received ¥${votes[user.id]} from voting.`);
	}
});

scheduleJob("0 20 1 0 0", async() => {
	let prize = 1;
	let topSize = 5;

	// Retrieve, delete and check database information
	let votes = await r.table("Votes");
	await r.table("Votes").delete();
	if (votes.length === 0) return client.log(`<:blobsad:386228996486070272> No voters this month.`);

	// Sort the array and get winner(s)
	await votes.sort((v1, v2) => v2.amount - v1.amount);
	let filteredVotes = votes.filter(vote => !config.maintainers.includes(vote.id));
	if (filteredVotes.length === 0) return client.log(`<:blobsad:386228996486070272> No qualifying voters this month.`);
	let winners = filteredVotes.filter(vote => vote.amount === filteredVotes[0].amount);

	// Give prize
	for (let winner of winners) {
		let user = await client.users.fetch(winner.id).catch(e => null);
		if (!user) client.apiSend(`<@${config.supportRole}> couldn't fetch vote winner ${user.id}`, config.badLogsChannel);

		let account = await user.account();
		account.vip ? account.vip += prize : account.vip = prize;
		await r.table("Accounts").get(account.id).update({ vip: account.vip });
		client.log(`🏆 ${user.username} (${user.id}) won ${prize} VIP Month for being ${winners.length === 1 ? "the" : "a"} highest voter.`);

		user.send({ embed: { color: config.colors.info, title: "Congratulations!", description: `You have received ${prize} VIP Months for being ${winners.length === 1 ? "the" : "a"} highest voter this month.` } }).catch(e => null);
	}

	// Make the announcement embed
	let winnersString = "";
	for (let winner of winners) {
		let user = await client.users.get(winner.id).catch(e => null);
		winnersString += user ? `-${user.username}\n` : "Unknown";
	}

	let month = new Date().toLocaleString("default", { month: "long" });
	let embed = {
		color: config.colors.info,
		title: `${month}'s highest voters'`,
		description: `The voter(s) with the highest amount have been awarded ${prize} VIP Month(s).`,
		footer: {
			text: "Note that bosses do not qualify for the prize.",
		},
		fields: [
			{
				name: winners.length === 1 ? "Winner" : "Winners",
				value: winnersString,
			},
		],
	};
	if (winners.length === 1) {
		let firstUser = await client.users.fetch(winners[0].id).catch(e => null);
		if (firstUser) embed.author = { name: firstUser.username, icon_url: firstUser.displayAvatarURL() };
	}

	// Add a list of top voters
	let topString = "";
	let top = votes.splice(0, topSize - 1);
	for (let vote of top) {
		let voteUser = await client.users.fetch(vote.id).catch(e => null);
		let username = voteUser ? voteUser.username : "Unknown";
		topString += `${top.indexOf(vote) + 1}. ${vote.amount} votes - ${username}`;
	}
	embed.fields.push({ name: `Top ${topSize}`, value: topString });

	// Send the embed
	try {
		client.apiSend({ embed: embed }, config.announcementChannel);
	} catch (e) {
		console.error(e);
		client.apiSend({ content: `<@${config.supportRole}> Couldn't send voting leaderboard announcement.`, embed: embed }, config.badLogsChannel);
	}
});


// Job to delete numbers if expired for a long time
scheduleJob("0 0 0 * * *", async() => {
	// Don't just change lastwarn k
	const warnDays = 15;
	const lastWarn = 29;
	const deleteDays = 30;

	let time = Date.now();
	const warnMS = time - (warnDays * 86400000);
	const lastWarnMS = time - (lastWarn * 86400000);
	const deleteMS = time - (deleteDays * 86400000);

	if (client.shard.id != 0) return;

	const numbers = await r.table("Numbers");
	let deleted = [];

	for (let number of numbers) {
		let channel = await client.api.channels(number.channel).get().catch(e => null);
		if (!channel) {
			await client.delete(number, { force: true, log: true, origin: "scheduled_noChannel" });
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

		let expiryMS = new Date(number.expiry).getTime();

		// First check wether number isn't (>15d) expired - then warn/delete.
		if (expiryMS > warnMS) continue;
		if (expiryMS < deleteMS) {
			await client.delete(number, { force: true, log: true, origin: "scheduled_expired" });
			deleted.push(number);

			otitle = `Your number has been deleted`;
			odesc = `Your number (${number.id}) in <#${channel.id}> has been deleted as it has been expired for >${deleteDays} days.`;
			ctitle = `This channel's number has been deleted`;
			cdesc = `This channel's number (${number.id}) has been deleted as it has been expired for >${deleteDays} days.`;
		} else if (expiryMS < warnMS && expiryMS > warnMS - 86400000) {
			otitle = `Your number soon be deleted.`;
			odesc = `Your number ${number.id} in <#${channel.id}> has expired and will be automatically deleted in ${deleteDays - warnDays} days. To prevent losing your number (and all that comes with it), please extend the duration of your number by calling \`*233\`. `;
			ctitle = `This number will soon be deleted`;
			cdesc = `This channel's number (${number.id}) has been expired for >${warnDays} days and will automatically be deleted in ${deleteDays - warnDays}. To prevent losing this number and all its settings, please extend it by calling \`*233\`.`;
		} else if (expiryMS < lastWarnMS && expiryMS > lastWarnMS - 86400000) {
			otitle = `❕This number will be deleted in 24h❕`;
			odesc = `Your number ${number.id} in <#${channel.id}> has been expired for >${lastWarn} days and will automatically be deleted in **24h**. To prevent losing your number (and all that comes with it), please extend the duration of your number by calling \`*233\`. `;
			ctitle = `❕This number will be deleted in 24h❕`;
			cdesc = `This channel's number (${number.id}) has been expired for >${lastWarn} days and will automatically be deleted in **24h**. To prevent losing this number and all its settings, please extend it by calling \`*233\`.`;
		}

		embed.setTitle(ctitle)
			.setDescription(cdesc);
		await client.apiSend({ embed: embed }, channel.id).catch(e => null);
		embed.setTitle(otitle)
			.setDescription(odesc)
			.setFooter("You are receiving this as you are the owner of the server.");
		if (owner) await (await client.users.fetch(owner)).send({ embed: embed }).catch(e => null);
	}

	// someone switch package for this
	// let haste;
	// try {
	// 	haste = await post("http://hastebin.com/documents").send(`// Deleted numbers: ${new Date()}\n\n${JSON.stringify(deleted)}`);
	// } catch (err) {
	// 	haste = null;
	// }

	let count = deleted.length;
	winston.info(`[ScheduleJob] Deleted ${count} expired numbers`);
	// if (haste) client.log(`🔥 Automatically deleted ${count} numbers. Results: <http://hastebin.com/${haste.body.key}>`);
	client.log(`🔥 Automatically deleted ${count} numbers. Still not posting to hastebin.`);
});

// Job to delete stored messages of calls.
scheduleJob("0 0 0 * * *", async() => {
	let date = new Date();

	// start deleting after 2 days, 5 day buffer to ensure none accidentally left.
	let beginDate = new Date().setDate(date.getDate() - 7);
	let endDate = new Date().setDate(date.getDate() - 2);

	let result = await r.table("OldCalls").between(new Date(beginDate), new Date(endDate), { index: "startedAt" }).replace(r.row.without("messages"));

	client.log(`📖 Cleared messages of ${result.replaced} calls.`);
});
