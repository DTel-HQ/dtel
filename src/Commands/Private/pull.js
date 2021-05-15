import { exec } from "child_process";

module.exports = async msg => {
	await exec("git pull");
	return msg.channel.send({ embed: { color: config.colors.receipt, title: "Executed Git pull", description: "Use `>restart` if there was a change to the following files/folders: \n• ./*.js\n• ./configuration/\n• ./database/\n• ./structures/\n• ./internals/ (except for `233`, `411` and `callHandler`)" } });
};
