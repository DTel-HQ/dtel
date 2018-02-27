module.exports = async(client, message, args) => {
	let perms = await client.permCheck(message.author.id);
	if (!perms.support) return;
	if (message.channel.guild) message.delete();
	if (!args) {
		return message.author.send("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
	}
	let channel;
	try {
		channel = client.api.channels(args).get();
	} catch (err) {
		return message.author.send("Not a valid channel.");
	}
	if (channel) {
		let number;
		try {
			number = await Numbers.findOne({ _id: args });
		} catch (err) {
			return message.reply("There is no number associated with this channel. Contact your boss if this is urgent.");
		}
		if (number) {
			try {
				client.api.channels(args).invites.post({
					data: {
						max_uses: 1,
						temporary: true,
					},
					reason: `Customer Support Agent ${message.author.tag} ran backdoor.`,
				}).then(invite => {
					message.author.send(`https://discord.gg/${invite.code}`);
				});
			} catch (err) {
				message.reply("Privilege is too low.");
			}
		}
	}
};
