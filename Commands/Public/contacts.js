const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const myNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!myNumber) return;

	// Get the user's permissions
	let perm = await msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");
	if (!perm) perm = (await msg.author.getPerms()).support;

	// Get contacts
	let contacts = myNumber.contacts || [];

	// Main contact list
	let contactList = async() => {
		// Standard embed
		const embed = new MessageEmbed()
			.setColor(0x50C878)
			.setTitle("Contacts")
			.setDescription(`An easy way to store your known DiscordTel numbers. Their name will also show up when they call.\nTo add a contact: repsond with \`add\`.\n${perm && contacts.length ? "To edit/delete a contact: respond with `(1-10) edit/delete`." : ""}`);
		if (contacts.length) embed.setFooter("Type a number (1-10) to call or (0) to hangup. This call will automatically be hung up after 2 minutes of inactivity.");
		else embed.setFooter("Press (0) to hangup. This call will automatically be hung up after 2 minutes of inactivity.");

		// Add contacts to embed
		for (let contact of contacts) {
			await embed.addField(`${contacts.indexOf(contact) + 1}. ${contact.number} - ${contact.name}`, contact.description);
		}

		// send the embed
		let omsg = await msg.channel.send({ embed: embed });

		// Create collector
		Busy.create({ id: msg.author.id });
		let collected = await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && (contacts[parseInt(m.content) - 1] || /^0$|^add$/im.test(m.content)),
			{ max: 1, time: 120000 }
		);

		// On collection
		omsg.delete().catch(e => null);
		if (collected.first()) collected.first().delete().catch(e => null);
		if (!collected.first() || /^0$/.test(collected.first().content)) return Busy.newGet(msg.author.id).delete();

		// if they want to add a number
		if (/add/.test(collected.first().content)) {
			let getNumber = async bad => {
				if (!perm) return msg.reply("You need manage server permissions to do this.");
				if (contacts.length >= 10) msg.reply("You can't have more than 9 contacts (yet)");

				// send embed
				omsg = await msg.channel.send({ embed: {
					color: 0x50C878,
					title: bad ? "Non existant number. " : "Add a number.",
					description: "Please input the number you want to add.",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up after 60 seconds of inactivity.",
					},
				} });

				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^0$|^0((30\d)|(8(00|44))|(900))\d{7}$/.test(m.content),
					{ max: 1, time: 60000 }
				);

				// on collection
				if (collected.first()) collected.first().delete().catch(e => null);
				if (!collected.first() || /^0$/.test(collected.first().content)) {
					Busy.newGet(msg.author.id).delete();
					omsg.delete().catch(e => null);
					return;
				}

				// does that number exist?
				const number = await r.table("Numbers").get(collected.first().content);
				if (!number) {
					omsg.delete().catch(e => null);
					return getNumber(true);
				}

				// add a name embed
				omsg = await omsg.edit("", { embed: {
					color: 0x50C878,
					title: `Add a name for ${number.id}`,
					description: "Please enter a name for the number. (max 30 characters)",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up after 1 minutes of inactivity.",
					},
				} });

				// collector for name
				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 0 && m.content.length < 31),
					{ max: 1, time: 60000 }
				);

				// on collected
				if (collected.firsT()) collected.first().delete().catch(e => null);
				if (!collected.first() || /^0$/.test(collected.first().content)) {
					Busy.newGet(msg.author.id).delete();
					omsg.delete().catch(e => null);
					return;
				}
				let name = collected.first().content;

				// add a description embed
				omsg = await omsg.edit("", { embed: {
					color: 0x50C878,
					title: `Add a description for ${number.id}`,
					description: "Please enter a description for the number. (max 100 characters)",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up after 3 minutes of inactivity.",
					},
				} });

				// collector for description
				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 0 && m.content.length < 101),
					{ max: 1, time: 180000 }
				);

				// on collected
				if (collected.first()) collected.first().delete().catch(e => null);
				omsg.delete().catch(e => null);
				if (!collected.first() || /^0$/.test(collected.first().content)) {
					Busy.newGet(msg.author.id).delete();
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
		let contact = contacts[parseInt(collected.first().content.split(" ")[0]) - 1];

		// if edit
		if (/edit/.test(collected.first().content.split(" ")[1])) {
			// check for perm & if the contact is legit
			if (!perm) return msg.reply("You need manage server permissions to do this.");

			omsg = await msg.channel.send({ embed: {
				color: 0x50C878,
				title: `Editing ${contact.number}`,
				description: "Enter a new description for the contact. (max 100 characters)",
				footer: {
					text: "(0) to hangup. This call will automatically be hung up after 3 minutes of inactivity",
				},
			} });

			// Create collector
			collected = await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && m.content.length > 0 && m.content.length < 100,
				{ max: 1, time: 180000 }
			);

			// on collection
			if (collected.first()) collected.first().delete().catch(e => null);
			omsg.delete().catch(e => null);
			Busy.newGet(msg.author.id).delete();
			if (!collected.first() || /^0$/.test(collected.first().content)) return;

			// Edit the contact's entry
			let newContact = { number: contact.number, description: collected.first().content };
			await contacts.splice(contacts.indexOf(contact), 1, newContact);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });

			return contactList();
		}

		// if delete
		if (/delete/.test(collected.first().content.split(" ")[1])) {
			Busy.newGet(msg.author.id).delete();
			// check for perm & if the contact is legit
			if (!perm) return msg.reply("You need manage server permissions to do this.");

			// Delete the contact's entry
			await contacts.splice(contacts.indexOf(contact), 1);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });

			return contactList();
		}

		// if only a number
		Busy.newGet(msg.author.id).delete();
		return require("./call.js")(client, msg, contact.number);
	};
	contactList();
};
