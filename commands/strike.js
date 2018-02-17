const permCheck = require("../modules/permChecker");
const MessageBuilder = require("../modules/MessageBuilder");
const randomstring = require("randomstring");

module.exports = async(client, msg, suffix) => {
	let perms = await permCheck(msg.author.id);
	if (!perms.support) return;

	let id = suffix.substring(0, suffix.indexOf("|")).trim();
	let reason = suffix.substring(suffix.indexOf("|") + 1).trim();

	if (!reason) reason == "No reason";
	if (!id) {
		return msg.reply("You forgot a paramater! Synthax: `>strike [offender id] | [reason]`");
	}

	let resolved, type;
	try {
		resolved = await client.users.fetch(id);
		type = "user";
	} catch (err) {
		try {
			resolved = await client.api.guilds(id).fetch();
			type = "guild";
		} catch (err2) {
			return msg.reply("The specified ID could not be resolved!");
		}
	}
	let toStrikePerms;
	if (type == "user") toStrikePerms = await permCheck(id);
	if (toStrikePerms.support || toStrikePerms.boss) return msg.reply("I'd rather you didn't strike a staff member.");

	await Strikes.create(new Strikes({
		_id: randomstring.generate({ length: "8", charset: "alphanumeric" }),
		type,
		offender: id,
		reason,
		creator: msg.author.id,
	}));


	let allStrikes = await Strikes.find({ offender: id });
	if (allStrikes.count >= 3) {
		Blacklist.create(new Blacklist({ _id: id, type }));
		client.api.channels(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
			content: `:hammer: ID \`${id}\` is striked by ${msg.author.username}. They now have ${allStrikes.count}`,
		}));
		return msg.channel.send({
			embed: {
				color: 0x00FF00,
				title: `:white_check_mark: Success!`,
				description: `ID: ${id} has been striked with the reason: ${reason}`,
				footer: {
					text: `They now have ${allStrikes.count} strikes. They have been blacklisted.`,
				},
			},
		});
	}
	msg.channel.send({
		embed: {
			color: 0x00FF00,
			title: `:white_check_mark: Success!`,
			description: `ID: ${id} has been striked with the reason: ${reason}`,
			footer: {
				text: `They now have ${allStrikes.count} strikes.`,
			},
		},
	});
};
