var accounts = JSON.parse(fs.readFileSync("././account.json", "utf8")),
	support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.map(member => member.id).indexOf(user_id) > -1;

module.exports = async(bot, message, args) => {
	if (!support(message.author.id)) {
		return;
	} else if (message.content.split(" ")[1] === undefined) {
		message.reply("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
		return;
	}
	var lenumber = numbers.find(item => item.number === message.content.split(" ")[1]);
	if (lenumber === undefined) {
		message.reply("Not a valid number.");
		return;
	}
	message.reply(`\`\`\`json\n${JSON.stringify(lenumber)}\n\`\`\``);
};
