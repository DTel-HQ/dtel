module.exports = async(client, msg, suffix) => {
	let fromNumber = (await r.table("Numbers").filter({ channel: msg.channel.id }))[0];
	if (!fromNumber) return msg.reply("This channel doesn't have a number.");

	let phonebook = await r.table("Phonebook");
	if (!phonebook[0]) return msg.reply("Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!");

	let toDial,
		expired = true,
		incall = true;

	while (expired && incall) {
		toDial = phonebook[Math.floor(Math.random() * phonebook.length)].id;
		expired = toDial.expiry < new Date();
		incall = Calls.find(c => c.to.number === toDial.id || c.from.number === toDial.id);
	}

	if (!toDial) return msg.reply("It seems like you'll have to wait. All active numbers are in a call.");

	require("./call.js")(client, msg, toDial, true);
};
