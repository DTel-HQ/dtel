const fs = require("fs");
const blacklist = JSON.parse(fs.readFileSync("../json/blacklist.json", "utf8"));

module.exports = async(client, message, args) => {
	const support = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	if (!support(message.author.id)) return;
	if (message.content.split(" ")[1] === undefined) {
		message.reply("u forgot id :b:");
		return;
	}
	if (blacklisted(message.content.split(" ")[1])) {
		blacklist.splice(blacklist.indexOf(message.content.split(" ")[1]), 1);
		client.channels.get(process.env.LOGSCHANNEL).send(`:wrench: User ID \`${message.content.split(" ")[1]}\` is removed from blacklist by ${message.author.username}.`);
	} else {
		blacklist.push(message.content.split(" ")[1]);
		client.channels.get(process.env.LOGSCHANNEL).send(`:hammer: User ID \`${message.content.split(" ")[1]}\` is added to blacklist by ${message.author.username}.`);
	}
	fs.writeFileSync("../json/blacklist.json", JSON.stringify(blacklist), "utf8");
	message.reply("Done.");
};
