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

		omsg.delete();
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

		await omsg.delete();
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
			color: 0x00FF00,
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

		await omsg.delete();
		collected = collector.first();
		if (!collected) return msg.reply("You ran out of time, get an autoreply ready and start the set-up again.");

		if (collected.guild) collected.delete();

		// Succesful autoreply
		let autoreply = collected.content;
		await r.table("Mailbox").get(mailbox.id).update({ autoreply: autoreply });
		msg.channel.send({ embed: {
			color: 0x00FF00,
			title: "Succesfully changed this channel's mailbox",
			description: `**autoreply:** ${autoreply}`,
			footer: {
				text: "Use >mailbox to see messages.",
			},
		} });
	} else {
		let messages = mailbox.messages.sort((a, b) => a.time > b.time ? -1 : 1);
		if (!messages[0]) return msg.channel.send({ embed: { color: 0x3498DB, title: "No messages", description: "You don't have any messages (yet).\nTo edit your mailbox's autoreply: >mailbox edit\nTo delete the mailbox: >mailbox delete" } });

		// To show all messages

		let messagesPage = async page => {
			let pages = Math.ceil(messages.length / 5);

			while (!messages[(page - 1) * 5]) {
				page -= 1;
			}

			let embed = new MessageEmbed()
				.setColor(3447003)
				.setTitle(`:mailbox: You have ${messages.length} messages.`)
				.setDescription("To edit your mailbox's autoreply: `>mailbox edit`\nTo delete your mailbox: `>mailbox delete`")
				.setFooter(`Page ${page}/${pages}. Enter an ID to see more actions.`);

			// Display the right messages
			let startingIndex = (page - 1) * 5;

			for (let i = startingIndex; i < startingIndex + 5; i++) {
				if (!messages[i]) break;
				let m = messages[i];
				let date = new Date(m.time);
				embed.addField(`ID \`${m.id}\` from ${m.number}`, `${m.message}\n||${date}||`);
			}
			embed.addField("Options",
				`:x: to exit.\
				${page != 1 ? "\n:arrow_left: go to the previous page." : ""}\
				${page < pages ? "\n:arrow_right: go to the next page." : ""}\
				${perm ? "\n:fire: to delete all messages. (on all pages)" : ""}`
			);

			// Action reactions
			let reactions = ["❌", "⬅", "➡"];
			if (perm) reactions.push("🔥");

			let reactionFilter = ["❌"];
			if (page != 1) reactionFilter.push("⬅");
			if (page < pages) reactionFilter.push("➡");
			if (perm) reactionFilter.push("🔥");

			// Edit existing message or send a new one
			omsg = omsg ? await omsg.edit(embed) : await msg.channel.send({ embed: embed });

			if (!omsg.reactions.first()) {
				for (let reaction of reactions) await omsg.react(reaction);
			}

			const reactionCollector = omsg.createReactionCollector(
				(reaction, user) => user.id == msg.author.id && reactionFilter.indexOf(reaction.emoji.name) > -1,
				{
					time: 2 * 60 * 1000,
					max: 1,
				}
			);

			const messageCollector = msg.channel.createMessageCollector(
				m => (m.author.id == msg.author.id && messages.filter(message => message.id == m.content).length > 0) || m.content.startsWith(`${config.prefix}mailbox`),
				{
					time: 2 * 60 * 1000,
				}
			);

			reactionCollector.on("collect", async reaction => {
				let index;
				messageCollector.stop("Reaction collector went off");
				client.api.channels(msg.channel.id).messages(omsg.id).reactions(reaction.emoji)
					.user(msg.author.id)
					.delete();
				switch (reaction.emoji.name) {
					case "❌":
						omsg.delete();
						break;
					case "⬅":
						page -= 1;
						messagesPage(page);
						break;
					case "➡":
						page += 1;
						messagesPage(page);
						break;
					case "🔥":
						omsg.delete();
						await r.table("Mailbox").get(msg.channel.id).update({ messages: [] });
						msg.reply("🔥 A fire got rid of all your messages!");
						break;
				}
			});

			messageCollector.on("collect", async m => {
				omsg.delete();
				reactionCollector.stop("Message collector went off.");
				if (m.content.startsWith(`${config.prefix}mailbox`)) {
					messageCollector.stop("User initiated another mailbox");
				} else {
					messageCollector.stop("Collected");
					if (m.guild) m.delete();
					messagePage(m.content, page);
				}
			});
		};

		// To show a single message with its actions.

		let messagePage = async(id, page) => {
			let message = messages.filter(m => m.id == id)[0];
			if (!message) msg.reply("Something went wrong");

			let embed = new MessageEmbed()
				.setColor(3447003)
				.setTitle(`:mailbox: Viewing message.`);

			let date = Date(message.date);
			embed.addField(`ID \`${message.id}\` from ${message.number}`, `${message.message}\n${date}`);

			embed.addField("Options",
				`:x: to exit.\
				\n:arrow_left: to return to messages.\
				${perm ? "\n:wastebasket: to delete this message." : ""}\
				\n:bell: to report this message.`
			);

			// Action reactions
			let reactions = ["❌", "⬅", "🗑", "🔔"];
			let reactionFilter = ["❌", "⬅", "🔔"];
			if (perm) reactionFilter.push("🗑");

			omsg = await msg.channel.send({ embed: embed });

			for (let reaction of reactions) await omsg.react(reaction);

			collector = await omsg.awaitReactions(
				(reaction, user) => user.id == msg.author.id && reactionFilter.indexOf(reaction.emoji.name) > -1,
				{
					time: 2 * 60 * 1000,
					max: 1,
				}
			);

			collected = collector.first();
			let index;

			switch (collected.emoji.name) {
				case "❌":
					omsg.delete();
					break;
				case "⬅":
					await omsg.delete();
					omsg = null;
					messagesPage(page);
					break;
				case "🗑":
					index = messages.map(m => m.id).indexOf(id);
					messages.splice(index, 1);
					await r.table("Mailbox").get(msg.channel.id).update({ messages: messages });
					await omsg.delete();
					omsg = null;
					messagesPage(page);
					break;
				case "🔔":
					client.api.channels(msg.channel.id).messages(omsg.id).reactions.delete();
					require("./call.js")(client, msg, "*611");
			}
		};

		messagesPage(1);
	}
};
