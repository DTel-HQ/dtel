module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >rmstrike [strikeID]" } });

	let strikeID = suffix.split(" ")[0];
	let strike = await r.table("Strikes").get(strikeID);

	if (!strike) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid ID", description: "How'd you get the ID wrong mate?" } });

	if (strike.offender === msg.author.id) return msg.channel.send(`>fire ${msg.author.tag}`);
	let offender = strike.user ? await client.users.fetch(strike.offender) : null;
	if (offender && offender.support && !(msg.author.boss || msg.author.manager)) return msg.channel.send({ embed: { color: config.colors.error, title: "Nice try dumbo", description: "You can't remove strikes from a colleague." } });

	await r.table("Strikes").get(strikeID).delete();
	await client.log(`:sun_with_face: Strike \`${strikeID}\` was deleted by ${msg.author.tag}`);

	await msg.channel.send({ embed: { color: config.colors.success, title: `Removed!`, description: `Succesfully removed strike \`${strikeID}\`` } });

	if (!offender) return;

	let totalStrikes = (await r.table("Strikes").getAll(strike.offender, { index: "offender" }).default([])).length;

	await (await client.users.cache.get(strike.offender).createDM()).send({ embed: { color: config.colors.info, title: "A strike has been removed", description: `A customer support agent removed strike \`${strikeID}\` from your strikes. You now have ${totalStrikes} strike(s) and need ${3 - totalStrikes} more to get blacklisted.` } });
};
