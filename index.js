const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
const bot = new Discord.Client({ fetchAllMembers: true, disabledEvents: ["TYPING_START", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"] });
require("dotenv").config();
const prefix = ">";
const calls = JSON.parse(fs.readFileSync("./call.json", "utf8"));
const fouroneone = JSON.parse(fs.readFileSync("./fouroneone.json", "utf8"));
const emotes = JSON.parse(fs.readFileSync("./emotes.json", "utf8"));
const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.map(member => member.id).indexOf(user_id) > -1;
const blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
const blacklisted = user_id => blacklist.indexOf(user_id) > -1;
const request = require("request");
const schedule = require("node-schedule");
const phonebook = JSON.parse(fs.readFileSync("../phonebook.json", "utf8"));
const cprefix = "0301"; // Current prefix, `>wizard`
const award = JSON.parse(fs.readFileSync("./award.json", "utf8"));
const dailies = JSON.parse(fs.readFileSync("./daily.json", "utf8"));
const restify = require("restify");
const server = restify.createServer({
	name: "Bot HTTP server",
});
const ipaddress = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 2000;
server.listen(port, ipaddress, () => {
	console.log("%s listening to %s", server.name, server.url);
});

const mailbox_storage = JSON.parse(fs.readFileSync("./mailbox.json", "utf8"));

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		let eventFunction = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		// super-secret recipe to call events with all their proper arguments *after* the `client` const.
		bot.on(eventName, (...args) => eventFunction(bot, ...args));
	});
});

bot.on("message", async message => {
	if (message.author.bot || blacklisted(message.author.id)) return;
	if (message.content.startsWith(prefix)) {
		console.log(`${message.author.username}#${message.author.discriminator} > ${message.content}`);
	}

	// Call msg?
	if (message.guild.call) {
		console.log("Call msg placeholder");
	} else {
		// If the channel is not in a call, is this a command?
		if (!message.content.startsWith(prefix)) return;
		// If it is, try to run the command
		if (!message.guild) return;
		const args = message.content.split(" ").splice(1).join(" ")
			.trim();
		const command = message.content.split(" ")[0].trim().toLowerCase().replace(prefix, "");
		let commandFile = require(`./commands/${command}.js`);
		if (commandFile) {
			try {
				return commandFile(bot, message, args);
			} catch (err) {
				console.log(err);
			}
		}
	}
});

bot.login(process.env.DISCORD_TOKEN);
