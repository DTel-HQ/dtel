const Discord = require("discord.js"),
      fs = require("fs"),
      util = require("util"),
      bot = new Discord.Client({fetchAllMembers: true, disabledEvents: ["TYPING_START", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"]}),
      request = require("request"),
      schedule = require('node-schedule'),
      cprefix = "0301",
      restify = require('restify');
require('dotenv').config();
var calls = JSON.parse(fs.readFileSync("./json/call.json", "utf8")),
    fouroneone = JSON.parse(fs.readFileSync("./json/fouroneone.json", "utf8")),
    emotes = JSON.parse(fs.readFileSync("./json/emotes.json", "utf8")),
    blacklist = JSON.parse(fs.readFileSync("./json/blacklist.json", "utf8")),
    blacklisted = user_id => blacklist.indexOf(user_id) > -1,
    gblacklist = JSON.parse(fs.readFileSync("./json/gblacklist.json", "utf8")),
    gblacklisted = guild_id => gblacklist.indexOf(guild_id) > -1,
    award = JSON.parse(fs.readFileSync("./json/award.json", "utf8")),
    mailbox_storage = JSON.parse(fs.readFileSync("./json/mailbox.json","utf8")),
    server = restify.createServer({name: "Bot HTTP server"}),
    recentCall = {};
server.listen(process.env.PORT || 2000, process.env.IP || "127.0.0.1", function () {
	console.log('%s listening to %s', server.name, server.url);
});

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
  if (message.author.bot || blacklisted(message.author.id) || gblacklisted(message.guild.id)) return;
	if (message.content.startsWith(">")) {
		console.log(message.author.username + "#" + message.author.discriminator + " > " + message.content);
	}
	var call = calls.find(function(item) {
		if (item.from.channel === message.channel.id) {
			return item.from.channel === message.channel.id;
		}
		else if (item.to.channel === message.channel.id) {
			return item.to.channel === message.channel.id;
		}
		else {return undefined;}
	});
	// Call msg?
	if (call) {
		if (!call.status) {
			const args = message.content.slice(1).trim().split(/ +/g);
			const command = args.shift().toLowerCase();
				try {
					let commandFile = require(`./callcmds/${command}.js`);
					commandFile.run(bot, message, fs, calls, call);
				} catch (err) {
					console.error(err);
				}
			}
		}
		else if (message.channel.id === call.from.channel && call.status === true) {
			if (call.to.channel === "281816105289515008" && call.wage === undefined) {
				call.wage = true;
			}
			if (bot.channels.get(call.to.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./json/call.json", JSON.stringify(calls), "utf8");
				return;
			}
			if (support(message.author.id)) {
				bot.channels.get(call.to.channel).send("**" + message.author.tag +"** :arrow_right: <:GoldPhone:320768431307882497> "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.forEach(item => {
						bot.channels.get(call.to.channel).send("**" + message.author.tag +"** :arrow_right: <:GoldPhone:320768431307882497> "+item.url);
					});
				}
			} else {
				bot.channels.get(call.to.channel).send("**" + message.author.tag +"** :arrow_right: <:DiscordTelPhone:310817969498226718> "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.forEach(item => {
						bot.channels.get(call.to.channel).send("**" + message.author.tag +"** :arrow_right: <:DiscordTelPhone:310817969498226718> "+item.url);
					});
				}
			}
			calls.splice(calls.indexOf(call), 1);
			call.time = Date.now();
			calls.push(call);
			fs.writeFileSync("./json/call.json", JSON.stringify(calls), "utf8");
			setTimeout(function(){
				call = calls.find(function(item) {
					if (	item.from.channel === message.channel.id) {
						return item.from.channel === message.channel.id;
					}
					else if (item.to.channel === message.channel.id) {
						return item.to.channel === message.channel.id;
					}
					else {return undefined;}
				});
				if (call !== undefined) {
					if (call.time <= Date.now() - 120000) {
						bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
						bot.channels.get(call.from.channel).send(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./json/call.json", JSON.stringify(calls), "utf8");
						if(!mailbox_storage.find(a=>a.channel===call.to.channel)){
							bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
							return;
						}
						bot.channels.get(call.from.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.to.channel).settings.autoreply);
						bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
						recentCall[call.from.channel]=call.to.number;
					}
				}
			},120000);
		}
		else if (message.channel.id === call.to.channel && call.status === true) {
			if (call.wage === true && call.to.channel === "281816105289515008") {
				accounts.splice(accounts.indexOf(account), 1);
				account.balance += 40;
				accounts.push(account);
				message.author.send("You earned a $40 pick-up bonus. Your current balance is $"+account.balance+".");
				call.wage = false;
				fs.writeFileSync("./json/account.json", JSON.stringify(accounts), "utf8");
			}
			if (bot.channels.get(call.from.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./json/call.json", JSON.stringify(calls), "utf8");
				return;
			}
			if (support(message.author.id)) {
				bot.channels.get(call.from.channel).send("**" + message.author.tag +"** :arrow_right: <:GoldPhone:320768431307882497> "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.forEach(item => {
						bot.channels.get(call.from.channel).send("**" + message.author.tag +"** :arrow_right: <:GoldPhone:320768431307882497> "+item.url);
					});
				}
			} else {
				bot.channels.get(call.from.channel).send("**" + message.author.tag +"** :arrow_right: <:DiscordTelPhone:310817969498226718> "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.forEach(item => {
						bot.channels.get(call.from.channel).send("**" + message.author.tag +"** :arrow_right: <:DiscordTelPhone:310817969498226718> "+item.url);
					});
				}
			}
			calls.splice(calls.indexOf(call), 1);
			call.time = Date.now();
			calls.push(call);
			fs.writeFileSync("./json/call.json", JSON.stringify(calls), "utf8");
			setTimeout(function(){
				call = calls.find(function(item) {
					if (item.from.channel === message.channel.id) {
						return item.from.channel === message.channel.id;
					}
					else if (item.to.channel === message.channel.id) {
						return item.to.channel === message.channel.id;
					}
					else {return undefined;}
				});
				if (call !== undefined) {
					if (call.time <= Date.now() - 120000) {
						bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
						bot.channels.get(call.from.channel).send(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./json/call.json", JSON.stringify(calls), "utf8");
						if(!mailbox_storage.find(a=>a.channel===call.to.channel)){
							bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
							return;
						}
						bot.channels.get(call.from.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.to.channel).settings.autoreply);
						bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
						recentCall[call.from.channel]=call.to.number;
					}
				}
			},120000);
		}
	}
	// If the channel is not in a call, is this a command?
	else if (message.content.startsWith(">")) {
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
