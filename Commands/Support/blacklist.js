module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">blacklist [user/serverID] [reason]" } });
	suffix = suffix.split(" ");
	const target = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix[0];
	const silent = suffix.includes("-s");
	if (silent) suffix.splice(suffix.indexOf("-s"), 1);
	const reason = suffix.slice(1).join(" ");

	if (target === config.supportGuild) return msg.channel.send({ embed: { color: config.colors.error, title: "No", description: "Just no" } });

	let user;
	try {
		user = await client.users.fetch(target);
	} catch (_) {
		user = null;
	}
	let guild;
	if (!user) guild = await client.guilds.resolve(target);
	if (!user && !guild) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown ID", description: "Couldn't find a user or server with that ID" } });

	const dmChannel = await user.createDM();

	let blacklisted = user ? await user.blacklisted : await guild.blacklisted;
	if (blacklisted) {
		let res = user ? await user.unBlacklist() : await guild.unBlacklist();
		if (!res.deleted) return msg.channel.send({ embed: { color: config.colors.error, title: "ID was not deleted", description: "The ID could not be deleted from the DB" } });

		client.log(`:wrench: ID \`${target}\` has been removed from the blacklist by \`${msg.author.tag}\`.`);
		if (!silent && dmChannel) {
			dmChannel.send({ embed: { color: config.colors.info, title: "You've been pardoned", description: "You have been removed from the blacklist.\nYour record, however, has not be cleansed. Meaning any violation will put you back on the blacklist." } })
				.catch(e => null);
		}
		return msg.channel.send({ embed: {
			color: config.colors.success,
			author: {
				name: user ? user.tag : guild.name,
				icon_url: user ? user.displayAvatarURL() : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
			},
			title: `Removed ${user ? "user" : "guild"} from the blacklist.`,
			description: `${user ? `\`${user.tag}\`` : `\`${guild.name}\``} has been removed from the blacklist`,
			footer: {
				text: `By ${msg.author.tag} (${msg.author.id})`,
				icon_url: msg.author.displayAvatarURL(),
			},
			timestamp: new Date(),
		} });
	}

	if (target === msg.author.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Dumbo", description: "You dumb :b:oi, don't blacklist yourself!" } });
	if (user && user.support) return msg.channel.send({ embed: { color: config.colors.error, title: "Hah good try", description: "Don't like your collegue? Think of a better way to get rid of them!" } });

	let res = user ? await user.blacklist(reason) : await guild.blacklist(reason);
	if (!res.inserted) return msg.channel.send({ embed: { color: config.colors.error, title: "ID was not inserted", description: "The ID was not inserted into the DB" } });

	client.log(`:hammer: ID \`${target}\` has been added to the blacklist by \`${msg.author.tag}\`.`);
	if (!silent && dmChannel) {
		dmChannel.send({ embed: { color: config.colors.error, title: "You've been blacklisted", description: "This means you can no longer use DTel.\n\nIf you feel like this action was unjust, you can dispute it with one of the bosses in the support server." } })
			.catch(e => null);
	}
	return msg.channel.send({ embed: {
		color: config.colors.success,
		author: {
			name: user ? user.tag : guild.name,
			icon_url: user ? user.displayAvatarURL() : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
		},
		title: `Added ${user ? "user" : "guild"} to the blacklist.`,
		description: `${user ? `\`${user.tag}\`` : `\`${guild.name}\``} has been blacklisted.`,
		footer: {
			text: `By ${msg.author.tag} (${msg.author.id})`,
			icon_url: msg.author.displayAvatarURL(),
		},
		timestamp: new Date(),
	} });
};
