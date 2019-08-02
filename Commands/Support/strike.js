const randomstring = require("randomstring");

module.exports = async(client, msg, suffix) => {
	// perms needed later on
	let perms = await msg.author.getPerms();

	suffix = suffix.split(" ");
	let toStrike = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix[0];
	suffix.shift();
	let reason = suffix.join(" ");

	if (!toStrike || !reason) return msg.reply("<:BusThinking:341628019472990209> this command requires 2 parameters. Syntax: `>strike [user] [reason]`");
	if (toStrike == msg.author.id) return msg.reply("What are you striking yourself for?");

	let user,
		guild;

	user = await client.users.fetch(toStrike).catch(e => null);
	if (!user) guild = await client.api.guilds(toStrike).get().catch(e => null);
	if (!guild) {
		let channel = await client.api.channels(toStrike).get().catch(e => null);
		if (channel) guild = await client.channels.get(toStrike).guild.id;
	}
	if (!user && !guild) return msg.reply("Are you sure that ID is a guild or user?");

	if (user) {
		if (user.bot) return msg.reply("Why would you strike a bot <:BusThinking:341628019472990209>");
		let toStrikePerms = await client.users.get(toStrike).getPerms();
		if (toStrikePerms.boss || toStrikePerms.manager) return msg.reply("You can't strike a boss or manager");
		if (toStrikePerms.support && !(perms.boss || perms.manager)) return msg.reply("You can't strike your colleagues.");
	} else if (guild.id == config.supportGuild) {
		return msg.reply("As if we'd would allow you to do this.");
	}

	let strikes = await r.table("Strikes");

	let id = randomstring.generate({ length: 5, charset: "alphanumeric", readable: true });
	while (strikes.find(x => x.id == id)) id = randomstring.generate({ length: 5, charset: "alphanumeric", readable: true });

	let strikeDoc = {
		id: id,
		offender: toStrike,
		user: user ? 1 : 0,
		reason: reason,
		creator: msg.author.id,
		date: new Date(),
	};

	await r.table("Strikes").insert(strikeDoc);

	let totalStrikes = await r.table("Strikes").filter({ offender: toStrike });
	if (totalStrikes.length >= 3) {
		let blacklist = await Blacklist.newGet(toStrike);
		if (!blacklist) {
			await Blacklist.create({ id: toStrike });
			msg.reply(`This ${user ? "user" : "guild"} has been striked and blacklisted. StrikeID: \`${id}\``);
			if (user) (await client.users.get(user.id).createDM()).send(`You have received your third strike and have been blacklisted. Reason given for strike: ${reason}`);
			return;
		}
	}

	msg.reply(`This ${user ? "user" : "guild"} has been striked and now has ${totalStrikes.length} strike(s). StrikeID: \`${id}\``);
	if (user) user.send(`You have been striked due to the following reason: ${reason}. You will get blacklisted after receiving ${3 - totalStrikes.length} more strikes.`);
};
