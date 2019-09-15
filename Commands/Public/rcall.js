module.exports = async(client, msg, suffix) => {
	let fromNumber = await msg.channel.number;
	if (!fromNumber) return msg.channel.send({ embed: { color: config.colors.error, title: "Registry error", description: "This channel does not have a number. Run `>wizard` to create one." } });

	let phonebook = await r.table("Phonebook");
	if (!phonebook[0]) return msg.channel.send({ embed: { color: config.colors.error, title: "Empty book", description: "Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!" } });

	let toDial,
		toCall = false,
		inCall,
		expired,
		self,
		toDialDoc;

	// Make a searching for embed...

	while (!toCall) {
		toDial = phonebook[Math.floor(Math.random() * phonebook.length)];
		if (!toDial) break;
		let call = await r.table("Calls").getAll(toDial.id, { index: "fromChannel" }).nth(0).default(null);
		if (!call) call = await r.table("Calls").getAll(toDial.id, { index: "toChannel" }).nth(0).default(null);
		if (fromNumber.id == toDial.id || call || toDial.guild === msg.guild.id) {
			phonebook.splice(phonebook.indexOf(toDial), 1);
			continue;
		}
		toDialDoc = await r.table("Numbers").get(toDial.id);
		if (new Date(toDialDoc.expiry).getTime() < Date.now()) {
			phonebook.splice(phonebook.indexOf(toDial), 1);
			continue;
		}
		toCall = toDial.id;
	}

	// Change to not found or change to found!
	if (!toDial) return msg.channel.send({ embed: { color: config.colors.info, title: "No number available", description: "It seems like you'll have to wait. All active numbers are in a call." } });

	require("./call.js")(client, msg, toCall, true);
};
