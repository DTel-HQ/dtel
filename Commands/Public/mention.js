module.exports = async(client, msg, suffix) => {
	const number = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!number || number.id == "08006113835") return;

	// Get/make list of toPing and string
	let toMention = number.mentions ? number.mentions : [];
	let string = `<@${msg.author.id}>`;

	// If removal

	// Don't let the list exceed more than 10 people
	if (toMention.length >= 9) {
		return msg.channel.send({ embed: {
			color: config.colors.error,
			title: "Max mentions reached.",
			description: "To work within practical limits there can't be more than 9 mentions per number.",
			fields: [
				{ name: "Mentions list", value: toMention.length ? toMention.map(m => `${toMention.indexOf(m) + 1}. ${m}`).join(" ") : "Empty" },
			],
			footer: {
				text: ">mention delete [number] to remove someone.",
			},
		} });
	}

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

	msg.channel.send({ embed: {
		color: config.colors.success,
		title: "Success",
		description: `You have been **${removed ? "removed from" : "added to"}** the list of mentions.`,
		fields: [
			{ name: "Mentions list", value: toMention.length ? toMention.map(m => `${toMention.indexOf(m) + 1}. ${m}`).join(" ") : "Empty" },
		],
		footer: {
			text: ">mentions delete [number] to deleta a mention.",
		},
	} });
};
