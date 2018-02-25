require("dotenv").config();

const database = require("./Database/database");

database.initialize(process.env.MONGOURL).then(() => {
	console.log("Database initialized!");
	process.emit("go");
}).catch(err => {
	console.log(`Failed to intialize Database`, err);
	process.exit(1);
});

process.once("go", async() => {
	let actionCount = 0;
	let dupes = [];
	const accs = require("./toImport/account.json");
	for (let i of accs) {
		await Accounts.create(new Accounts({
			_id: i.user,
			balance: i.balance,
			dailyClaimed: false,
		}));
		console.log(`Created acc: ${i.user}`);
	}
	const blacklist = require("./toImport/blacklist.json");
	for (let i of blacklist) {
		if (!/^\d{17,19}$/.test(i)) continue;
		await Blacklist.create(new Blacklist({
			_id: i,
			type: "user",
		}));
		console.log(`Blacklisted: ${i}`);
	}

	const mailbox = require("./toImport/mailbox.json");
	for (let i of mailbox) {
		let messages = [];
		for (let m of i.messages) {
			messages.push({
				_id: m.id,
				from: m.from,
				content: m.message,
			});
		}
		await Mailbox.create(new Mailbox({
			_id: i.channel,
			settings: {
				autoreply: i.settings.autoreply,
			},
			messages,
		}));
		console.log(`Imported Mailbox: ${i.channel}`);
	}

	const numbers = require("./toImport/numbers.json");
	for (let i of numbers) {
		let date = new Date(), now = new Date();
		date.setMonth(i.month);
		date.setFullYear(i.year);
		await Numbers.create(new Numbers({
			_id: i.channel,
			number: i.number,
			expiry: date,
			expired: false,
		})).catch(err => {
			console.log(`DUPLICATE MUUUH. ${i.channel} ${i.number}`, err.message);
			dupes.push({
				number: i.number,
				channel: i.channel,
			});
		});
		console.log(`Imported Number: ${i.number}`);
	}

	const phonebook = require("./toImport/phonebook.json");
	for (let i of phonebook) {
		let numDoc;
		try {
			numDoc = await Numbers.findOne({ number: i.number });
			if (!numDoc) throw new Error();
		} catch (err) {
			continue;
		}
		await Phonebook.create(new Phonebook({
			_id: i.number,
			description: i.desc,
			channel: numDoc._id,
		}));
		console.log(`Phonebook registered: ${i.number}`);
	}

	require("fs").writeFileSync("./duplicatedNumbers.json", JSON.stringify(dupes, null, 2));
});
