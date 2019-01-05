module.exports = async(client, msg, suffix) => {
	let numberDoc = r.table("Numbers")
		.getAll(msg.channel.id, { index: "channel" })
		.nth(0)
		.default(null);
	if (!numberDoc) return msg.reply("This channel doesn't have a number.");

	let perm = msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");

	let mailbox = await r.table("Mailbox").get(msg.channel.id);
	let omsg;

	if (!mailbox) {
		if (!perm) return msg.reply("This channel doesn't have a mailbox set up yet. Ask an admin to run this command.");
		omsg = await msg.reply("You don't have a mailbox set up. Respond `yes` to create one.");

		const collector1 = msg.channel.createMessageCollector(
			m => /yes/i.test(m.content) && m.author.id == msg.author.id, {
				time: 10 * 1000,
				max: 1,
			}
		);
		collector1.on("end", collected => {
			if (!collected.first()) omsg.delete();
		});
		collector1.on("collect", async collected => {
			omsg.delete();
			collected.delete();
			omsg = await msg.channel.send("Type the description of your mailbox. (max 100 characters)");
			const collector2 = msg.channel.createMessageCollector(
				m => m.content.length > 0 && m.content.length < 100 && m.author.id == msg.author.id,
				{
					time: 2 * 60 * 1000,
					max: 1,
				}
			);
			collector2.on("end", async collected2 => {
				if (!collected2.first()) {
					msg.channel.send("You ran out of time, get a description ready and start the set-up again.");
					omsg.delete();
				}
			});
			collector2.on("collect", async collected2 => {
				collected2.delete();
				omsg.delete();

				let description = collected2.content;
				let mailboxDoc = {
					id: msg.channel.id,
					description: description,
					messages: [],
				};
				await r.table("Mailbox").insert(mailboxDoc);
				msg.channel.send({ embed: {
					color: 0x00FF00,
					title: "Succesfully set-up",
					description: `**Description:** ${description}`,
					footer: {
						text: "You can now use `>mailbox` to see messages when you receive them.",
					},
				} });
			});
		});
	} else if (suffix.split(" ")[0].toLowerCase() == "delete") {
		if (!perm) return msg.reply("Only admins can do this.");

		omsg = await msg.reply("Are you sure you want to delete your mailbox? Stored messages will become **unretrievable**.\nType **yes** to confirm, **no** to cancel.");
		const collector = msg.channel.createMessageCollector(
			m => /(^yes|no$)/i.test(m.content) && msg.author.id == m.author.id,
			{
				time: 60 * 1000,
				max: 1,
			}
		);
		collector.on("end", async collected => {
			if (!collected.first()) {
				await omsg.delete();
				msg.channel.send("Mailbox deletion expired.");
			}
		});
		collector.on("collect", async collected => {
			if (/^yes$/i.test(collected.content)) {
				omsg.delete();
				await r.table("Mailbox").get(msg.channel.id).delete();
				msg.channel.send("Mailbox deletion succesful.");
			} else {
				msg.channel.send("Mailbox deletion aborted.");
			}
		});
	} else {
		msg.reply("mailbox");
	}
};
