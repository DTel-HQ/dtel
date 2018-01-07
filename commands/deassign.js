const fs = require("fs");
const numbers = JSON.parse(fs.readFileSync("../json/numbers.json", "utf8"));
const phonebook = JSON.parse(fs.readFileSync("../json/phonebook.json", "utf8"));

module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	if (!support(message.author.id)) return;
	if (message.content.split(" ")[1] === undefined) {
		message.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
		return;
	}
	const number = numbers.find(item => item.number === message.content.split(" ")[1]);
	if (number === undefined) {
		message.reply("<:oliy:327462998610280448> **This number never even existed *in the first place*.**");
		return;
	}
	const theregistry = phonebook.find(item => item.number === message.content.split(" ")[1]);
	if (theregistry !== undefined) {
		phonebook.splice(phonebook.indexOf(theregistry), 1);
		fs.writeFileSync("../json/phonebook.json", JSON.stringify(phonebook), "utf8");
	}
	numbers.splice(numbers.indexOf(number), 1);
	fs.writeFileSync("../json/numbers.json", JSON.stringify(numbers), "utf8");
	message.reply(`<:blobsad:386228996486070272> This number's been deassigned.. R.I.P \`${message.content.split(" ")[1]}\`.`);
	bot.channels.get(process.env.LOGSCHANNEL).send(`:closed_book: Number \`${message.content.split(" ")[2]}\` is DE-assigned from channel ${number.channel} by ${message.author.username}.`);
};
