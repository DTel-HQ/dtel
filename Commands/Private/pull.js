const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	await exec("git pull");
	return msg.reply("Done");
};
