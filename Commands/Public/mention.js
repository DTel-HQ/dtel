module.exports = async(client, msg, suffix) => {
	
	let perms = msg.guild ? msg.guild.members.get(msg.author.id).hasPermission("MANAGE_MESSAGES") : msg.author.support;

	const number = await msg.channel.number;
	if (!number || number.id === config.supportNumber) return;
	if (msg.channel.type === "dm") return msg.channel.send({ embed: { color: config.colors.info, title: "Bruh", description: "There's no need for this command in DMs... Don't you get pinged anyway?" } });

	// Get/make list of toPing and string
	let toMention = number.mentions ? number.mentions : [];

	// Get used ID
	let FDelete = /^delete$/i.test(suffix.split(" ")[0]);
	let userID = FDelete ? msg.mentions.users.first() ? msg.mentions.users.first() : suffix.split(" ")[1] : msg.author.id;
	if (!userID) return msg.channel.send({ embed: { color: config.colors.error, title: "No user", description: `Couldn't find a user to delete\nSyntax: \`${msg.content.split(" ")[0]} delete [userID/mention]\`` } });
	if (!perms && FDelete) return msg.channel.send({ embed: { color: config.colors.error, title: "Unauthorized!", description: `You do not have \`Manage Messages\` permission.` } });
	
	let string = `<@${userID}>`;
	if (FDelete && !toMention.includes(string)) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid user", description: "That user isn't on the list." } });

	// Don't let the list exceed more than 10 people
	if (toMention.length >= 9 && !toMention.includes(string)) {
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
		toMention.splice(toMention.indexOf(string), 1);
		removed = true;
	} else {
		toMention.push(string);
		removed = false;
	}

	await r.table("Numbers").get(number.id).update({ mentions: toMention });

	msg.channel.send({ embed: {
		color: config.colors.success,
		title: "Success",
		description: `${userID === msg.author.id ? "You have" : `${userID} has`} been **${removed ? "removed from" : "added to"}** the list of mentions.`,
		fields: [
			{ name: "Mentions list", value: toMention.length ? toMention.map(m => `${toMention.indexOf(m) + 1}. ${m}`).join(" ") : "Empty" },
		],
		footer: {
			text: ">mentions delete [number] to delete a mention.",
		},
	} });
};
