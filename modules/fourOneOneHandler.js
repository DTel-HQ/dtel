const fs = require("fs")
var fouroneone = JSON.parse(fs.readFileSync("./json/fouroneone.json", "utf8"));

module.exports = async(bot, message) => {
    if (fouroneone.find({ user: message.author.id, status: 1})) {

    }
}