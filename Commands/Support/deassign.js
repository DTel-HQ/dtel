module.exports = async(client, msg, suffix) => {
	let toDeassign = suffix.split(" ")[0];

	if (!toDeassign) return msg.channel.send({ embed: { color: config.colors.info, title: "Where?", description: "Select a channel/number to deassign." } });

	let number = await client.replaceNumber(suffix);

	let numberDoc = await r.table("Numbers").get(number).default(null);
	if (!numberDoc) {
		if (msg.mentions.channels.first()) toDeassign = msg.mentions.channels.first().id;
		numberDoc = await r.table("Numbers").getAll(toDeassign, { index: "channel" }).nth(0).default(null);
	}
	if (!numberDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Huh?", description: "That number/channel could not be found." } });

	client.delete(numberDoc, { force: true, log: false });

	const channel = await client.api.channels(numberDoc.channel).get();
	if (channel.guild_id) {
		try {
			const guild = await client.api.guilds(channel.guild_id).get();
			const owner = await client.users.fetch(guild.owner_id);
			const dmChannel = await owner.createDM();
			dmChannel.send({ embed: { color: config.colors.info, title: "Number removal confirmation", description: `One of our staff has removed the number in <#${numberDoc.channel}>.\n\nIf this action wasn't requested, and you feel like it's unjust, you can dispute the removal in our support server (\`>links\`).`, timestamp: new Date() } });
		} catch (e) {
			// ignore
		} finally {
			client.apiSend({ embed: { color: config.colors.info, title: "This channel's number has been deassigned.", description: "If this action wasn't requested, and you feel like it's unjust, you can dispute the removal in our support server (`>links`).", timestamp: new Date() } }, numberDoc.channel);
		}
	} else {
		try {
			await client.api.channels(numberDoc.channel).messages.post({ embed: config.colors.info, title: "Your number has been deassigned", description: `Your personal number \`${numberDoc.id}\` has just been deassigned.\nIf you didn't request this removal, contact support by joining our server (\`>links\`).`, timestamp: new Date() });
		} catch (e) {
			// ignore
		}
	}

	await msg.channel.send({ embed: { color: config.colors.success, title: "R.I.P.", description: `${numberDoc.id} has been deassigned.`, author: { name: msg.author.tag, icon_url: msg.author.displayAvatarURL() } } });
	await client.log(`:closed_book: Number \`${numberDoc.id}\` has been deassigned from channel ${numberDoc.channel} by ${msg.author.tag}.`);
};
