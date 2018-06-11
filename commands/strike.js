const MessageBuilder = require("../modules/MessageBuilder");
const randomstring = require("randomstring");

module.exports = async(client, msg, suffix) => {
	let perms = await client.permCheck(msg.author.id);
	if (!perms.support) return;

	let id;
	if (msg.mentions.users.first()) {
		id = msg.mentions.users.first().id;
	} else {
		id = msg.content.split(" ")[1].trim();
	}
	let reason = msg.content.split(" ").slice(2).join(" ");

	if (!id) {
		return msg.reply("You forgot a paramater! Syntax: `>strike [offender id] [reason, spaces allowed]`");
	}
	if (!reason) reason == "No reason";

	let resolved, type;
	try {
		if (msg.mentions.users.first()) { resolved = await client.users.fetch(id); }
		type = "user";
	} catch (err) {
		try {
			resolved = await client.api.guilds(id).get();
			type = "guild";
		} catch (err2) {
			return msg.reply("The specified ID could not be resolved!");
		}
	}
	let toStrikePerms;
	if (type == "user") toStrikePerms = await client.permCheck(id);
	if (toStrikePerms.support || toStrikePerms.boss) return msg.reply("I'd rather you didn't strike a staff member.");

	await Strikes.create(new Strikes({
		_id: randomstring.generate({ length: "8", charset: "alphanumeric" }),
		type,
		offender: id,
		reason,
		creator: msg.author.id,
	}));


	let allStrikes = await Strikes.find({ offender: id });
	if (allStrikes.length >= 3) {
		Blacklist.create(new Blacklist({ _id: id, type }));
		await client.apiSend(`:hammer: ID \`${id}\` is striked by ${msg.author.username}. (3 Strikes)`, process.env.LOGSCHANNEL);
		return msg.channel.send({
			embed: {
				color: 0x00FF00,
				title: `:white_check_mark: Success!`,
				description: `ID: ${id} has been striked with the reason: ${reason}`,
				footer: {
					text: `They now have ${allStrikes.length} strikes. They have been blacklisted.`,
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
				text: `They now have ${allStrikes.length} strikes.`,
			},
		},
	});
};
