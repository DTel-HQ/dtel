module.exports = async(client, msg, suffix) => {
	let toDeassign = suffix.split(" ")[0];

	if (!(await msg.author.getPerms()).support) return;

	if (!toDeassign) return msg.reply("**Add a number or channel to deassign.**");

	let number = await r.table("Numbers").get(toDeassign).default(null);
	if (!number) {
		number = await r.table("Numbers")
			.getAll(toDeassign, { index: "channel" })
			.nth(0)
			.default(null);
	}

	let result = await r.table("Numbers").get(toDeassign).delete();
	if (result.deleted != 1) {
		result = await r.table("Numbers").filter({ channel: toDeassign }).delete();
		if (result.deleted != 1) {
			return msg.reply("Number could not be found");
		}
	}

	msg.reply("Number is gone, pay your respects");
	client.log(`:closed_book: Number \`${number.id}\` has been deassigned from channel ${number.channel} by ${msg.author.tag}.`);

	// phonebook deletion
	result = await r.table("Phonebook").get(toDeassign).delete();
	if (result.deleted != 1) {
		r.table("Phonebook").filter({ channel: toDeassign }).delete();
	}
};
