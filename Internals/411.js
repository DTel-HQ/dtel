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

	omsg = await msg.channel.send({ embed: { color: config.colors.info, title: "Loading", description: "Please wait whilst we're gathering all numbers." } });

	// Load Phonebook once per 411 call (for search through)
	const phonebook = await r.table("Phonebook");
	const vipNumber = myNumber.vip ? new Date(myNumber.vip.expiry).getTime() > Date.now() : false;

	// Sort numbers by first 08 then 0301 -> 0302 etc...
	const comparison = (a, b) => {
		let comp = 0;
		a.id > b.id ? comp = 1 : comp = -1;
		if (a.id.startsWith("08") && !b.id.startsWith("08")) comp = -1;
		return comp;
	};
	await phonebook.sort(comparison);
	let pages = Math.ceil(phonebook.length / 10);

	// Check if the user has permission
	let gperm = msg.guild ? msg.guild.members.cache.get(msg.author.id).hasPermission("MANAGE_GUILD") : true;
	let perms = msg.author.support || gperm;
	let delPerm = false; // msg.guild ? msg.channel.permissionsFor(client.user.id).has("MANAGE_MESSAGES") : false;

	// Searchpage function for option 1
	let searchPage = async query => {
		if (query) {
			results = phonebook.filter(p => p.description.toLowerCase().indexOf(query) > -1);
			await results.sort(comparison);
			queryPages = Math.ceil(results.length / 10) || 1;
		}

		// Searchpage embed
		embed = new MessageEmbed()
			.setColor(config.colors.yellowbook)
			.setTitle(query ? `${results.length ? "Yellowbook" : "No"} results for ${query}` : "Yellowbook entries")
			.setFooter(`Page ${query ? queryPage : page}/${query ? queryPages : pages}. This call will automatically be hung up after 3 minutes of inactivity.`);

		// Determine if query - add 10 results accordingly
		for (let i = query ? (queryPage - 1) * 10 : (page - 1) * 10; query ? i < queryPage * 10 : i < page * 10; i++) {
			let doc = query ? results[i] : phonebook[i];
			if (!doc) break;
			await embed.addField(doc.id, doc.description);
		}
		embed.addField("Options", `Enter a page number or query (minimum of three characters) to search for.\n• \`clear\` to return to all results.\n• \`return\` to return to the main menu.\n• (0) to hangup.`);

		// Edit/send message
		await omsg.edit({ embed: embed });

		// Collector
		collected = (await msg.channel.awaitMessages(
			// Search for correct page number or query with more than 3 characters.
			m => m.author.id === msg.author.id && (/^\d+$/.test(m.content) ? true : m.content.length >= 3),
			{ max: 1, time: 180000 },
		)).first();

		// On collection
		if (collected && delPerm) collected.delete().catch(e => null);
		if (!collected || /^0$/.test(collected.content)) {
			embed.setFooter(`Page ${query ? queryPage : page}/${query ? queryPages : pages}.`);
			embed.spliceFields(embed.fields.length - 1, 1);
			await omsg.edit({ embed: embed });
			return false;
		}
		collected.content = collected.content.toLowerCase();
		if (/^return$/.test(collected.content)) return true;
		if (!/^\d+$/.test(collected.content)) query = collected.content;
		if (/^clear$/.test(collected.content)) query = null;

		// Page number or query? change page number
		if (/^\d+$/.test(collected.content)) {
			let pagenumber = parseInt(collected.content);
			if (query && pagenumber <= queryPages) queryPage = pagenumber;
			else if (pagenumber <= pages) page = pagenumber;
		}

		// Return this function again
		let res = await searchPage(query);
		return res;
	};

	while (loop) {
		// main menu embed
		embed = new MessageEmbed()
			.setColor(config.colors.yellowbook)
			.addField("Welcome to the DTel yellowbook!",
				`\`1\` To search through the yellowbook.
\`2\` To add/change/remove your yellow entry.${perms ? "" : " (You need Manage Guild to do this)"}
\`3\` For information about special numbers.
\`4\` To call Customer Support.
\`5\` To access VIP options. ${vipNumber ? perms ? "" : "(You need Manage Guild to do this)" : "(You need a VIP number to do this... `>upgrade`)"}
\`0\` To hangup.`)
			.setFooter("This call will automatically be hung up after 60 seconds of inactivity.");
		if (message) embed.setDescription(`✅ ${message}`);
		message = null;

		await omsg.edit({ embed: embed });

		myNumber = await msg.channel.number;
		// Create collector & make busy
		msg.author.busy = true;
		collected = (await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && (perms ? vipNumber ? /^[0-5]$/.test(m.content) : /^[0-4]$/.test(m.content) : /^[0134]$/.test(m.content)),
			{ max: 1, time: 60000 })).first();

		// On main menu collection
		if (collected && delPerm) collected.delete().catch(e => null);
		if (!collected || /^0$/.test(collected.content)) {
			msg.author.busy = false;
			omsg.delete().catch(e => null);
			break;
		}

		switch (collected.content) {
			// Search through yellowbook
			case "1": {
				if (!phonebook.length) {
					msg.channel.send({ embed: { title: "The yellowbook is empty", description: "There are currently no entries in the yellowbook. Call *411 to enter the yellowbook.", color: config.colors.error } });
					continue;
				}
				// Function for search pages.
				let result = await searchPage();
				if (!result) {
					loop = false;
					msg.author.busy = false;
				}
				break;
			}

			// Yellowbook entry options
			case "2": {
				// Basic entry options embed
				embed = new MessageEmbed()
					.setTitle("Yellowbook options")
					.setDescription("Here you can add, edit or delete your number's yellowbook entry.")
					.setColor(config.colors.yellowbook)
					.setFooter("This call will automatically be hung up after 2 minutes of inactivity.");

				// Entry? no? Make embed right
				const entry = await r.table("Phonebook").get(myNumber.id);
				if (entry) {
					embed.addField("Current description", entry.description);
					embed.addField("Options", "`1` to edit the entry.\n`2` to delete the entry.\n\n`9` to return.\n`0` to hangup.");
				} else {
					embed.addField("Options", "`1` to add your number to the yellowbook.\n\n`9` to return.\n`0` to hangup.");
				}

				// Edit/send message
				await omsg.edit({ embed: embed });

				// Collect a number
				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (entry ? /^[0129]$/.test(m.content) : /^[019]$/.test(m.content)),
					{ max: 1, time: 120000 },
				)).first();

				// On collection
				if (collected && delPerm) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					msg.author.busy = false;
					omsg.delete().catch(e => null);
					loop = false;
					break;
				}

				// if going back
				if (/^9$/.test(collected.content))	break;
				if (!perms) {
					msg.author.busy = false;
					return msg.reply("You need MANAGE_GUILD perms for that");
				}

				// if deleting
				if (/^2$/.test(collected.content)) {
					await r.table("Phonebook").get(myNumber.id).delete();
					message = "Your yellowbook entry has been succesfully deleted";
					break;
				}

				// From this point on it's adding/editing the description
				// Basic description setting embed
				embed = new MessageEmbed()
					.setTitle("Yellowbook description")
					.setColor(config.colors.yellowbook)
					.setFooter("(9) to return. (0) to hangup. This call will automatically be hung up after 3 minutes of inactivity.");

				// Add description based on if there's an entry or not
				if (entry) embed.setDescription("Please input the new description.\nThis will be publicly visible so refrain from using any explicit language.\n\n(min 10, max 200 characters)");
				else embed.setDescription("Please input a description for your number.\nThis will be the description publicly available in the yellowbook so please refrain from using any bad language.\n\n(min 10, max 200 characters)");

				// edit/send message
				await omsg.edit({ embed: embed });

				// add collector
				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 10 || /^[09]$/.test(m.content)) && m.content.length < 201,
					{ max: 1, time: 180000 },
				)).first();

				if (collected && delPerm) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					msg.author.busy = false;
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
					.setColor(config.colors.yellowbook)
					.setTitle("Special numbers")
					.setDescription("This is a list of all currently operational special numbers")
					.addField("*233", "Displays your number information and lets you recharge the number.")
					.addField("*411", "You should know since you just called it...")
					.addField("*611", "DTel customer support number. **Troll-calling will result in a strike/blacklist.**")
					.setFooter("(9) to return. (0) to hangup. \nThis call will automatically be hung up after 60 seconds of inactivity.");

				// edit/send message
				await omsg.edit({ embed: embed });

				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^[09]$/.test(m.content),
					{ max: 1, time: 60000 },
				)).first();

				if (collected && delPerm) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					msg.author.busy = false;
					omsg.delete().catch(e => null);
					loop = false;
				}
				break;
			}

			// Call CS
			case "4": {
				await omsg.edit({ embed: { color: config.colors.info, title: "Please wait", description: "Attempting to call Customer Support now.", author: { name: msg.author.tag, icon_url: msg.author.displayAvatarURL() } } });
				msg.author.busy = false;
				return (await reload("./Commands/Public/call.js"))(client, msg, "*611");
			}

			case "5": {
				embed = new MessageEmbed()
					.setColor(config.colors.yellowbook)
					.setTitle("VIP Settings")
					.setDescription(`(1) to ${myNumber.vip.hidden ? "enable" : "disable"} number recognition.\
													\n(2) to set or clear this number's custom name.\
													\n\nNote: abuse (eg. an offensive name) may result in a strike and/or **the removal of vip**`)
					.addField("Hidden", myNumber.vip.hidden, true)
					.addField("Name", myNumber.vip.name ? myNumber.vip.name : "No name has been chosen", true)
					.setFooter("(9) to return. (0) to hangup. \nThis call will automatically be hung up after 2 minutes of inactivity.");

				// edit/send message
				await omsg.edit({ embed: embed });

				// Collector
				collected = (await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^[0129]$/.test(m.content),
					{ max: 1, time: 120000 },
				)).first();

				if (collected && delPerm) collected.delete().catch(e => null);
				if (!collected || /^0$/.test(collected.content)) {
					msg.author.busy = false;
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
							.setColor(config.colors.yellowbook)
							.setTitle("Changing custom name")
							.setDescription("Type your new custom name or `disable` to disable the custom name. (4-25 characters)")
							.setFooter("(9) to return. (0) to hangup. \nThis call will automatically be hung up after 2 minutes of inactivity.");

						// edit/send message
						await omsg.edit({ embed: embed });

						// Collector
						collected = (await msg.channel.awaitMessages(
							m => m.author.id === msg.author.id && m.content.length > 3 && m.content.length < 26,
							{ max: 1, time: 120000 },
						)).first();

						if (collected && delPerm) collected.delete().catch(e => null);
						if (!collected || /^0$/.test(collected.content)) {
							msg.author.busy = false;
							omsg.delete().catch(e => null);
							loop = false;
							break;
						}
						if (/^9$/.test(collected.content)) break;

						await r.table("Numbers").get(myNumber.id).update({ vip: { name: /^disable$/i.test(collected.content) ? false : collected.content } });
						if (!/^disable$/i.test(collected.content)) message = `Succesfully changed this number's custom name to: ${collected.content}`;
						else message = "Succesfully disabled this number's custom name.";
						break;
					}
				}
				break;
			}
		}
	}
};
