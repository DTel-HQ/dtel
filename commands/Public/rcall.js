module.exports = async(client, msg, suffix) => {
	let allNumbers = await r.table("Phonebook");

	let toDial,
		expired = true;

	while (expired == true) {
		toDial = allNumbers[Math.floor(Math.random() * allNumbers.length)];
		expired = new Date(toDial.expiresAt).now() < new Date().now();
	}

	if (!toDial) {
		return msg.reply("Seemingly you're using a budget version of the Yellow Pages, there's no numbers in sight!");
	} else {
		require("./Commands/call.js")(client, msg, toDial);
	}
};
