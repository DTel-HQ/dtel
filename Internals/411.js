const { MessageEmbed } = require("discord.js");

module.exports = async(msg, myNumber) => {
	let omsg,
		embed,
		collected,
		loop = true,
		page = 1,
		queryPage = 1,
		results,
		queryPages,
		message;

	// Load Phonebook once per 411 call (for search through)
	const phonebook = await r.table("Phonebook");
	const vipNumber = myNumber.vip ? new Date(myNumber.vip.expiry).getTime() > Date.now() : false;

	// Sort numbers by first 08 then 0301 -> 0302 etc...
	const comparison = (a, b) => {
		let comp = 0;
		a.id > b.id ? comp = 1 : comp = -1;
		if (b.id.startsWith("08") && !a.id.startsWith("08")) comp = 1;
		return comp;
	};
	await phonebook.sort(comparison);
	let pages = Math.ceil(phonebook.length / 10);

	// Check if the user has permission
	let dperms = await msg.author.getPerms();
	let gperm = msg.guild ? msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD") : true;
	let perms = dperms.support || gperm;

	// Searchpage function for option 1
	let searchPage = async query => {
		if (query) {
			results = phonebook.filter(p => p.description.toLowerCase().indexOf(query) > -1);
			await results.sort(comparison);
			queryPages = Math.ceil(results.length / 10);
		}

		// Searchpage embed
		embed = new MessageEmbed()
			.setColor(0xe6e600)
			.setTitle(query ? `Yellowbook results for ${query}` : "Yellowbook entries")
			.setDescription(`Enter a page number or query (minimum of three characters) to search for.\n(clear) to clear a query.\n(return) to return from the query.\n(0) to hangup.`)
			.setFooter(`Page ${query ? queryPage : page}/${query ? queryPages : pages}. This call will automatically be hung up after 3 minutes of inactivity.`);

		// Determine if query - add 10 results accordingly
		for (let i = query ? (queryPage - 1) * 10 : (page - 1) * 10; i < query ? queryPage * 10 : page * 10; i++) {
			let doc = query ? results[i] : phonebook[i];
			if (!doc) break;
			await embed.addField(doc.id, doc.description);
		}

		// Edit/send message
		omsg = await omsg.edit({ embed: embed }).catch(async e => {
			omsg.delete().catch(_ => null);
			omsg = await msg.channel.send({ embed: embed });
		});

		// Collector
		collected = (await msg.channel.awaitMessages(
			// Search for correct page number or query with more than 3 characters.
			m => m.author === msg.author && /^\d+$/.test(m.content) ? parseInt(m.content) < query ? queryPages && parseInt(m.content) > -1 : pages : m.content.length > 3,
			{ max: 1, time: 180000 }
		)).first();

		// On collection
		if (collected) collected.delete().catch(e => null);
		if (!collected || /^0$/.test(collected.content)) return false;
		collected.content = collected.content.toLowerCase();
		if (/^return$/.test(collected.content)) return true;
		if (!/^\d+$/.test(collected.content)) query = collected.content;
		if (/^clear$/.test(collected.content)) query = null;

		// Page number or query? change page number
		if (/^\d+$/.test(collected.content)) query ? queryPage = parseInt(collected.content) : page = parseInt(collected.content);

		// Return this function again
		let res = await searchPage(query);
		return res;
	};

	while (loop) {
		// main menu embed
		embed = new MessageEmbed()
			.setColor(0xe6e600)
			.addField("Welcome to the DiscordTel yellowbook!",
				`\`1\` To search through the yellowbook.\
				\n\`2\` To add/change/remove your yellow entry.${perms ? "" : " (You need Manage Guild to do this)"}\
				\n\`3\` For information about special numbers.\
				\n\`4\` To call Customer Support.\
				\n\`5\` To access VIP options.${vipNumber ? perms ? "" : "You need Manage Guild to do this" : "You need a VIP number to do this."}
				\n\`0\` To hangup.`)
			.setFooter("This call will automatically be hung up after 60 seconds of inactivity.");
		if (message) embed.setDescription(`:checkmark: **${message}**`);
		message = null;

		if (omsg) {
			omsg = await omsg.edit({ embed: embed }).catch(async e => {
				omsg.delete().catch(_ => null);
				omsg = await msg.channel.send({ embed: embed });
			});
		} else {
			omsg = await msg.channel.send({ embed: embed });
		}

		// Create collector & make busy
		Busy.create({ id: msg.author.id });
		collected = (await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && perms ? vipNumber ? /^[0-5]$/.test(m.content) : /^[0-4]$/.test(m.content) : /^[0134]$/.test(m.content),
			{ max: 1, time: 60000 })).first();

		// On main menu collection
		if (collected) collected.delete().catch(e => null);
		if (!collected || /^0$/.test(collected.content)) {
			Busy.newGet(msg.author.id).delete();
			omsg.delete().catch(e => null);
			break;
		}

		switch (collected.content) {
			// Search through yellowbook
			case "1": {
				if (!phonebook.length) {
					msg.channel.send({ embed: { title: "The yellowbook is empty", description: "There are currently no entries in the yellowbook. Call *411 to enter the yellowbook.", color: 0x660000 } });
					continue;
				}
				// Function for search pages.
				let result = await searchPage();
				if (!result) {
					loop = false;
					omsg.delete().catch(e => null);
					Busy.newGet(msg.author.id).delete();
				}
				break;
			}

			// Yellowbook entry options
			case "2": {
				// Basic entry options embed
				embed = new MessageEmbed()
					.setTitle("Yellowbook options")
					.setDescription("Here you can add, edit or delete your number's yellowbook entry.")
					.setColor(0xe6e600)
					.setFooter("This call will automatically be hung up after 2 minutes of inactivity.");

				// Entry? no? Make embed right
				const entry = await r.table("Phonebook").get(myNumber.id);
				if (entry) {
					embed.addField("Current description", entry.description);
					embed.addField("Options", "(1) to edit the entry.\n(2) to delete the entry.\n(9) to return.\n(0) to hangup.");
				} else {
					embed.addField("Options", "(1) to add your number to the yellowbook.\n(9) to return.\n(0) to hangup.");
				}

				// Edit/send message
				omsg = await omsg.edit({ embed: embed }).catch(e => {
					omsg.delete().catch(_ => null);
					msg.channel.send({ embed: embed });
				});

				// Collect a number
				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && entry ? /^[0129]$/.test(m.content) : /^[019]$/.test(m.content),
					{ max: 1, time: 120000 }
				)).first();

				// On collection
				if (collected) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					Busy.newGet(msg.author.id).delete();
					omsg.delete().catch(e => null);
					loop = false;
					break;
				}

				// if going back
				if (/^9$/.test(collected.content))	break;

				// if deleting
				if (/^2$/.test(collected.content)) {
					r.table("Phonebook").get(myNumber.id).delete();
					message = "Your yellowbook entry has been succesfully deleted";
					break;
				}

				// From this point on it's adding/editing the description
				// Basic description setting embed
				embed = new MessageEmbed()
					.setTitle("Yellowbook description")
					.setColor(0xe6e600)
					.setFooter("(9) to return. (0) to hangup. This call will automatically be hung up after 3 minutes of inactivity.");

				// Add description based on if there's an entry or not
				if (entry) embed.setDescription("Please input the new description. This will be publicly visible so refrain from using any bad language. (min 10, max 200 characters)");
				else embed.setDescription("Please input a description for your number. This will be the description publicly available in the yellowbook so please refrain from using any bad language. (min 10, max 200 characters)");

				// edit/send message
				omsg = await omsg.edit({ embed: embed }).catch(async e => {
					omsg.delete().catch(_ => null);
					omsg = await msg.channel.send({ embed: embed });
				});

				// add collector
				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 10 || /^[09]$/.test(m.content)) && m.content.length < 201,
					{ max: 1, time: 180000 }
				)).first();

				if (collected) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					Busy.newGet(msg.author.id).delete();
					omsg.delete().catch(e => null);
					loop = false;
					break;
				}

				if (/^9$/.test(collected.content)) break;

				// From this point on there's a description
				// Add/edit entry
				if (entry) {
					await r.table("Phonebook").get(myNumber.id).update({ description: collected.content });
					message = `Succesfully entered this number into the yellowbook.\n${collected.content}`;
				} else {
					await r.table("Phonebook").insert({ id: myNumber.id, description: collected.content });
					message = `Succesfully changed this number its description:\n${collected.content}`;
				}
				break;
			}

			// Information about special numbers
			case "3": {
				embed = new MessageEmbed()
					.setColor(0xe6e600)
					.setTitle("Special numbers")
					.setDescription("This is a list of all currently operational special numbers")
					.addField("*233", "Displays your number information and lets you recharge the number.")
					.addField("*411", "You should know since you just called it...")
					.addField("*611", "DiscordTel customer support number. **Troll-calling will result in a strike/blacklist.**")
					.setFooter("(9) to return. (0) to hangup. \nThis call will automatically be hung up after 60 seconds of inactivity.");

				// edit/send message
				omsg = await omsg.edit({ embed: embed }).catch(async e => {
					omsg.delete().catch(_ => null);
					omsg = await msg.channel.send({ embed: embed });
				});

				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^[09]$/.test(m.content),
					{ max: 1, time: 60000 }
				)).first();

				if (collected) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					Busy.newGet(msg.author.id).delete();
					omsg.delete().catch(e => null);
					loop = false;
				}
				break;
			}

			// Call CS
			case "4": {
				return (await reload("./Commands/Public/call.js"))(client, msg, "*611");
			}

			case "5": {
				embed = new MessageEmbed()
					.setColor(0xffbf00)
					.setTitle("VIP Settings")
					.setDescription(`(1) to ${myNumber.vip.hidden ? "enable" : "disable"} number recognition.\
													\n(2) to set or clear this number's custom name.\
													\n\nNote: abuse (eg. an offensive name) may result in a strike and/or **the removal of vip**`)
					.addField("Hidden", myNumber.vip.hidden, true)
					.addField("Name", myNumber.vip.name ? myNumber.vip.name : "No name has been chosen", true)
					.setFooter("(9) to return. (0) to hangup. \nThis call will automatically be hung up after 2 minutes of inactivity.");

				// edit/send message
				omsg = await omsg.edit({ embed: embed }).catch(async e => {
					omsg.delete().catch(_ => null);
					omsg = await msg.channel.send({ embed: embed });
				});

				// Collector
				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^[0129]$/.test(m.content),
					{ max: 1, time: 120000 }
				)).first();

				if (collected) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					Busy.newGet(msg.author.id).delete();
					omsg.delete().catch(e => null);
					loop = false;
					break;
				}
				if (/^9$/.test(collected.content)) break;

				switch (collected.content) {
					case "1": {
						myNumber.vip.hidden = !myNumber.vip.hidden;
						await r.table("Numbers").get(myNumber.id).update({ vip: { hidden: myNumber.vip.hidden } });
						message = `Succesfully ${myNumber.vip.hidden ? "disabled" : "enabled"} number recognition.`;
						break;
					}

					case "2": {
						embed = new MessageEmbed()
							.setColor(0xffbf00)
							.setTitle("Changing custom name")
							.setDescription("Type your new custom name or `disable` to disable the custom name. (4-25 characters)")
							.setFooter("(9) to return. (0) to hangup. \nThis call will automatically be hung up after 2 minutes of inactivity.");

						// edit/send message
						omsg = await omsg.edit({ embed: embed }).catch(async e => {
							omsg.delete().catch(_ => null);
							omsg = await msg.channel.send({ embed: embed });
						});

						// Collector
						collected = (await msg.channel.awaitMessages(
							m => m.author.id === msg.author.id && m.content.length > 3 && m.content.length < 26,
							{ max: 1, time: 120000 }
						)).first();

						if (collected) collected.delete().catch(e => null);
						if (!collected || /^0$/.test(collected.content)) {
							Busy.newGet(msg.author.id).delete();
							omsg.delete().catch(e => null);
							loop = false;
							break;
						}
						if (/^9$/.test(collected.content)) break;

						await r.table("Numbers").get(myNumber.id).update({ vip: { name: /^disable$/i.test(collected.content) ? false : collected.content } });
						if (/^disable$/i.test(collected.content)) message = `Succesfully changed this number's custom name to: ${collected.content}`;
						else message = "Succesfully disabled this number's custom name.";
						break;
					}
				}
				break;
			}
		}
	}
};
