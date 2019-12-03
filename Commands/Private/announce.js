module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");

	let omsg = await msg.channel.send({ embed: { color: config.colors.info, title: "Sending...", description: "You will be updated when all numbers have been informed. This may (it certainly will) take a while." } });
	let time = await process.hrtime();

	let allNumbers = await r.table("Numbers");
	let guilds = [];
	let count = 0;
	for (let n of allNumbers) {
		let channel = await client.api.channels(n.channel).get().catch(() => null);
		if (!channel) continue;
		if (channel.guild_id && guilds.includes(channel.guild_id)) continue;
		count++;
		if (channel.guild_id) guilds.push(channel.guild_id);
		await client.apiSend({
			embed: {
				color: config.colors.info,
				author: {
					name: msg.author.tag,
					url: config.siteLink,
					icon_url: msg.author.displayAvatarURL(),
				},
				title: "DiscordTel Maintainer Announcement",
				description: suffix,
				timestamp: new Date(),
			},
		}, n.channel).catch(() => null);
	}
	let diff = await process.hrtime(time);
	let sec = ((diff[0] * 1e9) + diff[1]) / 1e9;
	let m = Math.floor(sec / 60);
	let s = Math.round(sec - (m * 60));
	let t = await client.time(s, m);

	omsg.edit({
		embed: {
			author: {
				name: msg.author.tag,
				icon_url: msg.author.displayAvatarURL(),
			},
			color: config.colors.success,
			title: "Message successfully sent.",
			description: `[• Guilds:](${config.siteLink}) ${count}\n[• Message:](${config.siteLink}) ${suffix}\n[• Time:](${config.siteLink}) ${t}`,
			footer: {
				text: msg.author.id,
			},
			timestamp: new Date(),
		},
	});
};
