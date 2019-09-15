module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">blacklist [userID/mention]" } });
	if (suffix === config.supportGuild) return msg.channel.send({ embed: { color: config.colors.error, title: "No", description: "Just no" } });

	let toBlacklist;
	if (msg.mentions.users.first()) {
		toBlacklist = msg.mentions.users.first();
		suffix = toBlacklist.id;
	}
	if (!toBlacklist) {
		toBlacklist = await client.users.fetch(suffix)
			.catch(() => null);
	}
	if (!toBlacklist) {
		toBlacklist = await client.api.guilds(suffix).get()
			.catch(_ => null);
	}
	if (!toBlacklist) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown ID", description: "Couldn't find a user or guild with that ID" } });

	let user = await client.users.fetch(toBlacklist.id).catch(e => null);

	let doc = await r.table("Blacklist").get(toBlacklist.id);
	if (doc) {
		await r.table("Blacklist").get(toBlacklist.id).delete();
		client.log(`:wrench: ID \`${suffix}\` has been removed from the blacklist by ${msg.author.tag}.`);
		return msg.channel.send({ embed: {
			color: config.colors.success,
			author: {
				name: user ? toBlacklist.tag : toBlacklist.name,
				icon_url: user ? toBlacklist.displayAvatarURL() : `https://cdn.discordapp.com/icons/${toBlacklist.id}/${toBlacklist.icon}`,
			},
			title: `Removed ${user ? "user" : "guild"} from the blacklist.`,
			description: `Removed ID ${toBlacklist.id} from the blacklist`,
			footer: {
				text: `By ${msg.author.tag} (${msg.author.id})`,
				icon_url: msg.author.displayAvatarURL(),
			},
			timestamp: new Date(),
		} });
	}

	if (suffix === msg.author.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Dumbo", description: "You dumb :b:oi, don't blacklist yourself!" } });
	if (user && (await user.getPerms()).support) return msg.channel.send({ embed: { color: config.colors.error, title: "Staff", description: "Don't like your collegue? Think of a better way to get rid of them!" } });

	await r.table("Blacklist").insert({ id: toBlacklist.id });
	client.log(`:hammer: ID \`${suffix}\` has been added to the blacklist by ${msg.author.tag}.`);
	msg.channel.send({ embed: {
		color: config.colors.success,
		author: {
			name: user ? toBlacklist.tag : toBlacklist.name,
			icon_url: user ? toBlacklist.displayAvatarURL() : `https://cdn.discordapp.com/icons/${toBlacklist.id}/${toBlacklist.icon}`,
		},
		title: `Added ${user ? "user" : "guild"} to the blacklist.`,
		description: `Added ID ${toBlacklist.id} to the blacklist`,
		footer: {
			text: `By ${msg.author.tag} (${msg.author.id})`,
			icon_url: msg.author.displayAvatarURL(),
		},
		timestamp: new Date(),
	} });
};
