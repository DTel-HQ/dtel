module.exports = async(client, msg, suffix, call) => {
	if (!msg.author.support || !call.pickedUp) return;
	if (msg.channel.id != config.supportChannel) return msg.channel.send({ embed: { color: config.colors.error, title: "Permission error", description: "You are only allowed to do this command from the `*611` channel." } });
	if (!suffix) msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: ">backdoor" } });

	require("../Support/backdoor.js")(client, msg, await call.to.number.toString());
};