var fs = require("fs");
var blacklist = JSON.parse(fs.readFileSync("../json/gblacklist.json", "utf8"));
var blacklisted = guild => blacklist.indexOf(guild) > -1;

module.exports = async(bot, message, args) => {
	var support = user => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.map(member => member.id).indexOf(user) > -1;
	if (!support(message.author.id)) return;
	if (message.content.split(" ")[1] === undefined) {
		message.reply("u forgot id :b:");
		return;
	}
	if (blacklisted(message.content.split(" ")[1])) {
		blacklist.splice(blacklist.indexOf(message.content.split(" ")[1]), 1);
		bot.channels.get("282253502779228160").send(`:wrench: Guild ID \`${message.content.split(" ")[1]}\` is removed from guild blacklist by ${message.author.username}.`);
	} else {
		blacklist.push(message.content.split(" ")[1]);
		bot.channels.get("282253502779228160").send(`:hammer: Guild ID \`${message.content.split(" ")[1]}\` is added to guild blacklist by ${message.author.username}.`);
	}
	fs.writeFileSync("../json/gblacklist.json", JSON.stringify(blacklist), "utf8");
	message.reply("Done.");
};
