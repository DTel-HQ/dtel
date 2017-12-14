const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
const bot = new Discord.Client({fetchAllMembers: true, disabledEvents: ["TYPING_START", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"]});
require('dotenv').config();
var numbers = JSON.parse(fs.readFileSync("./numbers.json", "utf8"));
var dailies = JSON.parse(fs.readFileSync("./daily.json", "utf8"));
var calls = JSON.parse(fs.readFileSync("./call.json", "utf8"));
var phonebook = JSON.parse(fs.readFileSync("./phonebook.json", "utf8"));
var fouroneone = JSON.parse(fs.readFileSync("./fouroneone.json", "utf8"));
var accounts = JSON.parse(fs.readFileSync("./account.json", "utf8"));
var emotes = JSON.parse(fs.readFileSync("./emotes.json", "utf8"));
var support = user_id => bot.guilds.get('281815661317980160').roles.get('281815839936741377').members.map(member => member.id).indexOf(user_id) > -1;
var blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
var blacklisted = user_id => blacklist.indexOf(user_id) > -1;
var menu = JSON.parse(fs.readFileSync("./menu.json", "utf8"));
var request = require("request");
var schedule = require('node-schedule');
var cprefix = "0301"; // Current prefix, `>wizard`
var award = JSON.parse(fs.readFileSync("./award.json", "utf8"));
var restify = require('restify');
var suggestionchannel = "326798754348793857";
var server = restify.createServer({
	name : "Bot HTTP server"
});
var ipaddress = process.env.IP || "127.0.0.1";
var port = process.env.PORT || 2000;
server.listen(port, ipaddress, function () {
	console.log('%s listening to %s', server.name, server.url);
});

var mailbox_storage=JSON.parse(fs.readFileSync("./mailbox.json","utf8"));

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

bot.on("message", message => {
  if (message.author.bot || blacklisted(message.author.id)) return;
	if (message.content.startsWith(">")) {
		console.log(message.author.username + "#" + message.author.discriminator + " > " + message.content);
	}

	// Call msg?
	
	// If the channel is not in a call, is this a command?
	if (message.content.startsWith(">")) {
  	const args = message.content.slice(1).trim().split(/ +/g);
  	const command = args.shift().toLowerCase();
		try {
			let commandFile = require(`./commands/${command}.js`);
			commandFile.run(bot, message, args);
		} catch (err) {
			console.error(err);
		}
	}
});

bot.login(process.env.DISCORD_TOKEN);
