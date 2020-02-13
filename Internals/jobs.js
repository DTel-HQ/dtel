const { scheduleJob } = require("node-schedule");
const { readdir } = require("fs-nextra");

const jobs = readdir("../Jobs/");
for (let job of jobs) require(`../Jobs/${job}`)(scheduleJob);

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
		client.shard.broadcastEval(`this.user.setPresence({ activity: { name: \`>wizard | >help | [\${this.shard.id}] \`, type: 2 } });`);
	}
	winston.verbose("[ScheduleJob] Updated status.");
});
