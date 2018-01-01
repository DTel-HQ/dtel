const request = require("request");

module.exports = async(bot, guild) => {
	const cleanedguildname = guild.name.replace(/discord\.(gg|io|me|li)\/([0-9]|[a-z])*/g, "**Invite link censored**");
	bot.channels.get("282253502779228160").send(`:outbox_tray: Left \`${guild.name}\` (${guild.id}). Currently in ${bot.guilds.array().length} servers.`);
	bot.user.setPresence({ game: { name: `${bot.guilds.array().length} servers | >help`, type: 0 } });
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
