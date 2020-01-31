module.exports = async(client, msg, suffix, call) => {
	if (!msg.author.support || !call.pickedUp) return;
	if (msg.channel.id != config.supportChannel) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "You are only allowed to do this command from the `*611` channel." } });
	if (!suffix) msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">permcheck [userID]" } });

	let channel = await client.channels.get(call.to.channel === config.supportChannel ? call.from.channel : call.to.channel);
	if (!channel) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown channel", description: "Couldn't find the other side." } });
	if (channel.type === "dm") return msg.channel.send({ embed: { color: config.colors.info, title: "0900...", description: "Of course they'll have permission..." } });
	let guildID = channel.guild.id;
	require("../Support/permcheck.js")(client, msg, suffix, guildID);
};
