module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **You forgot to add a message!**");

	const announcementEmbed = {
		color: config.colors.info,
		author: {
			name: "DTel staff",
			url: config.siteLink,
			icon_url: client.user.displayAvatarURL(),
		},
		title: "DTel Maintainer Announcement",
		description: suffix,
		timestamp: new Date(),
	};

	let omsg = await msg.channel.send({
		content: "This will be the embed sent to all servers/DM channels. Reply `confirm` to confirm or `0` to quit.",
		embed: announcementEmbed,
	});

	const collected = (await msg.channel.awaitMessages(m => m.author.id === msg.author.id && ["confirm", "0"].includes(m.content.toLowerCase()), { max: 1, time: 60000 })).first();
	if (!collected || collected.content !== "confirm") {
		omsg.edit({ content: "", embed: { color: config.colors.error, title: "Announcement stopped" } });
		return;
	}

	omsg = await omsg.edit({ content: "", embed: { color: config.colors.info, title: "Sending...", description: "You will be updated when all numbers have been informed. This will take a while." } });
	let time = await process.hrtime();

	let allNumbers = await r.table("Numbers");
	let guilds = [];
	let count = 0;
	let errors = 0;
	for (let n of allNumbers) {
		let channel = await client.api.channels(n.channel).get().catch(() => null);
		if (!channel) continue;
		if (channel.guild_id && guilds.includes(channel.guild_id)) continue;
		count++;
		if (channel.guild_id) guilds.push(channel.guild_id);
		try {
			await client.apiSend({
				embed: announcementEmbed,
			}, n.channel);
		} catch (e) {
			errors++;
		}
	}
	let diff = await process.hrtime(time);
	let sec = ((diff[0] * 1e9) + diff[1]) / 1e9;
	let h = Math.floor(sec / 3600);
	let m = Math.floor(sec / 60);
	let s = Math.round(sec - (m * 60));
	let t = await client.time(s, m, h);

	omsg.edit({
		embed: {
			author: {
				name: msg.author.tag,
				icon_url: msg.author.displayAvatarURL(),
			},
			color: config.colors.success,
			title: "Message successfully sent.",
			description: `[• Guilds:](${config.siteLink}) ${count}\n[• Errors:](${config.siteLink}) ${errors}\n[• Message:](${config.siteLink}) ${suffix}\n[• Time:](${config.siteLink}) ${t}`,
			footer: {
				text: msg.author.id,
			},
			timestamp: new Date(),
		},
	});
};
