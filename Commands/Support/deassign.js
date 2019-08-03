module.exports = async(client, msg, suffix) => {
	let toDeassign = suffix.split(" ")[0];

	if (!toDeassign) return msg.reply("**Add a number or channel to deassign.**");

	let number = await client.replaceNumber(suffix);

	let numberDoc = await r.table("Numbers").get(toDeassign).default(null);
	if (!numberDoc) {
		if (msg.mentions.channels.first()) toDeassign = msg.mentions.channels.first().id;
		numberDoc = await r.table("Numbers")
			.getAll(toDeassign, { index: "channel" })
			.nth(0)
			.default(null);
	}
	if (!numberDoc) return msg.reply("Number could not be found");

	await r.table("Numbers").get(numberDoc.id).delete();
	await r.table("Phonebook").get(numberDoc.id).delete()
		.catch(e => null);
	await r.table("Mailbox").filter({ channel: numberDoc.channel }).delete()
		.catch(e => null);

	await msg.reply("Number is gone, pay your respects");
	await client.log(`:closed_book: Number \`${numberDoc.id}\` has been deassigned from channel ${numberDoc.channel} by ${msg.author.tag}.`);

	// phonebook deletion
	await r.table("Phonebook").get(numberDoc.id).delete();
};
