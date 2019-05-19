const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const myNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!myNumber) return;

	// Get the user's permissions
	let perm = await msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");

	// Get contacts
	let contacts = myNumber.contacts || [];

	// Main contact list
	let contactList = async() => {
		// Standard embed
		const embed = new MessageEmbed()
			.setColor(0x50C878)
			.setTitle("Contacts")
			.setDescription(`An easy way to store your known DiscordTel numbers. Their name will also show up when they call.\nTo add a contact: repsond with \`add\`.\n${perm ? "To edit/delete a contact: respond with `(1-10) edit/delete`." : ""}`);
		if (contacts.length) embed.setFooter("Type a number (1-10) to call or (0) to hangup. This call will automatically be hung up in 3 minutes");


		// Add contacts to embed
		for (let contact of contacts) {
			await embed.addField(`${contacts.indexOf(contact) + 1}. ${contact.number}`, contact.description);
		}

		// send the embed
		let omsg = await msg.channel.send({ embed: embed });
		if (!contacts.length) return;

		// Create collector
		let collected = await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && (contacts[parseInt(m.content) - 1] || /^0$|^add$/im.test(m.content)),
			{ max: 1, time: 180000 }
		);

		omsg.delete().catch();
		if (!collected.first() || /0/.test(collected.first().content)) return;
		collected.first().delete().catch();

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
						text: "Press (0) to hangup. This call will automatically be hung up in 60 seconds.",
					},
				} });

				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && /^0$|^0((30\d)|(8(00|44))|(900))\d{7}$/.test(m.content),
					{ max: 1, time: 60000 }
				);

				// on collection
				if (!collected.first() || /^0$/.test(collected.first().content)) return;
				collected.first().delete().catch();

				// does that number exist?
				const number = await r.table("Numbers").get(collected.first().content);
				if (!number) {
					omsg.delete().catch();
					return getNumber(true);
				}

				// add a description embed
				omsg = await omsg.edit("", { embed: {
					color: 0x50C878,
					title: `Add a description for ${number.id}`,
					description: "Please enter a description for the number. (max 100 characters)",
					footer: {
						text: "Press (0) to hangup. This call will automatically be hung up in 3 minutes.",
					},
				} });

				// collector for description
				collected = await msg.channel.awaitMessages(
					m => m.author.id === msg.author.id && (m.content.length > 0 && m.content.length < 100),
					{ max: 1, time: 180000 }
				);

				// on collected
				omsg.delete().catch();
				if (!collected.first() || /0/.test(collected.first().content)) return;
				collected.first().delete().catch();

				contact = { number: number.id, description: collected.first().content };
				contacts.push(contact);
				await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });
				return contactList();
			};

			await getNumber();
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
					text: "(0) to hangup. This call will automatically be hung up in 3 minutes",
				},
			} });

			// Create collector
			collected = await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && m.content.length > 0 && m.content.length < 100,
				{ max: 1, time: 180000 }
			);

			// on collection
			try {
				omsg.delete();
			} catch (_) { null;	}
			if (!collected.first() || /0/.test(collected.first().content)) return;
			try {
				collected.first().delete();
			} catch (_) { null;	}

			// Edit the contact's entry
			let newContact = { number: contact.number, description: collected.first().content };
			await contacts.splice(contacts.indexOf(contact), 1, newContact);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });

			return contactList();
		}

		// if delete
		if (/delete/.test(collected.first().content.split(" ")[1])) {
			// check for perm & if the contact is legit
			if (!perm) return msg.reply("You need manage server permissions to do this.");

			// Delete the contact's entry
			await contacts.splice(contacts.indexOf(contact), 1);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });

			return contactList();
		}

		// if only a number
		return require("./call.js")(client, msg, contact.number);
	};
	contactList();
};
