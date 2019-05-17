module.exports = async(client, msg, suffix) => {
	if (!(await msg.author.getPerms()).support) return;

	// Get number with the channel
	let number = await r.table("Numbers").get(suffix.split(" ")[0]);
	if (!number) number = (await r.table("Numbers").filter({ channel: suffix.split(" ")[0] }))[0];
	if (!number) return msg.channel.send("", { embed: { color: 0x660000, title: "Couldn't find that.", description: "Keep in mind you can only broadcast to channels with a number." } });

	// Define the message and channel
	let channel = number.channel;
	let message = suffix.split(" ");
	message.splice(0, 1);
	if (message.length > 1800) return msg.reply("What ya writing an essay for mate? (too many characters)");

	try {
		await client.apiSend(`**Message from DiscordTel staff:**\n${message.join(" ")}`, channel);
	} catch (err) {
		await r.table("Numbers").get(number.id).delete();
		return msg.channel.send("", { embed: { color: 0x660000, title: "Couldn't send a message.", description: "The number has now been deleted." } });
	}
};
