const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, message, args) => {
	let perms = await client.permCheck(message.author.id);
	if (!perms.support) return;
	if (!args) return message.reply("u forgot id :b:");
	if (args === message.guild.id || args === message.author.id) return message.reply(`you dumb :b:oi, don't blacklist yourself!`);
	if (args === process.env.SUPPORTGUILD) return message.reply("No thank you.");
	let document;
	try {
		document = await Blacklist.findOne({ _id: args });
		if (!document) throw new Error();
	} catch (err) {
		//
	}
	if (document) {
		await document.remove();
		await client.apiSend(`:wrench: ID \`${args}\` is removed from blacklist by ${message.author.username}.`, process.env.LOGSCHANNEL);
		message.reply(`Done!`);
	} else {
		let guildBlacklist, userBlacklist;
		try {
			guildBlacklist = await client.api.guilds(args).get();
		} catch (err) {
			try {
				userBlacklist = await client.users.fetch(args);
			} catch (err2) {
				return message.reply("Invalid ID!");
			}
		}
		let a = guildBlacklist ? "Guild" : "User";
		Blacklist.create(new Blacklist({ _id: args, type: a.toLowerCase() }));
		client.blacklist[a.toLowerCase() + "s"].push(args);
		await client.apiSend(`:hammer: ${a} ID \`${args}\` is added to the blacklist by ${message.author.username}.`, process.env.LOGSCHANNEL);
		message.reply("Done.");
	}
};
