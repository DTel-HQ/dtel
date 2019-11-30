module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">blacklist [userID/mention]" } });
	if (suffix === config.supportGuild) return msg.channel.send({ embed: { color: config.colors.error, title: "No", description: "Just no" } });

	if (msg.mentions.users.first()) suffix = (await msg.mentions.users.first()).id;

	let user = await client.users.fetch(suffix).catch(e => null);
	let guild;
	if (!user) guild = await client.guilds.resolve(suffix);
	if (!user && !guild) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown ID", description: "Couldn't find a user or guild with that ID" } });

	let blacklisted = user ? user.blacklisted : guild.blacklisted;
	if (blacklisted) {
		let res = user ? user.unBlacklist() : await guild.unBlacklist();
		client.log(`:wrench: ID \`${suffix}\` has been removed from the blacklist by ${msg.author.tag}.`);
		return msg.channel.send({ embed: {
			color: config.colors.success,
			author: {
				name: user ? user.tag : guild.name,
				icon_url: user ? user.displayAvatarURL() : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
			},
			title: `Removed ${user ? "user" : "guild"} from the blacklist.`,
			description: `Removed ID ${suffix} from the blacklist`,
			footer: {
				text: `By ${msg.author.tag} (${msg.author.id})`,
				icon_url: msg.author.displayAvatarURL(),
			},
			timestamp: new Date(),
		} });
	}

	if (suffix === msg.author.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Dumbo", description: "You dumb :b:oi, don't blacklist yourself!" } });
	if (user && user.support) return msg.channel.send({ embed: { color: config.colors.error, title: "Staff", description: "Don't like your collegue? Think of a better way to get rid of them!" } });

	let res = user ? user.blacklist() : guild.blacklist();
	client.log(`:hammer: ID \`${suffix}\` has been added to the blacklist by ${msg.author.tag}.`);
	msg.channel.send({ embed: {
		color: config.colors.success,
		author: {
			name: user ? user.tag : guild.name,
			icon_url: user ? user.displayAvatarURL() : `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`,
		},
		title: `Added ${user ? "user" : "guild"} to the blacklist.`,
		description: `Added ID ${suffix} to the blacklist`,
		footer: {
			text: `By ${msg.author.tag} (${msg.author.id})`,
			icon_url: msg.author.displayAvatarURL(),
		},
		timestamp: new Date(),
	} });
};
