module.exports = async(client, msg, suffix) => {
	const number = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!number || number.id == "08006113835") return;

	// Get/make list of toPing and string
	let toMention = number.mentions ? number.mentions : [];
	let string = `<@${msg.author.id}>`;

	// Don't let the list exceed more than 10 people
	if (toMention.length >= 10) return msg.channel.send("", { embed: { color: 0x660000, title: "Max mentions reached.", description: "To work within practical limits there can't be more than 10 mentions per number." } });

	// add or remove ID from list
	let removed;
	if (toMention.includes(string)) {
		toMention.splice(toMention.indexOf(string));
		removed = true;
	} else {
		toMention.push(string);
		removed = false;
	}

	await r.table("Numbers").get(number.id).update({ mentions: toMention });

	msg.channel.send("", { embed: { color: 3447003, title: "Success", description: `You have been **${removed ? "removed from" : "added to"}** the list of mentions.` } });
};
