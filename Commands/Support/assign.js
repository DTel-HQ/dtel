module.exports = async(client, msg, suffix) => {
	let channelID, number;
	if (msg.mentions.channels.first()) {
		channelID = msg.mentions.channels.first().id;
		// Genuine offbrand fix
		number = suffix.substring(suffix.indexOf(`${msg.mentions.channels.first().toString()}`) + msg.mentions.channels.first().toString().length + 1).trim();
	// otherwise if they used an id
	} else if (/^0(900|30\d|8(00|44))\d{7}$/.test(await client.replaceNumber(suffix.split(" ")[0]))) {
		channelID = suffix.split(" ")[1];
		number = await client.replaceNumber(suffix.split(" ")[0]);
	} else {
		channelID = suffix.split(" ")[0];
		number = await client.replaceNumber(suffix.split(" ")[1]);
	}

	let channel = await client.channels.get(channelID);
	if (!channel) return msg.reply("<:Monocle:366036726449438731> **That channel is nowhere to be found.** Syntax: `>assign (channel ID) (number)` ");

	if (!suffix) return msg.reply("<:bloblul:356789385875816448> **Hey, I think you forgot two parameters!** Syntax: `>assign (channel ID) (number)`");
	number = client.replaceNumber(number);

	if (!/^0(900|30\d|8(00|44))\d{7}$/.test(number)) {
		return msg.reply("<:thonkku:356833797804916737> **Is this a valid 11-digit number?** Course not, you dumbass");
	}
	if (channel.type == "dm" && !/^0(900|8(00|44))\d{7}$/.test(number)) {
		return msg.reply("**Don't you know what prefix a dm channel has?** It's `0900`.");
	}

	let foundNumber;
	foundNumber = await r.table("Numbers").get(number).default(null);
	if (foundNumber) return msg.reply("<:francis:327464171211849728> **This number is already registered:tm:!**");
	foundNumber = await r.table("Numbers").getAll(channelID, { index: "channel" }).nth(0)
		.default(null);
	if (foundNumber) return msg.reply("<:francis:327464171211849728> **There is already a number in this channel!**");
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

	msg.reply("Done. Now turn back to your client!");
	client.log(`:green_book: Number \`${numberDoc.id}\` is assigned to channel ${numberDoc.channel} by ${msg.author.tag}.`);
};
