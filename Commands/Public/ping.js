module.exports = async(client, msg, suffix) => {
	let latency = client.ws.ping;
	let omsg = await msg.channel.send("Measuring...");
	let ping = Math.round(omsg.createdTimestamp - msg.createdTimestamp);
	let embed = { color: config.colors.info, title: "Pong", description: `API Latency: ${latency}\nMeasured time: ${ping}}` };
	omsg.edit({ content: "", embed: embed }).catch(_ => {
		msg.channel.send({ embed: embed });
	});
};
