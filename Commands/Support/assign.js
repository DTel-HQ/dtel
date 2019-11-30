module.exports = async(client, msg, suffix) => {
	if (!suffix) return msg.channel.send({ embed: { color: config.colors.info, title: "Command usage", description: "Syntax: >assign [channelID/number] [number/channelID]" } });

	let channelID, number;
	if (msg.mentions.channels.first()) {
		channelID = msg.mentions.channels.first().id;
		// Genuine offbrand fix
		number = suffix.substring(suffix.indexOf(`${msg.mentions.channels.first().toString()}`) + msg.mentions.channels.first().toString().length + 1).trim();
	// otherwise if they used an id
	} else if (/\d{7,13}$/.test(await client.replaceNumber(suffix.split(" ")[0]))) {
		channelID = suffix.split(" ")[1];
		number = await client.replaceNumber(suffix.split(" ")[0]);
	} else {
		channelID = suffix.split(" ")[0];
		number = await client.replaceNumber(suffix.split(" ")[1]);
	}

	if (!/^0(900|30\d|8(00|44))\d{7}$/.test(number)) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid number", description: "**Is this a valid 11-digit number?** Course not, you dumbass" } });
	let channel = await client.channels.get(channelID);
	if (!channel) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid channel", description: "Couldn't find that channel." } });

	number = client.replaceNumber(number);

	if (channel.type == "dm" && !/^0(900|8(00|44))\d{7}$/.test(number)) return msg.channel.send({ embed: { color: config.colors.error, title: "Invalid prefix", description: "**Don't you know what prefix a dm channel has?** It's `0900`." } });

	let foundNumber;
	foundNumber = await r.table("Numbers").get(number).default(null);
	if (foundNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "That number is already in use!" } });
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
	client.log(`:green_book: Number \`${numberDoc.id}\` has been assigned to channel ${numberDoc.channel} by ${msg.author.tag}.`);
};
