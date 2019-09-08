const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	// get the number
	let myNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!myNumber) return msg.reply("This channel doesn't have a number.");

	// check if they have permission to do stuff
	let perm = msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");
	if (!perm) perm = (await msg.author.getPerms()).support;

	// get their mailbox
	let mailbox = await r.table("Mailbox").get(msg.channel.id);
	let omsg,
		collected,
		collector;

	await r.table("Busy").insert({ id: msg.author.id });

	// If there's no mailbox
	if (!mailbox) {
		// Permission?
		if (!perm) return msg.reply("This channel doesn't have a mailbox set up yet. Ask an admin to run this command.");
		omsg = await msg.reply("You don't have a mailbox set up. Respond `yes` to create one.");

		// yes/no collector
		collector = await msg.channel.awaitMessages(
			m => /yes/i.test(m.content) && m.author.id == msg.author.id, {
				time: 60 * 1000,
				max: 1,
			}
		);
		collected = collector.first();
		if (!collected) return;

		omsg.delete().catch(e => null);
		if (collected.guild) collected.delete();

		omsg = await msg.channel.send("Type the autoreply of your mailbox. Please refrain from cursing and other possibly offensive matters. (max 100 characters)");

		// autoreply collector
		collector = await msg.channel.awaitMessages(
			m => m.content.length > 0 && m.content.length < 100 && m.author.id == msg.author.id,
			{
				time: 2 * 60 * 1000,
				max: 1,
			}
		);

		await r.table("Busy").get(msg.author.id).delete();
		await omsg.delete().catch(e => null);
		collected = collector.first();
		if (!collected) return msg.reply("You ran out of time, get an autoreply ready and start the set-up again.");

		if (collected.guild) collected.delete();

		// Succesful autoreply
		let autoreply = collected.content;
		let mailboxDoc = {
			id: msg.channel.id,
			autoreply: autoreply,
			messages: [],
		};
		if (msg.guild) mailboxDoc.guild = msg.guild.id;
		await r.table("Mailbox").insert(mailboxDoc);
		msg.channel.send({ embed: {
			color: config.colors.success,
			title: "Succesfully set-up this channel's mailbox",
			description: `**autoreply:** ${autoreply}`,
			footer: {
				text: "You can now use >mailbox to see messages when you receive them.",
			},
		} });
	} else if (suffix.split(" ")[0].toLowerCase() == "delete") {
		// deleting mailbox
		if (!perm) return msg.reply(":x: You need the manage server permission to do this.");

		omsg = await msg.reply("Are you sure you want to delete your mailbox? Stored messages will become **unretrievable**.\nType **yes** to confirm, **no** to cancel.");
		collector = await msg.channel.awaitMessages(
			m => /(^yes|no$)/i.test(m.content) && msg.author.id == m.author.id,
			{
				time: 60 * 1000,
				max: 1,
			}
		);

		await omsg.delete().catch(e => null);
		collected = collector.first();
		if (!collected) return msg.reply("Mailbox deletion expired.");

		if (/^yes$/i.test(collected.content)) {
			omsg.delete().catch(e => null);
			await r.table("Mailbox").get(msg.channel.id).delete();
			msg.channel.send("Mailbox deletion succesful.");
		} else {
			msg.channel.send("Mailbox deletion aborted.");
		}
	} else if (suffix.split(" ")[0].toLowerCase() == "edit") {
		omsg = await msg.channel.send("Type the new autoreply of your mailbox. Please refrain from cursing and other possibly offensive matters. (max 100 characters)");

		// autoreply collector
		collector = await msg.channel.awaitMessages(
			m => m.content.length > 0 && m.content.length < 100 && m.author.id == msg.author.id,
			{
				time: 2 * 60 * 1000,
				max: 1,
			}
		);

		await omsg.delete().catch(e => null);
		collected = collector.first();
		if (!collected) return msg.reply("You ran out of time, get an autoreply ready and start the set-up again.");

		if (collected.guild) collected.delete();

		// Succesful autoreply
		let autoreply = collected.content;
		await r.table("Mailbox").get(mailbox.id).update({ autoreply: autoreply });
		msg.channel.send({ embed: {
			color: config.colors.success,
			title: "Succesfully changed this channel's mailbox",
			description: `**autoreply:** ${autoreply}`,
			footer: {
				text: "Use >mailbox to see messages.",
			},
		} });
	} else {
		let messages = mailbox.messages.sort((a, b) => a.time > b.time ? -1 : 1);
		if (!messages[0]) return msg.channel.send({ embed: { color: config.colors.info, title: "No messages", description: "You don't have any messages (yet).\n\nOptions:\n• To edit your mailbox's autoreply: >mailbox edit\n• To delete the mailbox: >mailbox delete" } });

		// Showing all messages
		let messagesPage = async page => {
			let pages = Math.ceil(messages.length / 5);

			while (!messages[(page - 1) * 5]) {
				page -= 1;
			}

			let embed = new MessageEmbed()
				.setColor(config.colors.info)
				.setTitle(`:mailbox: You have ${messages.length} messages.`)
				.setDescription("Enter a page number or enter a message ID to see more actions.\n\nOther options:\n• To edit your mailbox's autoreply: `edit`\n• To clear all messages: `clear`\n• To delete your mailbox: `delete`")
				.setFooter(`Page ${page}/${pages}. Press (0) to hangup. This call will automatically be hung up after 2 minutes of inactivity.`);

			// Display the right messages
			let startingIndex = (page - 1) * 5;

			for (let i = startingIndex; i < startingIndex + 5; i++) {
				if (!messages[i]) break;
				let m = messages[i];
				let date = new Date(m.time);
				embed.addField(`ID \`${m.id}\` from ${m.number}`, `${m.message}`);
			}

			let responses = perm ? ["edit", "clear", "delete"] : [];

			// Edit existing message or send a new one
			omsg = omsg ? await omsg.edit({ embed: embed }).catch(async() => { omsg = await msg.channel.send({ embed: embed }); }) : await msg.channel.send({ embed: embed });

			collected = (await msg.channel.awaitMessages(
				m => m.author.id == msg.author.id && (/^0$/.test(m.content) || responses.includes(m.content.toLowerCase()) || (parseInt(m.content) != page && parseInt(m.content) > 0 && parseInt(m.content) <= pages) || messages.filter(message => message.id == m.content).length > 0),
				{	time: 120000, max: 1 })).first();

			if (collected) {
				collected.delete().catch(e => null);
			}	else {
				await r.table("Busy").get(msg.author.id).delete();
				omsg.delete().catch(e => null);
			}

			switch (collected.content) {
				case parseInt(collected.content) > 0: {
					page = parseInt(collected.content);
					messagesPage(page);
					break;
				}

				case "clear": {
					embed = new MessageEmbed()
						.setColor(config.colors.error)
						.setTitle("Deleting messages")
						.setDescription("Are you sure you want to delete all the messages? The messages will be **unretrievable**.\nRespond with `yes` or `no`.")
						.setFooter("This dialogue will be cancelled after 2 minutes of inactivity.");
					omsg = await omsg.edit({ embed: embed }).catch(async() => { omsg = await msg.channel.send({ embed: embed }); });

					collected = (await msg.channel.awaitMessages(
						m => m.author.id === msg.author.id && /^yes$|^no$/i.test(m.content),
						{ time: 120000, max: 1 }
					)).first();

					if (collected) collected.delete().catch(e => null);
					if (!collected) {
						await r.table("Busy").get(msg.author.id).delete();
						omsg.delete().catch(e => null);
					}
					if (/^no$/.test(collected.content)) {
						messagesPage(page);
						break;
					}
					await r.table("Busy").get(msg.author.id).delete();

					await r.table("Mailbox").get(msg.channel.id).update({ messages: [] });
					msg.reply("🔥 A fire has gotten rid of all your messages.");
					break;
				}

				case "delete": {
					embed = new MessageEmbed()
						.setColor(config.colors.error)
						.setTitle("Deleting mailbox")
						.setDescription("Are you sure you want to delete the mailbox? Stored messages will become **unretrievable**.\nRespond with `yes` or `no`.")
						.setFooter("This dialogue will be cancelled after 2 minutes of inactivity.");
					omsg = await omsg.edit({ embed: embed }).catch(async() => { omsg = await msg.channel.send({ embed: embed }); });

					collected = (await msg.channel.awaitMessages(
						m => m.author.id === msg.author.id && /^yes$|^no$/i.test(m.content),
						{ time: 120000, max: 1 }
					)).first();

					if (collected) collected.delete().catch(e => null);
					if (!collected) {
						await r.table("Busy").get(msg.author.id).delete();
						omsg.delete().catch(e => null);
					}
					if (/^no$/.test(collected.content)) {
						messagesPage(page);
						break;
					}
					await r.table("Busy").get(msg.author.id).delete();

					await r.table("Mailbox").get(msg.channel.id).delete();
					msg.reply("This channel's mailbox has been deleted.");
					break;
				}

				case "edit": {
					embed = new MessageEmbed()
						.setColor(config.colors.info)
						.setTitle("Editing autoreply")
						.setDescription("Type the new autoreply of your mailbox. Please refrain from cursing and other possibly offensive matters. (max 100 characters)")
						.setFooter("Press (0) to hangup. This call will automatically be hung up after 3 minutes.");
					omsg = await omsg.edit({ embed: embed }).catch(async() => { omsg = await msg.channel.send({ embed: embed }); });

					collected = (await msg.channel.awaitMessages(
						m => m.author.id === msg.author.id && m.content.length > 0 && m.content.length <= 100,
						{ time: 180000, max: 1 }
					)).first();

					await r.table("Busy").get(msg.author.id).delete();
					if (collected) collected.delete().catch(e => null);
					if (!collected || /^0$/.test(collected.content)) break;

					await r.table("Mailbox").get(mailbox.id).update({ autoreply: collected.content });
					embed = new MessageEmbed()
						.setColor(config.colors.success)
						.setTitle("Autoreply has been changed.")
						.setDescription(`**Autoreply:** ${collected.content}`)
						.setFooter(`Changed by ${msg.author.tag} (${msg.author.id})`);
					await omsg.edit({ embed: embed }).catch(async() => { omsg = await msg.channel.send({ embed: embed }); });
					break;
				}

				case "0": {
					await r.table("Busy").get(msg.author.id).delete();
					omsg.delete().catch(e => null);
					break;
				}

				default: {
					messagePage(collected.content, page);
					break;
				}
			}
		};

		// To show a single message with its actions.

		let messagePage = async(id, page) => {
			let message = messages.filter(m => m.id == id)[0];
			if (id == "0") return;
			if (!message) return msg.reply(`Something went wrong. Please contact a maintainer <${config.guildInvite}>`);

			let date = Date(message.date);
			let embed = new MessageEmbed()
				.setColor(config.colors.info)
				.setTitle(`:mailbox: Viewing message.`)
				.setDescription("• To delete this message: `delete`\n• To report this message: `report`")
				.addField(`ID \`${message.id}\` from ${message.number}`, `${message.message}\n${date}`)
				.setFooter("Press (0) to hangup, (9) to go back. This call will automatically be hung up after 2 minutes of inactivity.");

			omsg = await omsg.edit({ embed: embed }).catch(async() => { omsg = await msg.channel.send({ embed: embed }); });

			let responses = perm ? ["report", "delete"] : ["report"];

			collected = (await msg.channel.awaitMessages(
				m => m.author.id == msg.author.id && (/^[09]$/.test(m.content) || responses.includes(m.content.toLowerCase())),
				{	time: 120000, max: 1 })).first();

			collected.delete().catch(e => null);

			let index;

			switch (collected.content) {
				case "0":
					omsg.delete().catch(e => null);
					await r.table("Busy").get(msg.author.id).delete();
					break;
				case "9":
					await omsg.delete().catch(e => null);
					omsg = null;
					messagesPage(page);
					break;
				case "delete":
					index = messages.map(m => m.id).indexOf(id);
					messages.splice(index, 1);
					await r.table("Mailbox").get(msg.channel.id).update({ messages: messages });
					messagesPage(page);
					break;
				case "report":
					await r.table("Busy").get(msg.author.id).delete();
					require("./call.js")(client, msg, "*611");
			}
		};


		messagesPage(1);
	}
};
