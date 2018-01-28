const permCheck = require("../modules/permChecker");

module.exports = async(client, msg, suffix) => {
	let perms = await permCheck(client, msg.author.id);
	if (!perms.support) return;
	if (!suffix) return msg.reply("<:b1nzyhyperban:356830174660132864> **Input thy channel id, \\*valid this time!\\***");
	let channel;
	if (/\d{17,19}/.test(suffix)) {
		try {
			channel = await client.api.channels(suffix).get();
		} catch (err) {
			return msg.reply("Not a valid channel.");
		}
	} else if (suffix.length !== 11) {
		return msg.reply("Not a valid number.");
	}
	let result;
	if (channel) {
		try {
			result = await Numbers.findOne({ _id: suffix });
			if (!result) throw new Error();
		} catch (err) {
			return msg.reply("There is no number associated with this channel");
		}
	} else {
		try {
			result = await Numbers.findOne({ number: suffix });
			if (!result) throw new Error();
		} catch (err) {
			return msg.reply("This number is not assigned");
		}
	}
	if (result) {
		const fields = [];
		if (channel) {
			fields.push({
				name: `Channel ID and Name`,
				value: `ID: \`${channel.id}\`\nName: ${channel.name}`,
				inline: true,
			});
			try {
				const guild = await client.api.guilds(channel.guild_id).get();
				console.log(guild);
			} catch (err) {
				//
			}
		} else {
			try {
				// get the channel
				// get the guild
			} catch (err) {
				// shut the fuck up
			}
		}

		fields.push({
			name: `Expires at`,
			value: `${new Date(result.expiry).toISOString()}`,
			inline: true,
		});

		msg.channel.send({
			embed: {
				color: 0x3669FA,
				title: `Information for __${result.number}__`,
				fields,
			},
		});
	}
};
