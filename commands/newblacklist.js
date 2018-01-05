module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.has(user_id);
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
		bot.channels.get("282253502779228160").send(`:wrench: Guild ID \`${message.content}\` is removed from guild blacklist by ${message.author.username}.`);
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
		bot.channels.get("282253502779228160").send(`:wrench: Guild ID \`${message.content}\` is added to the guild blacklist by ${message.author.username}.`);
	} else if (userBlacklist) {
		Blacklist.create(new Blacklist({ _id: message.content, type: "user" }));
		bot.channels.get("282253502779228160").send(`:hammer: User ID \`${message.content}\` is added to blacklist by ${message.author.username}.`);
	}
};
