const { exec } = require("child_process");

module.exports = async(client, msg, suffix) => {
	let omsg = await msg.channel.send({ embed: { color: config.colors.info, title: "Preparing to restart", description: "Making preparations to restart the bot. Please wait." } });

	let calls = await r.table("Calls");
	let toSend = { embed: { color: config.colors.info, title: "Restarting", description: "The bot is restarting. Watch the bot's playing status for updates", footer: { text: "Your call will automatically continue after the restart." } } };
	for (let call of calls) {
		try {
			await client.apiSend(toSend, call.from.channel);
			await client.apiSend(toSend, call.to.channel);
		} catch (e) {
			// nothing;
		}
	}

	await client.user.setPresence({ activity: { name: "Restarting", type: 0 } });
	await omsg.edit({ embed: { color: config.colors.info, title: "Restarting...", description: `This may take a while. Watch the bot's playing status for an update.\nWarned ${calls.length} calls.` } });

	client.done = false;
	await client.shard.restartAll();
};
