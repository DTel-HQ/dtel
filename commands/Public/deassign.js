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

	// Number deletion
	if (!number) {
		msg.reply("**Number could not be found.**");
	} else {
		number.delete();
		msg.reply("**Number is gone, pay your respects.**");
	}

	// phonebook deletion
	return r.table("Numbers").get(toDeassign).delete()
		.catch(async _ => {
			r.table("Numbers")
				.getAll(toDeassign, { index: "channel" })
				.nth(0)
				.default(null)
				.delete()
				.catch(() => null);
		});
};

