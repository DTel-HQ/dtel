module.exports = async(client, msg, suffix) => {
	// Check arguments of command
	let from = suffix.split(" ")[0];
	let to = suffix.split(" ")[1];
	if (!from || !to) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: ">reassign [from number/channel] [to number/channel]\n\nNote: You can not mention a channel, use the ID." } });

	// Get the FROM number
	let numberDoc = await r.table("Numbers").getAll(from, { index: "channel" }).nth(0).default(null);
	if (!numberDoc) {
		from = client.replaceNumber(from);
		numberDoc = await r.table("Numbers").get(from);
	}
	if (!numberDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Bad number", description: "Couldn't find the given number." } });

	// Check if the number is VIP
	let numbervip = numberDoc.vip ? new Date(numberDoc.vip.expiry).getTime() > Date.now() : false;
	if (!numbervip && !config.maintainers.includes(msg.author.id)) return msg.channel.send({ embed: { color: config.colors.error, title: "Not VIP", description: "That number is not currently a VIP number." } });

	// New number or channel?
	let newNumberDoc = await r.table("Numbers").get(to);
	let toChannel = await client.api.channels(to).get().catch(e => null);
	let newNumber = client.replaceNumber(to);
	if (!toChannel) {
		// It's not a channel → check for correct number and it's availability
		if (newNumberDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Duplicate number", description: "That number already exists" } });
		let prefix = numberDoc.guild ? "0[38]0\\d" : "0[89]00";
		let regex = new RegExp(`^${prefix}\\d{7}$`);
		if (!regex.test(newNumber)) return msg.channel.send({ embed: { color: config.colors.error, title: "Bad number", description: "Please make sure to enter a correct new number" } });
	} else {
		let toChannelDoc = await r.table("Numbers").getAll(toChannel.id, { index: "channel" }).nth(0).default(null);
		if (toChannelDoc) return msg.channel.send({ embed: { color: config.colors.error, title: "Channel taken", description: "The new channel already has a number." } });
	}

	// Send working on embed
	let omsg = await msg.channel.send({ embed: { color: config.colors.info, title: "Working...", description: "Please wait whilst we're reassigning the number." } });

	// Change the numberDoc
	await r.table("Numbers").get(numberDoc.id).delete();
	newNumberDoc = numberDoc;
	toChannel ? newNumberDoc.channel = toChannel.id : newNumberDoc.id = newNumber;
	await r.table("Numbers").insert(newNumberDoc);

	// Change phonebook listing - Doesn't need changing channel
	let phonebook = await r.table("Phonebook").get(numberDoc.id);
	if (phonebook && !toChannel) {
		await r.table("Phonebook").get(numberDoc.id).delete();
		phonebook.id = newNumberDoc.id;
		await r.table("Phonebook").insert(phonebook);
	}

	// Take mailbox with - Doesn't need changing number
	let mailbox = await r.table("Mailbox").get(numberDoc.channel);
	if (mailbox && toChannel) {
		await r.table("Mailbox").get(numberDoc.channel).delete();
		mailbox.id = newNumberDoc.channel;
		await r.table("Mailbox").insert(mailbox);
	}

	// Edit embed
	omsg = await omsg.edit({ embed: { color: config.colors.success, title: "Success!", description: "The number, phonebook and mailbox listings have been reassigned!" } }).catch(e => msg.channel.send({ embed: { color: config.colors.success, title: "Success!", description: "The number, phonebook and mailbox listings have been reassigned!" } }));
	client.log(`:orange_book: Number ${numbervip ? newNumberDoc.vip.hidden ? "hidden" : newNumberDoc.id : newNumberDoc.id} has been reassigned to ${toChannel ? numbervip ? newNumberDoc.vip.hidden ? "" : "channel " : "channel " : ""}${numbervip ? newNumberDoc.vip.hidden ? "hidden" : toChannel ? newNumberDoc.channel : newNumberDoc.id : toChannel ? newNumberDoc.channel : newNumberDoc.id} by ${msg.author.tag}`);
};
