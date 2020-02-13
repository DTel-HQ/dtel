const auth = require("../Configuration/auth.js");
const { get, post, patch } = require("chainfetch");

// Vote check
module.export = scheduleJob => {
	scheduleJob("*/1 * * * *", async() => {
		if (client.user.id != config.botID) return;
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

		let votes = result.body;
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
			let dmChannel = await user.createDM().catch(e => null);
			if (dmChannel) dmChannel.send({ embed: { color: config.colors.receipt, title: "Thanks for voting!", description: `You received <:DTS:668551813317787659>${votes[user.id]} for voting!`, author: { name: client.user.username, icon_url: client.user.displayAvatarURL() }, timestamp: new Date() } });
			client.log(`:ballot_box: ${user.username} (${user.id}) received <:DTS:668551813317787659>${votes[user.id]} from voting.`);
		}
	});

	// voting leaderboard
	scheduleJob("0 20 * * 0", async() => {
		let prize = 1;
		let topSize = 6;

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
			let user = await client.users.get(winner.id);
			winnersString += user ? `-${user.username}\n` : "Unknown";
		}

		let month = new Date().toLocaleString("default", { month: "long" });
		let embed = {
			color: config.colors.vip,
			title: `This week's highest voters`,
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
			topString += `${top.indexOf(vote) + 1}. ${vote.amount} votes - ${username}\n`;
		}
		embed.fields.push({ name: `Top ${topSize - 1}`, value: topString });

		// Send the embed
		try {
			client.apiSend({ embed: embed }, config.announcementChannel);
		} catch (e) {
			console.error(e);
			client.apiSend({ content: `<@${config.supportRole}> Couldn't send voting leaderboard announcement.`, embed: embed }, config.badLogsChannel);
		}
	});
};
