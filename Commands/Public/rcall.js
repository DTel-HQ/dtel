module.exports = async(client, msg, suffix) => {
	let fromNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!fromNumber) return msg.reply("This channel doesn't have a number.");

	let phonebook = await r.table("Phonebook");
	if (!phonebook[0]) return msg.reply("Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!");

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
		let call = (await r.table("Calls").filter(r.row("from")("number").eq(toDial.id).or(r.row("to")("number").eq(toDial.id))))[0];
		if (fromNumber.id == toDial.id || call) {
			phonebook.splice(phonebook.indexOf(toDial), 1);
			continue;
		}
		toDialDoc = await r.table("Numbers").get(toDial.id);
		if (toDialDoc.expiry < new Date()) {
			phonebook.splice(phonebook.indexOf(toDial), 1);
			continue;
		}
		toCall = toDial.id;
	}

	// Change to not found or change to found!
	if (!toDial) return msg.reply("It seems like you'll have to wait. All active numbers are in a call.");

	require("./call.js")(client, msg, toCall, true);
};
