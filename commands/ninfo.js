var fs = require("fs"),
    accounts = JSON.parse(fs.readFileSync("././account.json", "utf8"));
	
exports.run = (bot, message, args) => {
    if (message.content.split(" ")[1] === undefined) {
        message.reply("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
        return;
    }
    var lenumber = numbers.find(function(item) {
        return item.number === message.content.split(" ")[1];
    });
    if (lenumber === undefined) {
        message.reply("Not a valid number.");
        return;
    }
    message.reply("```json\n"+JSON.stringify(lenumber)+"\n```");
};