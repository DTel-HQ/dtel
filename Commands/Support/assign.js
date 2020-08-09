const { numberIsValid } = require("../../Internals/modules");

module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >assign [channelID/number] [number/channelID]" } });

	let channelID, numberInput;
	if (msg.mentions.channels.first()) {
		channelID = msg.mentions.channels.first().id;
		// Genuine offbrand fix
		numberInput = suffix.substring(suffix.indexOf(`${msg.mentions.channels.first().toString()}`) + msg.mentions.channels.first().toString().length + 1).trim();
	// otherwise if they used an id
	} else if (suffix.split(" ")[0].length > 13) {
		channelID = suffix.split(" ")[1];
		numberInput = suffix.split(" ")[0];
	} else {
		channelID = suffix.split(" ")[0];
		numberInput = suffix.split(" ")[1];
	}

	let channel = await client.channels.cache.get(channelID);
	if (!channel) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid channel", description: "Couldn't find that channel." } });
	const number = await numberIsValid(channel, numberInput);
	if (!number) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid number", description: "Make sure it is 11 digits long & has a valid prefix." } });


	let foundNumber;
	foundNumber = await r.table("Numbers").get(number).default(null);
	if (foundNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "That number already exists!" } });
	foundNumber = await r.table("Numbers").getAll(channelID, { index: "channel" }).nth(0)
		.default(null);
	if (foundNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "That channel already has a number!" } });
	const expiryDate = new Date();
	expiryDate.setMonth(expiryDate.getMonth() + 1);

	const numberDoc = {
		id: number,
		channel: channelID,
		expiry: expiryDate,
		createdAt: new Date(),
	};

	if (channel.type == "text") {
		numberDoc.guild = channel.guild.id;
	}

	let newNumber = await r.table("Numbers").insert(numberDoc);

	msg.channel.send({ embed: { color: config.colors.success, title: "Assigned number", description: `Succesfully assigned ${numberDoc.id} to ${numberDoc.channel}.`, author: { name: msg.author.tag, icon_url: msg.author.displayAvatarURL() } } });
	client.log(`:green_book: Number \`${numberDoc.id}\` has been assigned to channel ${numberDoc.channel} by ${msg.author.id}.`);
};
