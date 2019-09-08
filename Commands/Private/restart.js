const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	await client.shard.broadcastEval(`this.user.setPresence({ activity: { name: "[BETA] Restarting", type: 0 } });`);
	await exec("pm2 restart 0");
	return msg.reply("Done");
};
