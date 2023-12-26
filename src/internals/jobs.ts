import { Range, scheduleJob } from "node-schedule";
import auth from "@src/config/auth";
import config from "@src/config/config";
import { db } from "@src/database/db";
import { EmbedBuilder } from "discord.js";
import { client } from "@src/instances/client";
import { winston } from "@src/instances/winston";

interface playingCtx {
	guildCount: number
	userCount: number
}

const playingJob = scheduleJob({
	minute: new Range(0, 59, 15),
}, async() => {
	const guildCount = await client.getGuildCount();

	const userCount = (await client.shard!.fetchClientValues("users.cache.size")).reduce((a, b) => (a as number) + (b as number), 0) as number;

	client.shard!.broadcastEval<void, playingCtx>((c, ctx) => {
		c.user!.setActivity({
			name: `${ctx.guildCount.toString()} servers and ${ctx.userCount.toString()} users | /help`,
			type: 3,
		});
	}, {
		context: {
			guildCount: guildCount,
			userCount: userCount,
		},
	});


	winston.verbose("[Jobs] Updated playing status.");
});

let WCVotes = 0;
const votingJob = !config.devMode && scheduleJob("*/1 * * * *", async() => {
	const guildCount = await client.getGuildCount();

	if (guildCount === -1) return;

	const updateResults = await fetch("https://discord.austinhuang.me/dtel", {
		method: "GET",
		headers: {
			Authorization: auth.blspace,
			"Content-Type": "application/json",
			count: guildCount.toString(),
		},
	}).catch(e => {
		// From V3, no idea what this does
		WCVotes++;
		if (WCVotes % 300 == 10) client.sendCrossShard(`<@&${config.supportGuild.roles.boss}> Yo, there might be something wrong with the votes API.\n\`\`\`\n${e}\n\`\`\``, config.supportGuild.channels.management);
		client.sendCrossShard(`Yo, there might be something wrong with the votes API.\n\`\`\`\n${e}\n\`\`\``, config.supportGuild.channels.management);
		return null;
	});
	if (!updateResults) return;

	let responseBody;
	try {
		responseBody = await updateResults.json(); // Array of User IDs
	} catch (e) {
		await client.sendCrossShard(`Yo, there might be something wrong with the votes API.\n\`\`\`\n${e}\n\`\`\``, config.supportGuild.channels.management);
		return;
	}

	const userIDs = Object.keys(responseBody);

	for (const id of userIDs) {
		const user = await client.getUser(id);
		if (!user) {
			continue;
		}

		await db.accounts.upsert({
			where: {
				id: user.id,
			},
			update: {
				balance: {
					increment: responseBody[id],
				},
			},
			create: {
				id: user.id,
				balance: responseBody[id],
			},
		});

		// save the votes for leaderboard

		await db.votes.upsert({
			where: {
				userID: user.id,
			},
			update: {
				count: {
					increment: responseBody[user.id] / 10,
				},
			},
			create: {
				userID: user.id,
				count: responseBody[user.id] / 10,
			},
		});

		// Let the user know and log the votes
		const dmEmbed = new EmbedBuilder()
			.setColor(config.colors.receipt)
			.setTitle("Thanks for voting!")
			.setDescription(`You received ${config.dtsEmoji}${responseBody[user.id]} for voting!`)
			.setAuthor({
				name: client.user.username,
				iconURL: client.user.displayAvatarURL(),
			})
			.setTimestamp(Date.now());

		const dmChannel = await user.createDM().catch(() => null);
		if (dmChannel) dmChannel.send({ embeds: [dmEmbed] }).catch(() => null);

		client.log(`:ballot_box: ${user.username} (${user.id}) received ${config.dtsEmoji}${responseBody[user.id]} from voting.`);
	}
});

// Job to give out weekly VIP voting prize
scheduleJob("0 20 * * 0", async() => {
	const prizeMonths = 1;
	const givenToTop = 6;

	const topVoters = await db.votes.findMany({
		orderBy: {
			count: "desc",
		},
		take: givenToTop,
	});

	if (topVoters.length === 0) {
		return client.log(`<:blobsad:386228996486070272> No qualifying voters this week.`);
	}

	const usernames: string[] = [];

	for (const voteDescription of topVoters) {
		const user = await client.getUser(voteDescription.userID).catch(() => null);
		if (!user) client.sendCrossShard(`<@${config.supportGuild.roles.customerSupport}> couldn't fetch vote winner ${voteDescription.userID}`, config.supportGuild.channels.badLogs);

		usernames.push(user?.username || "Unknown");

		await db.accounts.upsert({
			where: {
				id: voteDescription.userID,
			},
			update: {
				vipMonthsRemaining: {
					increment: prizeMonths,
				},
			},
			create: {
				id: voteDescription.userID,
				vipMonthsRemaining: prizeMonths,
			},
		});

		if (!user) return;

		const dmChannel = await user.createDM().catch(() => null);
		if (!dmChannel) continue;

		const winningEmbed = new EmbedBuilder()
			.setColor(config.colors.vip)
			.setTitle("Congratulations!")
			.setDescription(`You have received ${prizeMonths} VIP Month(s) for being ${topVoters.length === 1 ? "the" : "a"} highest voter this week.`)
			.setFooter({
				text: "You can now make any number of your choice VIP by dialing *411 and selecting VIP Options.",
			});

		user.send({ embeds: [winningEmbed] }).catch(() => null);
	}

	// Delete all votes
	await db.votes.deleteMany({});

	const announcementEmbed = new EmbedBuilder()
		.setColor(config.colors.vip)
		.setTitle("This week's top voters")
		.setDescription(`The voter(s) who voted the most have been awarded ${prizeMonths} VIP month${prizeMonths == 1 ? "" : "s"}.`)
		.addFields([{
			name: topVoters.length === 1 ? "Winner" : "Winners",
			value: usernames.map(u => `-${u}`).join("\n"),
		}, {
			name: "Want to win?",
			value: `Make sure to [vote for us on these sites](${config.voteLink})! (You also get free ${config.dtsEmoji} for voting.)`,
		}])
		.setFooter({
			text: `Note that bosses do not quality for the prize.`,
		});

	if (topVoters.length === 1) {
		const firstUser = await client.getUser(topVoters[0].userID).catch(() => null);
		if (firstUser) announcementEmbed.setAuthor({ name: firstUser.username, iconURL: firstUser.displayAvatarURL() });
	}

	announcementEmbed.addFields([{
		name: `Top ${givenToTop}`,
		value: topVoters.map((v, i) => `${i + 1}. ${v.count} vote${v.count == 1 ? "" : "s"} - ${usernames[i]}`).join("\n"),
	}]);

	try {
		const res = await client.sendCrossShard({ embeds: [announcementEmbed] }, config.supportGuild.channels.announcement);
		await client.rest.post(`/channels/${config.supportGuild.channels.announcement}/messages/${res.id}/crosspost`);
	} catch (e) {
		console.error(e);
		client.sendCrossShard(`<@${config.supportGuild.roles.customerSupport}> Couldn't send voting leaderboard announcement.`, config.supportGuild.channels.badLogs);
	}
});

// Job to delete stored messages of calls.
scheduleJob("0 0 0 * * *", async() => {
	const date = new Date();

	// start deleting after 2 days, 5 day buffer to ensure none accidentally left.
	const beginDate = new Date().setDate(date.getDate() - 7);
	const endDate = new Date().setDate(date.getDate() - 2);

	const calls = (await db.archivedCalls.aggregateRaw({
		pipeline: [{
			$match: {
				ended: {
					at: {
						$gt: beginDate,
					},
				},
			},
		}, {
			$match: {
				ended: {
					at: {
						$lt: endDate,
					},
				},
			},
		}],
	}) as unknown as { _id: string }[]).map(c => c._id);

	const result = await db.callMessages.deleteMany({
		where: {
			callID: {
				in: calls,
			},
		},
	});

	client.log(`📖 Cleared ${result.count} messages from ${calls.length} calls.`);
});
