const { MessageEmbed } = require("discord.js");

module.exports = async(msg, myNumber) => {
	const reactionConv = { "1⃣": "1", "⬅": "1", "2⃣": "2", "➡": "2", "3⃣": "3", "4⃣": "4", "↩": "9", "❌": "0" };

	// Main menu function
	let menu = async() => {
		const embed = new MessageEmbed();
		let omsg;

		// Standard embed
		embed.setTitle("Welcome to DiscordTel 411! Please choose from the options below.")
			.setColor(0xe6e600)
			.setDescription(`\`1\` To search through the yellowbook.\
				\n\`2\` To add/change/remove your yellow entry.\
				\n\`3\` For information about special numbers.\
				\n\`4\` To call Customer Support.\
				\n\`0\` To hangup.`)
			.setFooter("This call will automatically be hung up after 60 seconds of inactivity.");

		// Create message and add reactions
		omsg = await msg.channel.send("", { embed: embed });

		// message collector for first msg
		let mcol = msg.channel.createMessageCollector(m =>
			m.author.id === msg.author.id && /^[0-4]$/.test(m.content),
		{ time: 60000, max: 1 });

		// on collecting
		mcol.on("end", collected => {
			omsg.delete();
			if (collected.first().guild) collected.first().delete();

			if (!collected.first()) return msg.channel.send("", { embed: { title: "Call ended", description: "The call with *411 has been hung up due to inactivity.", color: 0x990000 } });
			return menus(collected.first().content);
		});
	};


	let menus = async number => {
		switch (number) {
			// Option 1 - Search through yellowbook
			case "1": {
				let phonebook = await r.table("Phonebook");
				let pages = Math.ceil(phonebook.length / 10);

				if (!phonebook.length) return msg.channel.send("", { embed: { title: "The yellowbook is empty", description: "There are currently no entries in the yellowbook. Call *411 to enter the yellowbook.", color: 0x660000 } });

				// Sort numbers by first 08 then 0301 -> 0302 etc...
				const comparison = (a, b) => {
					let comp = 0;
					a.id > b.id ? comp = 1 : comp = -1;
					if (b.id.startsWith("08") && !a.id.startsWith("08")) comp = 1;
					return comp;
				};
				phonebook.sort(comparison);

				// Handles the making and interaction of embed (will call itself)
				let updatePage = async(omsg, page, next) => {
					if (next) {
						switch (next) {
							case "0":
								return omsg.delete();
							case "back":
								omsg.delete();
								return menu();
							default: {
								page = parseInt(next);
							}
						}
					}

					// Basic embed to use
					const embed = new MessageEmbed()
						.setTitle("Yellowbook results")
						.setDescription("Buy a 0800/0844 number to get it featured on the first pages of the yellowbook.")
						.setColor(0xffff00)
						.setFooter(`Page ${page}/${pages}. This call will automatically be hung up after 2 minutes of inactivity.`);

					// Add the numbers to the embed
					for (let i = (page * 10) - 10; i < page * 10; i++) {
						if (!phonebook[i]) break;
						embed.addField(`${phonebook[i].id}`, `${phonebook[i].description}`);
					}
					embed.addField("Options", "Enter a page number to go there...\n(back) to return.\n(0) to exit.");

					// Send/Edit the embed
					if (!omsg) omsg = await msg.channel.send("", { embed: embed });
					else omsg = await omsg.edit("", { embed: embed });

					// add collector
					let mcol = msg.channel.createMessageCollector(m =>
						m.author.id === msg.author.id && ((parseInt(m.content) > 0 && parseInt(m.content) < pages + 1 && parseInt(m.content) != page) || parseInt(m.content) === 0 || m.content.toLowerCase() === "back"),
					{ time: 120000, max: 1 });

					// on collecting
					mcol.on("end", collected => {
						if (!collected.first()) return msg.channel.send("", { embed: { title: "Call ended", description: "The call with *411 has been hung up due to inactivity.", color: 0x990000 } });

						if (collected.first().guild) collected.first().delete();

						return updatePage(omsg, page, collected.first().content);
					});
				};

				updatePage(null, 1, null);

				break;
			}

			// Option 2 - Yellowbook entry options
			case "2": {
				// Check to see if they got perms
				const perms = await msg.author.getPerms();
				const cperms = msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");
				if (!cperms && !perms) return msg.channel.send("", { embed: { title: "Unauthorized", description: "You need manage guild or higher to access this menu." } });

				// Basic embed
				let embed = new MessageEmbed()
					.setTitle("Yellowbook options")
					.setDescription("Here you can add, edit or delete your number's yellowbook entry.")
					.setColor(0xffff00)
					.setFooter("This call will automatically be hung up after 2 minutes of inactivity.");

				// Check if there is an entry and add correct options
				const entry = await r.table("Phonebook").get(myNumber.id);
				if (entry) embed.addField("Current description", entry.description);
				if (!entry) embed.addField("Options", "(1) to add your number to the yellowbook.\n(9) to return.\n(0) to exit.");
				else embed.addField("Options", "(1) to edit the entry.\n(2) to delete the entry.\n(9) to return.\n(0) to exit.");

				// Correct regex
				const reg = new RegExp(entry ? "^[1290]$" : "^[190]$");

				let omsg = await msg.channel.send("", { embed: embed });

				// add collector
				let mcol = msg.channel.createMessageCollector(m =>
					m.author.id === msg.author.id && reg.test(m.content),
				{ time: 120000, max: 1 });

				// on collecting
				mcol.on("end", async collected => {
					if (!collected.first()) return msg.channel.send("", { embed: { title: "Call ended", description: "The call with *411 has been hung up due to inactivity.", color: 0x990000 } });

					if (collected.first().guild) collected.first().delete();

					// act on what has been said
					switch (collected.first().content) {
						case "1": {
							// basic embed
							embed = new MessageEmbed()
								.setTitle("Yellowbook options")
								.setColor(0xffff00)
								.setFooter("This call will automatically be hung up after 3 minutes of inactivity.");

							// add field depending on entry
							if (entry) embed.setDescription("Please input the new description. This will be publicly visible so refrain from using any bad language. (max 100 characters)");
							else embed.setDescription("Please input a description for your number. This will be the description publicly available in the yellowbook so please refrain from using any bad language. (max 100 characters)");

							omsg = await omsg.edit("", { embed: embed });

							// add collector
							mcol = msg.channel.createMessageCollector(m =>
								m.author.id === msg.author.id && m.content.length < 100,
							{ time: 180000, max: 1 });

							mcol.on("end", async coll => {
								if (coll.first().guild) coll.first().delete();

								// try to insert/edit in DB
								let res;
								if (entry) res = await r.table("Phonebook").get(myNumber.id).update({ description: coll.first().content });
								else res = await r.table("Phonebook").insert({ id: myNumber.id, channel: msg.channel.id, description: coll.first().content });

								if (!res.inserted) return msg.channel.send("", { embed: { color: 0x990000, title: "Something went wrong", description: "Something went wrong, please join our support server if you haven't and message one of the staff members or call *611." } });
								else return msg.channel.send("", { embed: { color: 0x006600, title: "Succes!", description: `Your number's description is: \`\`\`${coll.first().content}\`\`\`` } });
							});
							break;
						}
						case "2": {
							let res = await r.table("Phonebook").get(myNumber).delete();
							if (!res.deleted) return msg.channel.send("", { embed: { color: 0x990000, title: "Something went wrong", description: "Something went wrong, please join our support server if you haven't and message one of the staff members or call *611" } });
							else return msg.channel.send("", { embed: { color: 0x006600, title: "Success!", description: "Your number's yellowbook entry has been deleted." } });
						}
						case "9":
							omsg.delete();
							return menu();
						default:
							return omsg.delete();
					}
				});

				break;
			}

			// Option 3 - Information special numbers
			case "3": {
				return msg.channel.send("", { embed: {
					color: 0xffff00,
					title: "Special numbers",
					description: "This is a list of all currently operational special numbers.",
					fields: [
						{ name: "*233", value: "Displays your number's information and let's you recharge the number." },
						{ name: "*411", value: "You should know since you just called it <:BusThinking:341628019472990209>." },
						{ name: "*611", value: "DiscordTel's customer support number. **Troll-calling will result in a strike/blacklist.**" },
					] },
				});
			}
			// Option 4 - call CS
			case "4":
				return require("../commands/Public/call.js")(client, msg, "*611");
		}
	};

	menu();
};
