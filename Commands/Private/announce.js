module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");

	let allNumbers = await r.table("Numbers");
	for (let n of allNumbers) {
		let channel = await client.api.channels(n.channel).get().catch(() => null);
		if (channel) {
			await client.apiSend({
				embed: {
					title: "DiscordTel Maintainer Announcement",
					description: suffix,
					footer: {
						text: `Sent by ${msg.author.tag} (${msg.author.id})`,
					},
				},
			}, n.channel).catch(() => null);
		}
	}
	msg.reply("✅ Your message has been successfully globally announced.");
};
