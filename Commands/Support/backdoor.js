module.exports = async(client, msg, suffix) => {
	if (msg.guild) msg.delete();
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >backdoor [number/channelID]" } });

	let channel, number;

	if (/\d{11}/.test(suffix)) {
		number = client.replaceNumber(suffix);
		let numberDoc = await r.table("Numbers").get(number);
		if (!numberDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid number", description: "Not a valid number." } });
		suffix = numberDoc.channel;
	}
	channel = await client.api.channels(suffix).get()
		.catch(() => { msg.author.send({ embed: { color: config.colors.error, title: "Invalid channel", description: "Not a valid channel." } }); return null; });

	if (!channel) return;

	number = number || await r.table("Numbers").getAll(suffix, { index: "channel" }).default(null).nth(0);
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "There is no number associated with this channel. Contact your bosses if this is urgent." } });

	client.api.channels(suffix).invites.post({
		data: {
			max_uses: 1,
			temporary: true,
		},
		reason: `Customer Support Agent ${msg.author.tag} ran backdoor.`,
	})
		.then(invite => {
			msg.author.send(`https://discord.gg/${invite.code}`)
				.catch(_ => msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "Couldn't DM you the invite. Please accept DMs from the bot." } }));
		})
		.catch(() => msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "Privilege is too low." } }));
};
