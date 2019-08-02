const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	await exec("pm2 restart 0");
	return msg.reply("Done");
};
