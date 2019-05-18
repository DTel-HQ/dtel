const { MessageEmbed } = require("discord.js");

module.exports = async(client, msg, suffix) => {
	const myNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!myNumber) return;

	// Get the user's permissions
	let perm = await msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");

	// Get contacts
	let contacts = myNumber.contacts || [];

	// if they want to add a number
	if (/add/i.test(suffix.split(" ")[0])) {
		if (!perm) return msg.reply("You need manage server permissions to do this.");
		if (contacts.length >= 10) msg.reply("You can't have more than 9 contacts (yet)");

		// send embed
		let omsg = await msg.channel.send("", { embed: {
			color: 0x50C878,
			title: "Add a number",
			description: "Please input the number you want to add.",
			footer: {
				text: "Press (0) to hangup. This call will automatically be hung up in 60 seconds.",
			},
		} });

		// make collector
		let getNumber = async() => {
			let collected = await msg.channel.awaitMessages(
				m => m.author.id === msg.author.id && /^0((30\d)|(8(00|44))|(900))\d{7}$/.test(m.content),
				{ max: 1, time: 60000 }
			);

			// on collection
			if (!collected.first() || /^0$/.test(collected.first().content)) return;
			try {
				collected.first().delete();
			} catch (_) { null; }

			// does that number exist?
			const number = await r.table("Numbers").get(collected.first().content);
			if (!number) {
				omsg = await omsg.edit("", { embed: { color: 0x660000, title: "Bad number" } });
				return getNumber();
			}

			// add a description embed
			omsg = await omsg.edit("", { embed: {
				color: 0x50C878,
				title: "Add a description",
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
			omsg.delete();
			if (!collected.first() || /0/.test(collected.first().content)) return;
			try {
				collected.first().delete();
			} catch (_) { null; }

			let contact = { number: number.id, description: collected.first().content };
			contacts.push(contact);
			await r.table("Numbers").get(myNumber.id).update({ contacts: contacts });
		};

		await getNumber();
	}

	// Main contact list
	let contactList = async() => {
		// Standard embed
		const embed = new MessageEmbed()
			.setColor(0x50C878)
			.setTitle("Contacts list")
			.setDescription(`An easy way to store your known DiscordTel numbers.\n\`>contacts add\` to add contacts to the list\n${perm ? "To edit/delete a contact: respond with `(1-10) edit/delete`" : ""}`);
		if (contacts.length) embed.setFooter("Type a number (1-10) to call or (0) to hangup. This call will automatically be hung up in 3 minutes");


		// Add contacts to embed
		for (let contact of contacts) {
			await embed.addField(`${contacts.indexOf(contact) + 1}. ${contact.number}`, contact.description);
		}

		// send the embed
		let omsg = await msg.channel.send("", { embed: embed });
		if (!contacts.length) return;

		// Create collector
		let collected = await msg.channel.awaitMessages(
			m => m.author.id === msg.author.id && (contacts[parseInt(m.content) - 1] || /0/.test(m.content)),
			{ max: 1, time: 180000 }
		);

		try {
			omsg.delete();
		} catch (_) { null;	}
		if (!collected.first() || /0/.test(collected.first().content)) return;
		try {
			collected.first().delete();
		} catch (_) { null;	}

		// Assign contact
		let contact = contacts[collected.first().content.split(" ")[0] - 1];

		// if edit
		if (/edit/.test(collected.first().content.split(" ")[1])) {
			// check for perm & if the contact is legit
			if (!perm) return msg.reply("You need manage server permissions to do this.");

			omsg = await msg.channel.send("", { embed: {
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
		return require("./call.js")(client, msg, contact.number);
	};
	contactList();
};
