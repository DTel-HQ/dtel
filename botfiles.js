const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
const mongoose = require("mongoose");
const database = require("./schemas/database");
const client = new Discord.Client({ fetchAllMembers: true, disabledEvents: ["GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"] });
require("dotenv").config();
const calls = JSON.parse(fs.readFileSync("./json/call.json", "utf8"));
const fouroneone = JSON.parse(fs.readFileSync("./json/fouroneone.json", "utf8"));
const emotes = JSON.parse(fs.readFileSync("./json/emotes.json", "utf8"));
const support = user_id => client.guilds.get(process.env.SUPPORTGUILD).roles.get(process.env.SUPPORTROLE).members.has(user_id);
const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));
const blacklisted = user_id => blacklist.indexOf(user_id) > -1;
const gblacklist = JSON.parse(fs.readFileSync("./json/gblacklist.json", "utf8"));
const gblacklisted = user_id => gblacklist.indexOf(user_id) > -1;
const request = require("request");
const schedule = require("node-schedule");
const phonebook = JSON.parse(fs.readFileSync("./json/phonebook.json", "utf8"));
const award = JSON.parse(fs.readFileSync("./json/award.json", "utf8"));
const dailies = JSON.parse(fs.readFileSync("./json/daily.json", "utf8"));
const numbers = JSON.parse(fs.readFileSync("./json/numbers.json", "utf8"));

database.initialize(process.env.MONGOURL).then(db => {
	console.log(`Database Loaded!`);
}).catch(err => {
	console.log(`Failed to intialize Database`, err);
	process.exit(1);
});

const mailbox_storage = JSON.parse(fs.readFileSync("./json/mailbox.json", "utf8"));

function updateNumbers() {
	fs.writeFileSync("./json/numbers.json", JSON.stringify(numbers), "utf8");
}

function removeNumber(numberIndex) {
	numbers.splice(numberIndex, 1);
}

schedule.scheduleJob({ date: 1, hour: 0, minute: 0, second: 0 }, () => {
	const now = new Date();
	for (let i in numbers) {
		const number = numbers[i];
		if (number.year <= now.getFullYear() || number.month <= now.getMonth()) {
			if (number.month == now.getMonth() || (number.month == 12 && now.getMonth() == 0)) {
				// send a notice to the user.
				var channel = client.channels.get(number.channel);
				if (channel) {
					var message = "Your number has expired! Pay your monthly fee by typing `>dial *233`!";
					channel.send(message);
				}
			} else { removeNumber(i); }
			// client.channels.get(process.env.LOGSCHANNEL).send(":closed_book: Number " + number.number + " removed because it expired.")
		}
	}
	updateNumbers();
});

Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

client.on("ready", () => {
	client.user.setActivity(`${`memes`}`);
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		// super-secret recipe to call events with all their proper arguments *after* the `client` const.
		client.on(eventName, (...args) => eventFunction(client, ...args));
	});
});


client.on("message", async message => {
	if (!message.guild && message.guild.available !== true) {
		console.log(`Warning, ${message.guild.name} on Shard ID: ${process.env.SHARD} is unavailable. Recommended bot shutdown.`);
	}
	let isBlacklisted;
	try {
		isBlacklisted = await Blacklist.findOne({ _id: message.author.id });
		if (!isBlacklisted) throw new Error();
	} catch (err) {
		try {
			isBlacklisted = await Blacklist.findOne({ _id: message.guild.id });
			if (!isBlacklisted) throw new Error();
		} catch (err2) {
			// Ignore error
		}
	}
	if (message.author.bot || isBlacklisted) return;
	// In progress wizard/phonebook session?
	let callDocument;
	try {
		console.log("try start");
		callDocument = await Calls.findOne({ to: { channelID: message.channel.id } });
		if (!callDocument) throw new Error();
	} catch (err) {
		console.log(`no doc there`);
		try {
			console.log("2nd try start")
			callDocument = await Calls.findOne({ channelID: { _id: message.channel.id } });
			if (callDocument) console.log(callDocument);
			if (!callDocument) throw new Error();
			if (!callDocument) console.log("no call doc 2nd err");
		} catch (err2) {
			console.log("errored again, no call doc :(")
			callDocument = null;
		}
	}
	if (message.content.startsWith(process.env.PREFIX)) { // If it starts with a the prefix, check if its a command
		console.log(`${message.author.tag} > ${message.content}`);
		const args = message.content.split(" ").splice(1).join(" ")
			.trim();
		let command = message.content.split(" ")[0].trim().toLowerCase().replace(process.env.PREFIX, "");
		if (command == "dial") {
			command = "call";
		}
		let commandFile;
		if (callDocument && callDocument.status) {
			try {
				commandFile = require(`./callcmds/${command}.js`);
				console.log("ran callcmd");
			} catch (err) {
				console.log(`call cmds err: ${err}`);
			}
			if (commandFile) {
				try {
					return commandFile(client, message, callDocument);
				} catch (err) {
					console.log(err);
				}
			}
		} else {
			try {
				commandFile = require(`./commands/${command}.js`);
				console.log("ran normcmd");
			} catch (err) {
				console.log(`norm cmds err: ${err}`);
			}
			if (commandFile) {
				try {
					return commandFile(client, message, args);
				} catch (err) {
					console.log(err);
				}
			}
			// If so, run it
		}
	} else if (callDocument && callDocument.status && callDocument.pickedup) {
		require("./modules/callHandler")(client, message, callDocument);
	}
});

// process.on("unhandledRejection", err => {
// 	console.log(err);
// 	process.exit(-1);
// });

client.login(process.env.TOKEN);
