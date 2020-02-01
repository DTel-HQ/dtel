module.exports = async(client, msg, suffix) => {
	let id = suffix.split(" ")[0];
	if (!id) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >unbusy [userID]" } });

	let user = await client.users.fetch(id);
	if (!user) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown user", description: "Syntax: >unbusy [userID]" } });
	if (!user.busy) return msg.channel.send({ embed: { color: config.colors.info, title: "That user isn't busy", description: "Something else is wrong." } });

	user.busy = false;
	return msg.channel.send({ embed: { color: config.colors.success, title: "User unbusied", description: "This user has been made unbusy.", footer: { text: `${msg.author.id} - reminder: this is a temporary fix.` } } });
};
