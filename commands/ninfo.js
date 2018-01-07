const fs = require("fs");
const accounts = JSON.parse(fs.readFileSync("../json/account.json", "utf8"));
var numbers = JSON.parse(fs.readFileSync("../json/numbers.json"));

module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	if (!support(message.author.id)) {
		return;
	} else if (message.content.split(" ")[1] === undefined) {
		message.reply("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
		return;
	}
	const lenumber = numbers.find(item => item.number === message.content.split(" ")[1]);
	if (lenumber === undefined) {
		message.reply("Not a valid number.");
		return;
	}
	message.reply(`\`\`\`json\n${JSON.stringify(lenumber)}\n\`\`\``);
};
