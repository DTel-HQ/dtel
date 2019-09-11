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
	toBlacklist = toBlacklist.id;

	let doc = await r.table("Blacklist").get(toBlacklist);
	if (doc) {
		await r.table("Blacklist").get(toBlacklist).delete();
		client.log(`:wrench: ID ${suffix} is removed from blacklist by ${msg.author.tag}.`);
		return msg.channel.send({ embed: { color: config.colors.success, title: `Removed`, description: `Removed ID ${suffix} from the blacklist` } });
	}

	if (suffix === msg.author.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Dumbo", description: "You dumb :b:oi, don't blacklist yourself!" } });
	let user = await client.users.fetch(suffix);
	if (user && (await user.getPerms()).support) return msg.channel.send({ embed: { color: config.colors.error, title: "Staff", description: "Don't like your collegue? Think of a better way to get rid of them!" } });

	await r.table("Blacklist").insert({ id: suffix });
	client.log(`:hammer: ID \`${suffix}\` has been added to the blacklist by ${msg.author.tag}.`);
	msg.channel.send({ embed: { color: config.colors.success, title: "Added", description: `Added ID ${suffix} to the blacklist.` } });
};
