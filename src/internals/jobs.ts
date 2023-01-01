import { ActivityType } from "discord.js";
import { scheduleJob } from "node-schedule";
import { client, winston } from "../dtel";

interface playingCtx {
	guildCount: number
	userCount: number
}

const playingJob = scheduleJob("*/60 * * * * *", async() => {
	const guildCount = (await client.shard!.fetchClientValues("guilds.cache.size")).reduce((a, b) => (a as number) + (b as number), 0) as number;

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


	winston.verbose("[ScheduleJob] Updated status.");
});

playingJob.invoke();
