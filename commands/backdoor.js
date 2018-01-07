// OK
module.exports = async(client, message, args) => {
	const support = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
	if (!support(message.author.id)) return;

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
		channel.createInvite({
			maxAge: 0,
		}).then(invite => {
			message.author.send(invite.url);
		});
	}
};
