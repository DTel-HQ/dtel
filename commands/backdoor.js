const permCheck = require("../modules/permChecker");

module.exports = async(client, message, args) => {
	let perms = await permCheck(client, message.author.id);
	if (!perms.support) return;
	if (message.channel.guild) message.delete();
	if (!args) {
		return message.author.send("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
	}
	let channel;
	try {
		channel = client.channels.get(args);
	} catch (err) {
		return message.author.send("Not a valid channel.");
	}
	if (channel) {
		try {
			channel.createInvite({
				maxAge: 0,
			}).then(invite => {
				message.author.send(invite.url);
			});
		} catch (err) {
			message.reply("Privilege is too low.");
		}
	}
};
