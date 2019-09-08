module.exports = async(client, msg, suffix) => {
	let toDeassign = suffix.split(" ")[0];

	if (!toDeassign) return msg.reply({ embed: { color: config.colors.info, title: "Where?", description: "Select a channel/number to deassign." } });

	let number = await client.replaceNumber(suffix);

	let numberDoc = await r.table("Numbers").get(number).default(null);
	if (!numberDoc) {
		if (msg.mentions.channels.first()) toDeassign = msg.mentions.channels.first().id;
		numberDoc = await r.table("Numbers")
			.getAll(toDeassign, { index: "channel" })
			.nth(0)
			.default(null);
	}
	if (!numberDoc) return msg.reply({ embed: { color: config.colors.error, title: "Huh?", description: "That number/channel could not be found." } });

	await r.table("Numbers").get(numberDoc.id).delete();
	await r.table("Phonebook").get(numberDoc.id).delete()
		.catch(e => null);
	await r.table("Mailbox").filter({ channel: numberDoc.channel }).delete()
		.catch(e => null);

	await msg.reply({ embed: { color: config.colors.success, title: "Bye... :(", description: "The number was deassigned." } });
	await client.log({ embed: { color: config.colors.info, title: "Deassignment", description: `:closed_book: Number \`${numberDoc.id}\` has been deassigned from channel ${numberDoc.channel} by ${msg.author.tag}.` } });

	// phonebook deletion
	await r.table("Phonebook").get(numberDoc.id).delete();
};
