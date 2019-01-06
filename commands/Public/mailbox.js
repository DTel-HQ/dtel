module.exports = async(client, msg, suffix) => {
	let numberDoc = r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);
	if (!numberDoc) return msg.reply("This channel doesn't have a number.");

	let perm = msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");

	let mailbox = await r.table("Mailbox").get(msg.channel.id);
	let omsg,
		collected,
		collector;

	if (!mailbox) {
		if (!perm) return msg.reply("This channel doesn't have a mailbox set up yet. Ask an admin to run this command.");
		omsg = await msg.reply("You don't have a mailbox set up. Respond `yes` to create one.");

		collector = await msg.channel.awaitMessages(
			m => /yes/i.test(m.content) && m.author.id == msg.author.id, {
				time: 10 * 1000,
				max: 1,
			}
		);
		await omsg.delete();
		collected = collector.first();
		if (!collected) return;

		omsg.delete();
		collected.delete();

		omsg = await msg.channel.send("Type the description of your mailbox. (max 100 characters)");

		collector = await msg.channel.awaitMessages(
			m => m.content.length > 0 && m.content.length < 100 && m.author.id == msg.author.id,
			{
				time: 2 * 60 * 1000,
				max: 1,
			}
		);

		await omsg.delete();
		collected = collector.first();
		if (!collected) return msg.reply("You ran out of time, get a description ready and start the set-up again.");

		await collected.delete();

		let description = collected.content;
		let mailboxDoc = {
			id: msg.channel.id,
			description: description,
			messages: [],
		};
		await r.table("Mailbox").insert(mailboxDoc);
		msg.channel.send({ embed: {
			color: 0x00FF00,
			title: "Succesfully set-up this channel's mailbox",
			description: `**Description:** ${description}`,
			footer: {
				text: "You can now use `>mailbox` to see messages when you receive them.",
			},
		} });
	} else if (suffix.split(" ")[0].toLowerCase() == "delete") {
		if (!perm) return msg.reply("Only admins can do this.");

		omsg = await msg.reply("Are you sure you want to delete your mailbox? Stored messages will become **unretrievable**.\nType **yes** to confirm, **no** to cancel.");
		collector = await msg.channel.awaitMessages(
			m => /(^yes|no$)/i.test(m.content) && msg.author.id == m.author.id,
			{
				time: 60 * 1000,
				max: 1,
			}
		);

		await omsg.delete();
		collected = collector.first();
		if (!collected) return msg.reply("Mailbox deletion expired.");

		if (/^yes$/i.test(collected.content)) {
			omsg.delete();
			await r.table("Mailbox").get(msg.channel.id).delete();
			msg.channel.send("Mailbox deletion succesful.");
		} else {
			msg.channel.send("Mailbox deletion aborted.");
		}
	} else {
		let messages = mailbox.messages;
		if (!messages) return msg.reply("You don't have any messages");

		let pages = messages / 5;
		let page = 1;
	}
};
