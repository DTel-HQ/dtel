import embeds from "../../configuration/embeds";

module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "To (un)block a number: >block [number]" } });

	// Help users a bit by removing spaces & '-'
	let myNumber = await msg.channel.number;
	if (!myNumber) return msg.channel.send({ embed: embeds.noNumber });

	// Need permission and can't block special numbers
	let perm = msg.channel.type === "dm" ? true : await msg.guild.members.cache.get(msg.author.id).hasPermission("MANAGE_GUILD");
	if (!perm) perm = msg.author.support;
	if (!perm) return msg.channel.send({ embed: { color: config.colors.error, title: "No permission", description: "You need to have the `MANAGE_GUILD` permission or higher to execute this command." } });
	if (!suffix.match(/^0[39]0\d{8}$/) && !suffix.match(/^\d{17-19}$/)) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid number", description: "Invalid or special number. You can't block special numbers. Please report any abuse by calling `*611`" } });

	let number = await r.table("Numbers").getAll(suffix, { index: "channel" }).nth(0).default(null);
	let toBlock = await client.replaceNumber(suffix);
	if (!number) number = await r.table("Numbers").get(toBlock);
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Unknown number", description: "That number does not seem to exist or the channel has no number." } });
	if (!myNumber.id === number.id) return msg.channel.send({ embed: { color: config.colors.error, title: "Blocking yourself?", description: "What is that going to do? Report yourself by calling *611" } });

	const toBlockID = number.guild ? number.guild : number.owner;

	// Stuff
	let blocked = myNumber.blocked || [];
	let index = blocked.indexOf(toBlockID);
	let deprecated = false;
	if (index == -1) {
		index = blocked.indexOf(toBlock);
		if (index > -1) deprecated = true;
	}

	if (index > -1) {
		blocked.splice(index, 1);
		if (!blocked.length) {
			delete myNumber.blocked;
			await r.table("Numbers").get(myNumber.id).replace(myNumber);
		} else {
			await r.table("Numbers").get(myNumber.id).update({ blocked: blocked });
		}
		if (deprecated) await msg.channel.send({ embed: { color: config.colors.success, title: "Unblocked", description: `${toBlock} has been unblocked.` } });
		else await msg.channel.send({ embed: { color: config.colors.success, title: "Unblocked", description: `${number.guild ? `Guild ${toBlockID}` : `User ${toBlockID}`} has been unblocked.` } });
		await client.log(`:name_badge: Number ${toBlock} (${toBlockID}) has been unblocked by ${myNumber.channel}.`);
	} else {
		blocked.push(toBlockID);
		await r.table("Numbers").get(myNumber.id).update({ blocked: blocked });
		await msg.channel.send({ embed: { color: config.colors.error, title: "Blocked", description: `${number.guild ? `Guild ${toBlockID}` : `User ${toBlockID}`} has been blocked, please report any abuse by calling \`*611\``, footer: { text: "To unblock, run the same command again." } } });
		await client.log(`:no_entry: Number ${toBlock} (${toBlockID}) has been blocked by ${myNumber.channel}.`);
	}
};
