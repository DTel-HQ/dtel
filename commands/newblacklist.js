module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	if (!support(message.author.id)) return;
	if (!args) return message.reply("u forgot id :b:");
	let document, guildBlacklist, userBlacklist;
	try {
		document = await Blacklist.findOne({ _id: message.author.id });
		if (!document) throw new Error();
	} catch (err) {
		// Ignore error
	}
	if (document) {
		bot.channels.get(process.env.LOGSCHANNEL).send(`:wrench: Guild ID \`${message.content}\` is removed from guild blacklist by ${message.author.username}.`);
		await document.remove();
	} else {
		try {
			guildBlacklist = bot.guilds.get(message.content);
		} catch (err) {
			try {
				userBlacklist = bot.users.get(message.content);
			} catch (err2) {
				message.reply("Invalid ID");
			}
		}
	}
	if (guildBlacklist) {
		Blacklist.create(new Blacklist({ _id: message.content, type: "guild" }));
		bot.channels.get(process.env.LOGSCHANNEL).send(`:wrench: Guild ID \`${message.content}\` is added to the guild blacklist by ${message.author.username}.`);
	} else if (userBlacklist) {
		Blacklist.create(new Blacklist({ _id: message.content, type: "user" }));
		bot.channels.get(process.env.LOGSCHANNEL).send(`:hammer: User ID \`${message.content}\` is added to blacklist by ${message.author.username}.`);
	}
};
