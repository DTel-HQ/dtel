module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");

	let allNumbers = await r.table("Numbers");
	let guilds = [];
	let count = 0;
	for (let n of allNumbers) {
		if (n.optOut) continue;
		let channel = await client.api.channels(n.channel).get().catch(() => null);
		if (channel) {
			if (guilds.includes(n.guild)) continue;
			count++;
			if (n.guild) guilds.push(n.guild);
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
				},
			}, n.channel).catch(() => null);
		}
	}
	msg.channel.send({
		embed: {
			author: {
				name: msg.author.tag,
				icon_url: msg.author.displayAvatarURL(),
			},
			color: config.colors.success,
			title: "Message successfully sent.",
			description: `[• Guilds:](${config.siteLink}) ${count}\n[• Message:](${config.siteLink}) ${suffix}`,
			footer: {
				text: msg.author.id,
			},
			timestamp: new Date(),
		},
	});
};
