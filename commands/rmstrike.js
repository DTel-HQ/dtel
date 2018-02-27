const MessageBuilder = require("../modules/MessageBuilder");

module.exports = async(client, msg, suffix) => {
	let perms = await client.permCheck(msg.author.id);
	if (!perms.support) return;

	if (!suffix) return msg.reply("You forgot the strike id!");
	let strikeDoc;
	try {
		strikeDoc = await Strikes.findOne({ _id: suffix });
		if (!strikeDoc) throw new Error();
	} catch (err) {
		return msg.reply("That strike doesn't exist!");
	}

	await strikeDoc.remove();
	let allStrikes = await Strikes.find({ offender: strikeDoc.offender });

	let blacklistEntry, removed;
	if (allStrikes.size == 2) {
		try {
			blacklistEntry = await Blacklist.findOne({ _id: strikeDoc.offender });
			if (!blacklistEntry) return null;
			if (blacklistEntry) blacklistEntry.remove();
			removed = true;
		} catch (err) {
			// ignore
		}
	}

	if (removed) {
		msg.channel.send({
			embed: {
				color: 0x00FF00,
				title: ":white_check_mark: Success!",
				description: `Strike ID: \`${suffix}\` has been removed.`,
				footer: {
					text: `They now have ${allStrikes.size} strikes. They have been removed from the blacklist.`,
				},
			},
		});
		await client.apiSend(`:wrench: ID \`${suffix}\` has strike removed by ${msg.author.username}. They have been removed from the blacklist.`, process.env.LOGSCHANNEL);
	} else {
		msg.channel.send({
			embed: {
				color: 0x00FF00,
				title: ":white_check_mark: Success!",
				description: `Strike ID: \`${suffix}\` has been removed.`,
				footer: {
					text: `They now have ${allStrikes.size} strikes.`,
				},
			},
		});
		await client.apiSend(`:wrench: ID \`${suffix}\` has strike removed by ${msg.author.username}.`, process.env.LOGSCHANNEL);
	}
};
