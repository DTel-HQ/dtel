const randomstring = require("randomstring");

module.exports = async(client, msg, suffix) => {
	// perms needed later on
	let perms = await msg.author.getPerms();

	suffix = suffix.split(" ");
	let toStrike = msg.mentions.users.first() ? msg.mentions.users.first().id : suffix[0];
	suffix.shift();
	let reason = suffix.join(" ");

	if (!toStrike || !reason) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >strike [userID/guildID/channelID] [reason]" } });
	if (toStrike == msg.author.id) return msg.channel.send(`>fire ${msg.author.tag}`);

	let user,
		guild,
		guildID,
		shard,
		channel;

	user = await client.users.fetch(toStrike).catch(e => null);
	if (!user) {
		channel = await client.api.channels(toStrike).get().catch(e => null);
		if (channel && channel.type != 1) guildID = channel.guild_id;

		let results = await client.shard.broadcastEval(`this.guilds.resolve("${guildID || toStrike}")`);
		for (let result of results) {
			if (result) {
				guild = result;
				shard = results.indexOf(result);
				break;
			}
		}
	}
	if (!user && !guild) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid ID", description: "Couldn't find a guild or user matching that ID." } });

	if (user) {
		if (user.bot) return msg.channel.send({ embed: { color: config.colors.error, title: "Bot user", description: "Don't try striking my brothers!" } });
		let toStrikePerms = await client.users.get(toStrike).getPerms();
		if (toStrikePerms.boss || toStrikePerms.manager) return msg.channel.send(`>fire ${msg.auhor.tag}`);
		if (toStrikePerms.support && !(perms.boss || perms.manager)) return msg.channel.send({ embed: { color: config.colors.error, title: "Unfair competition", description: "You can't get rid of someone that easily..." } });
	} else if (guild.id == config.supportGuild) {
		return msg.channel.send({ embed: { color: config.colors.error, title: "Turning against us?", description: "As if we'd would allow you to do this." } });
	}

	let strikes = await r.table("Strikes");

	let id = randomstring.generate({ length: 5, charset: "alphanumeric", readable: true });
	while (strikes.find(x => x.id == id)) id = randomstring.generate({ length: 5, charset: "alphanumeric", readable: true });

	let strikeDoc = {
		id: id,
		offender: toStrike,
		user: !!user,
		reason: reason,
		creator: msg.author.id,
		date: new Date(),
	};

	await r.table("Strikes").insert(strikeDoc);

	let totalStrikes = await r.table("Strikes").getAll(toStrike, { index: "offender" }).default([]);
	if (totalStrikes.length >= 3) {
		let blacklist = await r.table("Blacklist").get(toStrike);
		if (!blacklist) {
			let res = user ? await user.blacklist() : await client.shard.broadcastEval(`if (this.shard.ids[0] === ${shard}) this.guilds.get("${guild.id}").blacklist()`);
			msg.channel.send({ embed: { color: config.colors.success, title: "Success", description: `This ${user ? "user" : "guild"} has been striked and blacklisted. StrikeID: \`${id}\`` } });
			if (user) (await user.createDM()).send({ embed: { color: config.colors.info, title: "You were blacklisted", description: `You have received your third strike and have been blacklisted. Reason given for strike: \n_${reason}_` } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "Couldn't reach the user. Please manually notify them their blacklist." } }));
			else (await guild.owner.user.createDM()).send({ embed: { color: config.colors.info, title: "Your server received was blacklisted", description: `Your server ${guild.name}(${guild.id}) has been blacklisted due to the following reason: \n_${reason}_` } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "Couldn't reach the guild owner. Please manually inform them of the blacklist." } }));
			if (channel) channel.send({ embed: { color: config.colors.info, title: "This server received a strike", description: `This server has been striked due to the following reason: \n_${reason}_ \n\nThe server will be blacklisteded after receiving ${3 - totalStrikes.length} more strikes.` } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "Couldn't reach the channel. The guild owner should have been informed." } }));
			return;
		}
	}

	await msg.channel.send({ embed: { color: config.colors.success, description: `This ${user ? "user" : "guild"} has been striked and now has ${totalStrikes.length} strike(s). StrikeID: \`${id}\`` }, author: { text: msg.author.tag, icon_url: msg.author.displayAvatarURL() } });
	if (user) {
		(await user.createDM()).send({ embed: { color: config.colors.info, title: "You received a strike", description: `You have been striked due to the following reason: ${reason}.\n\nYou will get blacklisted after receiving ${3 - totalStrikes.length} more strikes.` } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "Couldn't reach the user. Please manually notify them of their strike." } }));
	} else {
		(await guild.owner.user.createDM()).send({ embed: { color: config.colors.info, title: "Your server received a srike", description: `Your server ${guild.name}(${guild.id}) has been striked due to the following reason: \n_${reason}_ \n\nYour server will be blacklisteded after receiving ${3 - totalStrikes.length} more strikes.` } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "Couldn't reach the guild owner. Please manually inform them of the strike." } }));
		if (channel) channel.send({ embed: { color: config.colors.info, title: "This server received a strike", description: `This server has been striked due to the following reason: \n_${reason}_ \n\nThe server will be blacklisteded after receiving ${3 - totalStrikes.length} more strikes.` } }).catch(e => msg.channel.send({ embed: { color: config.colors.error, title: "Error", description: "Couldn't reach the channel. The guild owner should have been informed." } }));
	}
};
