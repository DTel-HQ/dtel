const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const myNumber = await msg.channel.number;
	if (!myNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "This channel does not have a number." } });
	if (new Date(myNumber.expiry).getTime() < Date.now()) return msg.channel.send({ embed: { color: config.colors.error, title: "Billing error", description: "This channel's number has expired. Please call `*233` to renew it." } });

	// Get the user's permissions
	let perm;
	if (msg.channel.type === "dm") perm = true;
	else perm = await msg.guild.members.fetch(msg.author.id).then(u => u.permissions.has("MANAGE_GUILD"));
	if (!perm) perm = msg.author.support;

	// Get contacts
	let contacts = myNumber.contacts || [];

	contacts.forEach(async c => {
		let contactDoc = await r.table("Numbers").get(c.number);
		if (!contactDoc) {
			contacts.splice(contacts.indexOf(c), 1);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });
		}
	});

	// Main contact list
	let contactList = async() => {
		// Standard embed
		const embed = new MessageEmbed()
			.setColor(config.colors.contacts)
			.setTitle("Contacts")
			.setDescription(`An easy way to store your known DTel numbers. Their name will also show up when they call.\n\nPress a number (1-10) to call.\nTo message a contact: respond with \`message (1-10)\`\nTo add a contact: respond with \`add\`.\n${perm && contacts.length ? "To edit/delete a contact: respond with `edit/delete (1-10)`." : ""}`)
			.setFooter("Press (0) to hangup. This call will automatically be hung up after 2 minutes of inactivity.");

		// Add contacts to embed
		for (let contact of contacts) {
			await embed.addField(`${contacts.indexOf(contact) + 1}. ${contact.number} - ${contact.name}`, contact.description);
		}

		// send the embed
		let omsg = await msg.channel.send({ embed: embed });

		const testFunction = m => {
			if (m.author.id !== msg.author.id) return false;
			if (contacts.length && parseInt(m.content) && parseInt(m.content) <= contacts.length) return true;
			if (["add", "0"].includes(m.content.toLowerCase())) return true;
			const index = m.content.split(" ")[1] ? parseInt(m.content.split(" ")[1]) : null;
			if (!index) return false;
			const type = m.content.split(" ")[0].toLowerCase();
			if (type === "message") return true;
			if (perm && ["edit", "delete"].includes(type)) return true;
			return false;
		};

		// Create collector
		msg.author.busy = true;
		let collected = await msg.channel.awaitMessages(testFunction,	{ max: 1, time: 120000 });

		// On collection
		omsg.delete().catch(e => null);
		let delPerm = !!msg.guild;
		if (collected.first() && delPerm) collected.first().delete().catch(e => null);
		if (!collected.first() || /^0$/.test(collected.first().content)) {
			msg.author.busy = false;
			return;
		}

		// if they want to add a number
		if (/add/i.test(collected.first().content)) {
			let getNumber = async bad => {
				if (!perm) {
					msg.author.busy = false;
					return msg.channel.send({ embed: { color: config.colors.error, title: "Insufficient permission", description: "You need manage server permission to do this." } });
				}
				if (contacts.length >= 10) msg.channel.send({ embed: { color: config.colors.error, title: "Too many contacts", description: "We currently do not allow more than 9 contacts." } });

				// send embed
				omsg = await msg.channel.send({ embed: {
					color: config.colors.contacts,
					title: bad ? "Non existant number. " : "Add a number.",
					description: "Please input the number you want to add.",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up after 60 seconds of inactivity.",
					},
				} });

				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^0$|^0((30\d)|(8(00|44))|(900))\d{7}$/.test(client.replaceNumber(m.content)),
					{ max: 1, time: 60000 },
				);

				// on collection
				if (collected.first()) collected.first().delete().catch(e => null);
				if (!collected.first() || /^0$/.test(collected.first().content)) {
					msg.author.busy = false;
					omsg.delete().catch(e => null);
					return;
				}

				// does that number exist?
				const number = await r.table("Numbers").get(client.replaceNumber(collected.first().content));
				if (!number) {
					omsg.delete().catch(e => null);
					return getNumber(true);
				}

				// add a name embed
				omsg = await omsg.edit("", { embed: {
					color: config.colors.contacts,
					title: `Add a name for ${number.id}`,
					description: "Please enter a name for the number. (max 20 characters)",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up after 1 minutes of inactivity.",
					},
				} });

				// collector for name
				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 0 && m.content.length < 21),
					{ max: 1, time: 60000 },
				);

				// on collected
				if (collected.first() && delPerm) collected.first().delete().catch(e => null);
				if (!collected.first() || /^0$/.test(collected.first().content)) {
					msg.author.busy = false;
					return omsg.delete().catch(e => null);
				}
				let name = collected.first().content;

				// add a description embed
				omsg = await omsg.edit("", { embed: {
					color: config.colors.contacts,
					title: `Add a description for ${number.id}`,
					description: "Please enter a description for the number. (max 100 characters)",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up after 3 minutes of inactivity.",
					},
				} });

				// collector for description
				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 0 && m.content.length < 101),
					{ max: 1, time: 180000 },
				);

				// on collected
				if (collected.first() && delPerm) collected.first().delete().catch(e => null);
				omsg.delete().catch(e => null);
				if (!collected.first() || /^0$/.test(collected.first().content)) {
					msg.author.busy = false;
					return;
				}
				let description = collected.first().content;

				let contact = { number: number.id, name: name, description: description };
				contacts.push(contact);
				await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });
				return contactList();
			};

			return getNumber();
		}

		// Assign contact
		let contact = contacts[parseInt(collected.first().content.split(" ")[1]) - 1];

		// if edit
		if (/edit/i.test(collected.first().content.split(" ")[0])) {
			// check for perm & if the contact is legit
			if (!perm) {
				msg.author.busy = false;
				return msg.channel.send({ embed: { color: config.colors.error, title: "Insufficient perms", description: "You need the Manage Server permission to do this." } });
			}

			omsg = await msg.channel.send({ embed: {
				color: config.colors.contacts,
				title: `Editing ${contact.name} (${contact.number})`,
				description: `Enter a new name for the contact. (max 20 characters)\nCurrent name: \`${contact.name}\``,
				footer: {
					text: "(9) to return, (0) to hangup. This call will automatically be hung up after 3 minutes of inactivity",
				},
			} });

			// Create collector
			collected = await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && m.content.length > 0 && m.content.length < 21,
				{ max: 1, time: 180000 },
			);

			// on collection
			if (collected.first() && delPerm) collected.first().delete().catch(e => null);
			if (/^9$/.test(collected.first().content)) {
				msg.author.busy = false;
				return contactList();
			}
			if (!collected.first() || /^0$/.test(collected.first().content)) {
				msg.author.busy = false;
				return omsg.delete().catch(e => null);
			}

			// Edit the contact's entry
			let newContact = { number: contact.number, name: collected.first().content, description: contact.description };
			await contacts.splice(contacts.indexOf(contact), 1, newContact);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });
			contact = newContact;

			omsg = await omsg.edit({ embed: {
				color: config.colors.contacts,
				title: `Editing ${contact.name}(${contact.number})`,
				description: `Enter a new description for the contact. (max 100 characters)\nCurrent description: \`${contact.description}\``,
				footer: {
					text: "(0) to hangup. This call will automatically be hung up after 3 minutes of inactivity",
				},
			} });

			// Create collector
			collected = await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && m.content.length > 0 && m.content.length < 100,
				{ max: 1, time: 180000 },
			);

			// on collection
			if (collected.first() && delPerm) collected.first().delete().catch(e => null);
			omsg.delete().catch(e => null);
			msg.author.busy = false;
			if (/^9$/.test(collected.first().content)) return contactList();
			if (!collected.first() || /^0$/.test(collected.first().content)) return;

			// Edit the contact's entry
			newContact = { number: contact.number, name: contact.name, description: collected.first().content };
			await contacts.splice(contacts.indexOf(contact), 1, newContact);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });

			return contactList();
		}

		// if delete
		if (/delete/i.test(collected.first().content.split(" ")[0])) {
			msg.author.busy = false;
			// check for perm & if the contact is legit
			if (!perm) return msg.channel.send({ embed: { color: config.colors.error, title: "Insufficient permission", description: "You need manage server permission to do this." } });

			// Delete the contact's entry
			contacts.splice(contacts.indexOf(contact), 1);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });

			return contactList();
		}

		// if message
		if (/message/i.test(collected.first().content.split(" ")[0])) {
			omsg = await msg.channel.send({ embed: {
				color: config.colors.contacts,
				title: `Messaging`,
				description: `Enter the message you want to sent to ${contact.name}.\nPlease keep it under 400 characters.`,
				footer: {
					text: "(9) to return, (0) to hangup. This call will automatically be hung up after 3 minutes of inactivity",
				},
			} });

			// Create collector
			collected = await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && m.content.length > 0 && m.content.length < 400,
				{ max: 1, time: 180000 },
			);

			// on collection
			if (collected.first() && delPerm) collected.first().delete().catch(e => null);
			omsg.delete().catch(e => null);
			msg.author.busy = false;
			if (/^9$/.test(collected.first().content)) return contactList();
			if (!collected.first() || /^0$/.test(collected.first().content)) return;
			return (await reload("./Commands/Public/message.js"))(client, msg, `${contact.number} ${collected.first().content}`);
		}

		// if only a number
		msg.author.busy = false;
		contact = contacts[parseInt(collected.first().content) - 1];

		// This check is now redundant, but keeping it in
		const contactDoc = await r.table("Numbers").get(contact.number);
		if (!contactDoc) {
			contacts.splice(contacts.indexOf(contact), 1);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });
			return msg.channel.send({ embed: config.colors.error, title: "Registry error", description: "That number no longer exists. It has been deleted from your contacts." });
		} else {
			return require("./call.js")(client, msg, contact.number);
		}
	};
	contactList();
};
