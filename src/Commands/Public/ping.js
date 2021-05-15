module.exports = async(client, msg) => {
	const omsg = await msg.channel.send("Measuring...");
	const latency = Math.round(client.ws.ping);
	const ping = Math.round(omsg.createdTimestamp - msg.createdTimestamp);
	const embed = { color: config.colors.info, title: "Pong", description: `API Latency: ${latency}ms\nMeasured time: ${ping}ms` };
	omsg.edit({ content: "", embed: embed }).catch(_ => {
		msg.channel.send({ embed: embed });
	});
};
