module.exports = async(bot, message, args) => {
	const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.map(member => member.id).indexOf(user_id) > -1;
	if (!support(message.author.id)) return;

	if (message.channel.guild) message.delete();
	if (message.content.split(" ")[1] === undefined) {
		message.author.send("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
		return;
	}
	if (bot.channels.get(message.content.split(" ")[1]) === undefined) {
		message.author.send("Not a valid channel.");
		return;
	}
	bot.channels.get(message.content.split(" ")[1]).createInvite({
		maxAge: 0
	}).then(invite => {
		message.author.send(invite.url);
	});
};
