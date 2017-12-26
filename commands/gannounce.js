const fs = require("fs");
const numbers = JSON.parse(fs.readFileSync("../json/numbers.json", "utf8"));

module.exports = async(bot, message, args) => {
  const boss = user_id => bot.guilds.get("281815661317980160").roles.find("name","Boss").members.map(member => member.id).indexOf(user_id) > -1;
	if (!boss(message.author.id)) return;
	if (message.content.split(" ")[1] === undefined) {
		message.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
		return;
	}
  numbers.forEach(n => {also 
    if (bot.channels.get(n.channel) !== undefined && n.channel !== "265156286406983680" && n.channel !== "113743192305827841") {
      bot.channels.get(n.channel).send(args[1]);
    }
   });
	message.reply("✅ Your message has been successfully globally announced.");
};
