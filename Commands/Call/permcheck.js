module.exports = async(client, msg, suffix, call) => {
	let perms = await msg.author.getPerms();

	if (!perms.support || msg.channel.id != config.supportChannel || !call.pickedUp) return;

	let channel = await client.channels.get(call.to.channel === config.supportChannel ? call.from.channel : call.to.channel);
	if (!channel) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown channel", description: "Couldn't find the other side." } });
	let guildID = channel.guild.id;
	require("../Support/permcheck.js")(client, msg, suffix, guildID);
};
