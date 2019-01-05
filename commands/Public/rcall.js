module.exports = async(client, msg, suffix) => {
	let phonebook = await r.table("Phonebook").getAll();

	if (!phonebook[0]) return msg.reply("Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!");

	let toDial,
		expired = true;

	while (expired == true) {
		toDial = phonebook[Math.floor(Math.random() * phonebook.length)];
		expired = new Date(toDial.expiry).now() < new Date().now();
	}

	if (!toDial) {
		return msg.reply("Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!");
	} else {
		require("./Commands/call.js")(client, msg, toDial, true);
	}
};
