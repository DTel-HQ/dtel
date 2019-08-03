const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	await exec("git pull");
	return msg.channel.send({ embed: { color: 0xEEEEEE, title: "Executed Git pull", description: "If there was an update to the following, use `>resart:`\n•Config\n•Structures" } });
};
