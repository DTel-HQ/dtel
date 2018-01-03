// OK
module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.has(user_id);
	if (!support(message.author.id)) return;

	if (message.channel.guild) message.delete();
	if (!args) {
		return message.author.send("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
	}
	let channel;
	try {
		channel = bot.channels.get(args);
	} catch (err) {
		return message.author.send("Not a valid channel.");
	}
	if (channel) {
		channel.createInvite({
			maxAge: 0,
		}).then(invite => {
			message.author.send(invite.url);
		});
	}
};
