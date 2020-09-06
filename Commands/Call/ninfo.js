module.exports = async(client, msg, suffix, call) => {
	if (!msg.author.support || !call.pickedUp) return;
	if (msg.channel.id !== config.supportChannel) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "You can’t use this command outside of `*611` calls." } });

	const newSuffix = call.from.number === config.aliasNumbers["*611"] ? call.to.number : call.from.number;
	require("../Support/ninfo.js")(client, msg, newSuffix);
};
