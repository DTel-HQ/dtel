var fs = require("fs"),
    numbers = JSON.parse(fs.readFileSync("././numbers.json", "utf8")),
    support = user_id => bot.guilds.get('281815661317980160').roles.get('281815839936741377').members.map(member => member.id).indexOf(user_id) > -1;

exports.run = (bot, message, args) => {
      if (!support(message.author.id)) return;
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("<:bloblul:356789385875816448> **Hey, I think you forgot two parameters!**");
			    return;
			}
			if (isNaN(message.content.split(" ")[2]) || !message.content.split(" ")[2].startsWith("0301") && !message.content.split(" ")[2].startsWith("0800") && !message.content.split(" ")[2].startsWith("0844")) {
			    message.reply("<:thonkku:356833797804916737> **Is this a valid 11-digit number?**");
			    return;
			}
			var number = numbers.find(function(item) {
				return item.channel === message.content.split(" ")[1];
			});
			if (number !== undefined) {
			    message.reply("<:francis:327464171211849728> **This number is already registered!**");
				return;
			}
			numbers.push({channel: message.content.split(" ")[1], number: message.content.split(" ")[2], year: new Date().getFullYear(), month: new Date().getMonth() + 1});
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			bot.channels.get("282253502779228160").send(":green_book: Number `"+message.content.split(" ")[2]+"` is assigned to channel "+message.content.split(" ")[1]+" by "+message.author.username+".");
			message.reply("Done. Now turn back to your client!");
}
