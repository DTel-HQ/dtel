module.exports = async(client, msg, suffix, call) => {
	if (!msg.author.support || !call.pickedUp) return;
	if (msg.channel.id !== config.supportChannel) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "You can’t use this command outside of `*611` calls." } });

	require("../Support/backdoor.js")(client, msg, call.from.number === (await msg.channel.number) ? call.to.number : call.from.number);
};
