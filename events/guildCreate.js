const request = require("request");

module.exports = async(bot, guild) => {
	if (guild.defaultChannel === undefined) {
		guild.owner.send(`(Discord removed the default channel. So no matter who added DiscordTel, I'm sending this to the owner of the server \`${guild.name}\`, which is you!)\n\nHello guys, it's **DiscordTel**, the telephone solution for Discord! To learn more, type \`>info\`. To get command help, type \`>help\`. To get a number, read <http://discordtel.rtfd.io/> and then type \`>wizard\` in the channel you wish to enable the service.\n**Warning:** No troll calls. You are required to read the documentation. To keep your number available you need to renew your number which is instructed at <http://discordtel.readthedocs.io/en/latest/Payment/>.\n*ToS Compliance: <http://discordtel.readthedocs.io/en/latest/ToS%20Compliance/>*`);
	} else {
		guild.defaultChannel.send("Hello guys, it's **DiscordTel**, the telephone :telephone: solution for Discord! To learn more, type `>info`. To get command help, type `>help`. To get a number, read <http://discordtel.rtfd.io/> and then type `>wizard` in the channel you wish to enable the service.\n**Warning:** No troll calls. You are required to read the documentation. To keep your number available you need to renew your number which is instructed at <http://discordtel.readthedocs.io/en/latest/Payment/>.\n*ToS Compliance: <http://discordtel.readthedocs.io/en/latest/ToS%20Compliance/>*");
	}
	// added check to make sure embed links permission is given to the bot.
	if (!guild.me.hasPermission("EMBED_LINKS")) {
		if (guild.defaultChannel === undefined) {
			guild.owner.send("I don't seem to have permission in your server to use embeds. This may cause issues with DiscordTel, so please make sure I have the `Embed Links` permission.");
		} else {
			guild.defaultChannel.send("I was recently added to this server, but I don't have `Embed Links` permission, which may cause issues with DiscordTel.");
		}
	}
	const cleanedguildname = guild.name.replace(/discord\.(gg|io|me|li)\/([0-9]|[a-z])*/g, "**Invite link censored**");
	bot.channels.get("282253502779228160").send(`:inbox_tray: Joined \`${guild.name}\` (${guild.id}). Currently in ${bot.guilds.size} servers.`);
	bot.user.setPresence({ game: { name: `${bot.guilds.size} servers | >help`, type: 0 } });
	request.post({
		url: "https://bots.discord.pw/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			Authorization: process.env.BOTS_PW_TOKEN,
		},
		json: {
			server_count: bot.guilds.size.toString(),
		},
	}, (error, response, body) => {
		console.log(`DBots returns success: ${body}`);
	});
	request.post({
		url: "https://discordbots.org/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			Authorization: process.env.DBL_ORG_TOKEN,
		},
		json: {
			server_count: bot.guilds.size.toString(),
		},
	}, (error, response, body) => {
		console.log(`DBotsList returns success: ${body}`);
	});
};
