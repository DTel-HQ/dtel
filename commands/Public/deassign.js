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

	r.table("Numbers").get(toDeassign).delete()
		.then(async result => {
			if (result.deleted == 0) {
				r.table("Numbers").filter({ channel: toDeassign }).delete()
					.then(async result => {
						if (result.deleted == 0) {
							return msg.reply("Number could not be found");
						}
					});
			}
		});

	msg.reply("Number is gone, pay your respects");
	client.apiSend(`:closed_book: Number \`${number.id}\` has been deassigned from channel ${number.channel} by ${msg.author.tag}.`, config.logsChannel);

	// phonebook deletion
	return r.table("Phonebook").get(toDeassign).delete()
		.then(async result => {
			if (result.deleted == 0) {
				r.table("Phonebook").filter({ channel: toDeassign }).delete();
			}
		});
};
