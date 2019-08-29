const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	await exec("git pull");
	return msg.channel.send({ embed: { color: config.colors.receipt, title: "Executed Git pull", description: "Use `>restart` if there was a change to the following: \n• ./*.js\n• ./Configuration/\n• ./Database/\n• ./Structures/\n• ./Internals/ (Except for `233`, `411`)" } });
};
