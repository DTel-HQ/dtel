module.exports = async(client, msg, suffix) => {
	let toDeassign = suffix.split(" ")[0];

	if (!(await msg.author.getPerms()).support) return;

	if (!toDeassign) return msg.reply("**Add a number or channel to deassign.**");

	let number = client.replaceNumber(suffix);

	let numberDoc = await r.table("Numbers").get(toDeassign).default(null);
	if (!numberDoc) {
		numberDoc = await r.table("Numbers")
			.getAll(toDeassign, { index: "channel" })
			.nth(0)
			.default(null);
	}
	if (!numberDoc) return msg.reply("Number could not be found");

	await r.table("Numbers").get(numberDoc.id).delete();

	msg.reply("Number is gone, pay your respects");
	client.log(`:closed_book: Number \`${numberDoc.id}\` has been deassigned from channel ${numberDoc.channel} by ${msg.author.tag}.`);

	// phonebook deletion
	r.table("Phonebook").get(numberDoc.id).delete();
};
