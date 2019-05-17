module.exports = async(client, msg, suffix) => {
	if (!(await msg.author.getPerms()).support) return;
	if (!suffix) return msg.reply("Where is the ID?!?!");

	let strikeID = suffix.split(" ")[0];
	let strike = await r.table("Strikes").get(strikeID);

	if (!strike) return msg.reply("There is no strike with this ID");

	if (strike.offender == msg.author.id) return msg.reply("**DO YOU WANT ANOTHER STRIKE?**");
	let offender = strike.user ? await client.users.fetch(strike.offender) : null;
	if (offender.getPerms().support && !(msg.author.getPerms().boss || msg.author.getPerms().manager)) return msg.reply("You can't remove strikes from a colleague.");

	await r.table("Strikes").get(strikeID).delete();

	await msg.reply(`Succesfully removed strike \`${strikeID}\``);

	if (!offender) return;

	let totalStrikes = (await r.table("Strikes").filter({ offender: strike.offender })).length;

	await client.users.get(strike.offender).send(`A customer support agent removed strike \`${strikeID}\` from your strikes. You now have ${totalStrikes} strike(s) and need ${3 - totalStrikes} more to get blacklisted.`);
};
