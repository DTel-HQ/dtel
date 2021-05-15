import embeds from "../../configuration/embeds";

module.exports = async(client, msg, suffix) => {
	let perms = msg.guild ? msg.guild.members.cache.get(msg.author.id).hasPermission("MANAGE_MESSAGES") : msg.author.support;

	const number = await msg.channel.number;
	if (!number) return msg.channel.send({ embed: embeds.noNumber });
	if (number.id === config.supportNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Uhhh...", description: "You have the CS role, ypu're already pinged..." } });
	if (msg.channel.type === "dm") return msg.channel.send({ embed: { color: config.colors.info, title: "Bruh", description: "There's no need for this command in DMs... don't you get pinged anyway?" } });

	// Get/make list of toPing and string
	let toMention = number.mentions ? number.mentions : [];
	let userID;

	// Get used ID
	let FDelete = /^delete$/i.test(suffix.split(" ")[0]);

	if (FDelete) {
		if (!perms) return msg.channel.send({ embed: { color: config.colors.error, title: "Unauthorized!", description: `You do not have the \`Manage Messages\` permission.` } });
		if (msg.mentions.users.first()) {
			if (toMention.includes(`<@${msg.mentions.users.first().id}>`)) {
				userID = msg.mentions.users.first();
				toMention.splice(toMention.indexOf(`<@${msg.mentions.users.first().id}>`), 1);
			}	else {
				return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid user", description: "That user isn't on the list." } });
			}
		} else {
			let ID = Number(suffix.split(" ")[1]);
			if (toMention[ID - 1]) {
				userID = toMention[ID - 1].slice(1, toMention[ID - 1].length - 3);
				toMention.splice(ID - 1, 1);
			} else if (toMention.includes(`<@${ID}>`)) {
				userID = ID;
				toMention.splice(toMention.indexOf(`<@${ID}>`), 1);
			}
		}
		if (!userID) return msg.channel.send({ embed: { color: config.colors.error, title: "Could not find this", description: "I need a number, user ID or mention to remove..." } });
	} else if (toMention.includes(`<@${msg.author.id}>`)) {
		FDelete = true;
		userID = msg.author.id;
		toMention.splice(toMention.indexOf(`<@${msg.author.id}>`), 1);
	} else if (toMention.length >= 9) {
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
	}	else {
		userID = msg.author.id;
		toMention.push(`<@${msg.author.id}>`);
	}

	await r.table("Numbers").get(number.id).update({ mentions: toMention });

	msg.channel.send({ embed: {
		color: config.colors.success,
		title: "Success",
		description: `${userID === msg.author.id ? "You have" : `<@${userID}> has`} been **${FDelete ? "removed from" : "added to"}** the list of mentions.`,
		fields: [
			{ name: "Mentions list", value: toMention.length ? toMention.map(m => `${toMention.indexOf(m) + 1}. ${m}`).join(" ") : "Empty" },
		],
		footer: {
			text: "Use >mentions delete [number] to delete a mention.",
		},
	} });
};
