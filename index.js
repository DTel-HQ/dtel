const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
const bot = new Discord.Client({ fetchAllMembers: true, disabledEvents: ["TYPING_START", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"] });
require("dotenv").config();
const calls = JSON.parse(fs.readFileSync("./json/call.json", "utf8"));
const fouroneone = JSON.parse(fs.readFileSync("./json/fouroneone.json", "utf8"));
const emotes = JSON.parse(fs.readFileSync("./json/emotes.json", "utf8"));
const support = user_id => bot.guilds.get("281815661317980160").roles.get("281815839936741377").members.map(member => member.id).indexOf(user_id) > -1;
const blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8"));
const blacklisted = user_id => blacklist.indexOf(user_id) > -1;
const request = require("request");
const schedule = require("node-schedule");
const phonebook = JSON.parse(fs.readFileSync("./json/phonebook.json", "utf8"));
const award = JSON.parse(fs.readFileSync("./json/award.json", "utf8"));
const dailies = JSON.parse(fs.readFileSync("./json/daily.json", "utf8"));
var numbers = JSON.parse(fs.readFileSync("./json/numbers.json", "utf8"));
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

function updateNumbers(){
	fs.writeFileSync("./json/numbers.json", JSON.stringify(numbers), "utf8");
}

function removeNumber(numberIndex){
	numbers.splice(numberIndex, 1);
}

schedule.scheduleJob({date: 1, hour: 0, minute: 0, second: 0}, function(){
	const now = new Date();
	for (var i in numbers){
		const number = numbers[i];
		if (number.year <= now.getFullYear() || number.month <= now.getMonth()){
			if (number.month == now.getMonth() || (number.month == 12 && now.getMonth() == 0)){
				// send a notice to the user.
				var channel = bot.channels.get(number.channel);
				if (!channel){ // if the channel is null we will remove them because that means deleted. :(
					var message = "Your number is expired! Pay your monthly fee by typing `>dial *233`!";
					channel.send(message);
					break;
				}
			}
			removeNumber(i);
			// Uncomment if I should log it. I don't think it would be a good idea because it happens every month, so spam. - nubbytm
			//bot.channels.get("282253502779228160").send(":closed_book: Number " + number.number + " removed because it expired.")
		}
	}
	updateNumbers();
});

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
	if (message.guild !== undefined && message.guild.available !== true) {
		console.log(`Warning, ${message.guild.name} is unavailable. Recommended bot shutdown.`);
	}
	if (message.author.bot || blacklisted(message.author.id)) return;
	if (message.content.startsWith(process.env.PREFIX)) {
		console.log(`${message.author.username}#${message.author.discriminator} > ${message.content}`);
	}

	// Call msg?
	if (message.guild.call) {
		console.log("Call msg placeholder");
	} else {
		// If the channel is not in a call, is this a command?
		if (!message.content.startsWith(process.env.PREFIX)) return;
		// If it is, try to run the command
		const args = message.content.split(" ").splice(1).join(" ")
			.trim();
		const command = message.content.split(" ")[0].trim().toLowerCase().replace(process.env.PREFIX, "");
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
