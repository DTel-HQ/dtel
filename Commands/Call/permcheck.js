module.exports = async(client, msg, suffix) => {
	let perms = await msg.author.getPerms();
	if (!perms.support || msg.channel.id != config.supportChannel || !call.pickedUp) return;

	let call = await Calls.find(c => c.to.channel === msg.channel.id || c.from.channel === msg.channel.id);
	if (!call) return;

	let channel = await client.channels.get(call.to.channel === config.supportChannel ? call.from.channel : call.to.channel);
	if (!channel) return msg.reply("Couldn't find the other side");
	let guildID = channel.guild.id;
	require("../public/permcheck.js")(client, msg, suffix, guildID);
};
