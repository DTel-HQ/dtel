module.exports = async(client, msg, suffix) => {
	if (!(await msg.author.getPerms()).support);
	if (msg.guild) msg.delete();
	if (!suffix) return msg.author.send("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");

	let channel = await client.api.channels(suffix).get()
		.catch(() => { msg.author.send("Not a valid channel."); return null; });

	if (!channel) return;

	let number = r.table("Numbers")
		.getAll(suffix, { index: "channel" })
		.default(null)
		.nth(0);
	if (!number) return msg.reply("There is no number associated with this channel. Contact your boss if this is urgent.");

	client.api.channels(suffix).invites.post({
		data: {
			max_uses: 1,
			temporary: true,
		},
		reason: `Customer Support Agent ${msg.author.tag} ran backdoor.`,
	})
		.then(invite => {
			msg.author.send(`https://discord.gg/${invite.code}`);
		})
		.catch(() => msg.reply("Privilege is too low."));
};
