const permCheck = require("../modules/permChecker");

module.exports = async(client, msg, suffix) => {
	let perms = await permCheck(client, msg.guild);
	if (!perms.support) return;
	if (!suffix) return msg.reply("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
	let channel;
	if (msg.content.length >= 17 && msg.content.length <= 19) {
		try {
			channel = client.api.channels(suffix).get();
			if (!channel) throw new Error();
		} catch (err) {
			return msg.reply("Not a valid channel.");
		}
	} else if (!msg.content.length == 11) {
		return msg.reply("Not a valid number.");
	}
	let result;
	if (channel) {
		try {
			result = await Numbers.findOne({ _id: suffix });
			if (!result) throw new Error();
		} catch (err) {
			return msg.reply("There is no number associated with this channel");
		}
	} else {
		try {
			result = await Numbers.findOne({ number: suffix });
			if (!result) throw new Error();
		} catch (err) {
			return msg.reply("This number is not assigned");
		}
	}
	if (result) {
		msg.reply(`\`\`\`json\n${JSON.stringify(result)}\`\`\``);
	}
};
