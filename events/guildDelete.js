const snekfetch = require("snekfetch");

module.exports = async(client, guild) => {
	// eslint-disable-next-line no-useless-escape
	const censorship = guild.name.replace(/(\*|\`|\_|\~)/, "\\$1").replace(/discord\.(gg|io|me|li)\/([\w\d])+/g, "**Invite Link Censored**").replace(/@(everyone|here)/g, "@\u200b$1");
	try {
		await client.apiSend(`:outbox_tray: Left \`${censorship}\` (${guild.id}). Currently in ${client.guilds.size} servers on shard **${client.shard.id}**.`, process.env.LOGSCHANNEL);
	} catch (err) {
		console.log(`[Shard ${client.shard.id}] Failed to post leave message for leaving guild`, err);
	}
	client.user.setActivity(`${client.guilds.size} servers on shard ${client.shard.id} | ${process.env.PREFIX}help`);
	if (process.env.BOTS_PW_TOKEN) {
		try {
			await snekfetch.post(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
				.set(`Authorization`, process.env.BOTS_PW_TOKEN)
				.set(`Content-Type`, "application/json")
				.send({
					shard_id: client.shard.id,
					shard_count: client.shard.count,
					server_count: client.guilds.size,
				});
		} catch (err) {
			console.log(`[Shard ${client.shard.id}] Failed to post to DBots`, err);
		}
		try {
			await snekfetch.post(`https://fortunate-fisherman.glitch.me/dtel`)
				.set(`Authorization`, process.env.BOTS_PW_TOKEN)
				.set(`Content-Type`, "application/json")
				.send({
					shard_id: client.shard.id,
					shard_count: client.shard.count,
					server_count: client.guilds.size,
				})
				.then(r => { if (!r.body.includes("sun")) {
					client.user.setActivity(`${r.body} servers | ${process.env.PREFIX}help`);
				}});
		} catch (err) {
			console.log(`[Shard ${client.shard.id}] Failed to post to private glitch server`, err);
		}
	}
};
