const fs = require("fs");
const d = new Date();
var fouroneone = JSON.parse(fs.readFileSync("./json/fouroneone.json", "utf8"));
var numbers = JSON.parse(fs.readFileSync("./json/numbers.json", "utf8"));
let nextmonth = d.getMonth() + 1;
let year = d.getFullYear();
let realMonth = nextmonth + 1;

module.exports = async(bot, message) => {
	if (nextmonth == 12) {
		nextmonth = 1;
		year += 1;
	}
	if (realMonth == 13) {
		realMonth = 1;
	}
	if (realMonth == 1 || realMonth == 2 || realMonth == 3 || realMonth == 4 || realMonth == 5 || realMonth == 6 || realMonth == 7 || realMonth == 8 || realMonth == 9) {
		realMonth = 0 + realMonth;
	}
	let ffoDocument = fouroneone.find(i => i.user === message.author.id);
	if (ffoDocument.status == 1) {
		console.log("event 1 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 2) {
		console.log("event 2 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 3) {
		console.log("event 3 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 4) {
		console.log("event 4 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 5) {
		if (message.content === "0") {
			message.reply("Exiting wizard...");
			fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
			fs.writeFileSync("./json/fouroneone.json", JSON.stringify(fouroneone), "utf8");
			return;
		}
		if (message.content.startsWith("0301")) {
			let number = message.content.replace(/(a|b|c)/ig, "2")
				.replace(/(d|e|f)/ig, "3")
				.replace(/(g|h|i)/ig, "4")
				.replace(/(j|k|l)/ig, "5")
				.replace(/(m|n|o)/ig, "6")
				.replace(/(p|q|r|s)/ig, "7")
				.replace(/(t|u|v)/ig, "8")
				.replace(/(w|x|y|z)/ig, "9")
				.replace(/-/ig, "")
				.replace("(", "")
				.replace(")", "")
				.replace(" ", "");
			if (number.length !== 11) {
				message.reply("I don't understand. Please retype the number. Make sure the number starts with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit.");
			} else {
				numbers.push({ channel: message.channel.id, number: number, month: nextmonth, year: year });
				fs.writeFileSync("./json/numbers.json", JSON.stringify(numbers), "utf8");
				fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
				fs.writeFileSync("./json/fouroneone.json", JSON.stringify(fouroneone), "utf8");
				message.channel.send({
					embed: {
						color: 0x007FFF,
						title: "Done!",
						description: "Here's your service information. Should you have any questions, don't hesitate to dial `*611`.",
						fields: [{
							name: "Number",
							value: number,
						},
						{
							name: "Expiration",
							value: `${year}/${realMonth}`,
						}],
						footer: {
							text: "You can register in the phonebook (*411) to receive random calls. To do so, dial *411 and press 3. You have finished the wizard.",
						},
					},
				});
			}
		} else {
			message.reply("I don't understand. Please retype the number. The number **must** start with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit");
		}
	} else if (ffoDocument.status == 6) {
		if (message.content === "0") {
			message.reply("Exiting wizard...");
			fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
			fs.writeFileSync("./json/fouroneone.json", JSON.stringify(fouroneone), "utf8");
			return;
		}
		if (message.content.startsWith("0900")) {
			message.content = message.content.toLowerCase();
			let number = message.content.replace(/(a|b|c)/ig, "2")
				.replace(/(d|e|f)/ig, "3")
				.replace(/(g|h|i)/ig, "4")
				.replace(/(j|k|l)/ig, "5")
				.replace(/(m|n|o)/ig, "6")
				.replace(/(p|q|r|s)/ig, "7")
				.replace(/(t|u|v)/ig, "8")
				.replace(/(w|x|y|z)/ig, "9")
				.replace(/-/ig, "")
				.replace("(", "")
				.replace(")", "")
				.replace(" ", "");
			if (number.length !== 11) {
				message.reply("I don't understand. Please retype the number. Make sure the number starts with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit.");
			} else {
				numbers.push({ channel: message.channel.id, number: number, month: nextmonth, year: year });
				fs.writeFileSync("./json/numbers.json", JSON.stringify(numbers), "utf8");
				fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
				fs.writeFileSync("./json/fouroneone.json", JSON.stringify(fouroneone), "utf8");
				message.channel.send({
					embed: {
						color: 0x007FFF,
						title: "Done!",
						description: "Here's your service information. Should you have any questions, don't hesitate to dial `*611`.",
						fields: [{
							name: "Number",
							value: number,
						},
						{
							name: "Expiration",
							value: `${year}/${realMonth}`,
						}],
						footer: {
							text: "You can register in the phonebook (*411) to receive random calls. To do so, dial *411 and press 3. You have finished the wizard.",
						},
					},
				});
			}
		} else {
			message.reply("I don't understand. Please retype the number. The number **must** start with `0301` followed by 7 digits (11 digits altogether). Type `0` to quit");
		}
	} else if (ffoDocument.status == 7) {
		console.log("event 7 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 8) {
		console.log("event 8 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 9) {
		console.log("event 9 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 10) {
		console.log("event 10 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else if (ffoDocument.status == 11) {
		console.log("event 11 placeholder");
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
	} else {
		fouroneone.splice(fouroneone.indexOf(ffoDocument), 1);
		message.channel.send({
			embed: {
				title: ":x: Error",
				description: "An unknown error has occured.",
				footer: {
					text: "Please DM a developer or call customer support.",
				},
			},
		});
	}
};
