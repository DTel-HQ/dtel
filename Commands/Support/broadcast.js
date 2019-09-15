module.exports = async(client, msg, suffix) => {
	// Get number with the channel
	let number = await r.table("Numbers").get(suffix.split(" ")[0]);
	if (!number) number = (await r.table("Numbers").filter({ channel: suffix.split(" ")[0] }))[0];
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Couldn't find that.", description: "Keep in mind you can only broadcast to channels with a number." } });

	// Define the message and channel
	let channel = number.channel;
	let message = suffix.split(" ");
	message.splice(0, 1);
	if (!message.length) return msg.channel.send({ embed: { color: config.colors.error, title: "What The Fuck", description: "That's the most useless message I've seen..." } });
	if (message.length > 1800) return msg.channel.send({ embed: { color: config.colors.error, title: "Oi mate", description: "What ya writing an essay for? (too many characters)" } });

	try {
		await client.apiSend({ embed: { color: config.colors.error, title: "❕ Message from DiscordTel staff ❕", description: message.join(" ") } }, channel);
		return msg.channel.send({ embed: { color: config.colors.success, title: "Message succesfully sent!.", description: `Message: ${message.join(" ")}\nChannel: ${number.channel}`, footer: { text: `By ${msg.author.id}` } } });
	} catch (err) {
		await r.table("Numbers").get(number.id).delete();
		return msg.channel.send({ embed: { color: config.colors.error, title: "Couldn't send a message.", description: "The number has now been deleted." } });
	}
};
