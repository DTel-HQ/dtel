module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.reply("u forgot id :b:");
	if (suffix === config.supportGuild) return msg.reply("No thank you.");

	let toBlacklist;
	if (msg.mentions.users.first()) {
		toBlacklist = msg.mentions.users.first().id;
		suffix = toBlacklist;
	}
	if (!toBlacklist) {
		toBlacklist = await client.users.fetch(suffix)
			.catch(() => null);
	}
	if (!toBlacklist) {
		toBlacklist = await client.api.guilds(suffix).get()
			.catch(_ => null);
	}
	if (!toBlacklist) return msg.reply("Invalid ID!");

	let doc = await Blacklist.newGet(toBlacklist);
	if (doc) {
		doc.delete();
		await client.log(`:wrench: ID ${suffix} is removed from blacklist by ${msg.author.username}.`);
		return msg.reply(`Removed ID ${suffix} from the blacklist`);
	}

	if ((msg.guild && suffix === msg.guild.id) || suffix === msg.author.id) return msg.reply(`you dumb :b:oi, don't blacklist yourself!`);
	let user = await client.users.fetch(suffix);
	if (user && (await user.getPerms()).support) return msg.reply("Trying to get rid of the competition? Well you can't.");

	await Blacklist.create({ id: suffix });
	await client.log(`:hammer: ID ${suffix} has been added to the blacklist by ${msg.author.username}.`);
	msg.reply(`Added ID ${suffix} to the blacklist.`);
};
