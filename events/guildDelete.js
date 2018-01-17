const snekfetch = require("snekfetch");

module.exports = async(client, guild) => {
	const censorship = guild.name.replace(/discord\.(gg|io|me|li)\/([0-9]|[a-z])*/g, "**Invite link censored**");
	try {
		await client.api.channels(process.env.LOGSCHANNEL).messages.post({
			data: {
				content: `:outbox_tray: Left \`${censorship}\` (${guild.id}). Currently in ${client.guilds.size} servers on shard **${client.shard.id}**.`,
			},
		});
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
	}
};
