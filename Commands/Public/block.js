module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.error, title: "Command usage", description: "To (un)block a number: >block [number]" } });

	// Help users a bit by removing spaces & '-'
	let myNumber = await msg.channel.number;
	if (!myNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "No number", description: "This channel does not have a number." } });

	// Need permission and can't block special numbers
	let perm = await msg.guild.members.get(msg.author.id).hasPermission("MANAGE_GUILD");
	if (!perm) perm = msg.author.support;
	if (!perm) return msg.channel.send({ embed: { color: config.colors.error, title: "No permission", description: "You need to have the `MANAGE_GUILD` permission or higher to execute this command." } });
	if (!suffix.match(/^0[39]0\d{8}$/) && !suffix.match(/^\d{17-19}$/)) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid number", description: "Invalid or special number. You can't block special numbers. Please report any abuse by calling `*611`" } });

	let number = await r.table("Numbers").getAll(suffix, { index: "channel" }).nth(0).default(null);
	let toBlock = client.replaceNumber(suffix);
	if (!number) number = await r.table("Numbers").get(toBlock);
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown number", description: "That number does not seem to exist." } });
	if (!myNumber.id === number.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Blocking yourself?", description: "What is that going to do? Report yourself by calling *611" } });

	// Stuff
	let blocked = myNumber.blocked || [];
	let index = blocked.indexOf(toBlock);
	if (index > -1) {
		blocked.splice(index, 1);
		if (!blocked.length) {
			delete myNumber.blocked;
			await r.table("Numbers").get(myNumber.id).replace(myNumber);
		} else {
			await r.table("Numbers").get(myNumber.id).update({ blocked: blocked });
		}
		await msg.channel.send({ embed: { color: config.colors.success, title: "Unblocked", description: `${toBlock} has been unblocked.` } });
		await client.log(`:name_badge: Number ${toBlock} has been unblocked by ${myNumber.channel}.`);
	} else {
		blocked.push(toBlock);
		await r.table("Numbers").get(myNumber.id).update({ blocked: blocked });
		await msg.channel.send({ embed: { color: config.colors.error, title: "Blocked", description: `${toBlock} has been blocked, please report any abuse by calling \`*611\`` } });
		await client.log(`:no_entry: Number ${toBlock} has been blocked by ${myNumber.channel}.`);
	}
};
