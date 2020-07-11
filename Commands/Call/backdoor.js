module.exports = async(client, msg, suffix, call) => {
	if (!msg.author.support || !call.pickedUp) return;
	if (msg.channel.id != config.supportChannel) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "You can’t use this command outside of `*611` calls." } });
	if (!suffix) msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">backdoor" } });

	require("../Support/backdoor.js")(client, msg, await call.to.number.toString());
};
