const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
const bot = new Discord.Client({fetchAllMembers: true, disabledEvents: ["TYPING_START", "GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_CREATE", "CHANNEL_DELETE", "CHANNEL_UPDATE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "USER_UPDATE", "USER_NOTE_UPDATE", "USER_SETTINGS_UPDATE", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE", "VOICE_SERVER_UPDATE"], disableEveryone: true});
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
var port = process.env.PORT || 41880;
server.listen(port, ipaddress, function () {
	console.log('%s listening to %s', server.name, server.url);
});

var mailbox_storage=JSON.parse(fs.readFileSync("./mailbox.json","utf8"));
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4();
}
var recentCall={};

function callNumber(yournumber,message,call,mynumber){
	if (yournumber === "") {
		message.reply("Damn son, you forgot the number! `>dial <Number>`");
		return;
	}
	if(yournumber==="*ROM"){
		yournumber="03015050505";
	}
	yournumber = yournumber.replace(/a/ig, "2").replace(/b/ig, "2").replace(/c/ig, "2").replace(/d/ig, "3").replace(/e/ig, "3").replace(/f/ig, "3").replace(/g/ig, "4").replace(/h/ig, "4").replace(/i/ig, "4").replace(/j/ig, "5").replace(/k/ig, "5").replace(/l/ig, "5").replace(/m/ig, "6").replace(/n/ig, "6").replace(/o/ig, "6").replace(/p/ig, "7").replace(/q/ig, "7").replace(/r/ig, "7").replace(/s/ig, "7").replace(/t/ig, "8").replace(/u/ig, "8").replace(/v/ig, "8").replace(/w/ig, "9").replace(/x/ig, "9").replace(/y/ig, "9").replace(/z/ig, "9").replace(/-/ig, "").replace("(", "").replace(")", "").replace(" ", "");
	if (yournumber === "*611") {
		yournumber = "08006113835";
	}
	else if (isNaN(yournumber)) {
		message.reply("Please input the number you want to dial in a number-only format.\n:x: `>dial (0300) 000-0000`\n:white_check_mark: `>dial 03000000000`");
		return;
	}
	var yourchannel = numbers.find(function(item) {
		return item.number === yournumber;
	});
	if (yourchannel === undefined) {
		message.reply(":x: Dialing error: Requested number does not exist. Call `*411` to check numbers.");
		return;
	}
	if (yourchannel.year < new Date().getFullYear()) {
		message.reply(":x: Dialing error: The number you've dialed has expired. Contact the number owner to renew it.");
		return;
	}
	else if (yourchannel.year === new Date().getFullYear() && yourchannel.month <= new Date().getMonth()) {
		message.reply(":x: Dialing error: The number you've dialed has expired. Contact the number owner to renew it.");
		return;
	}
	yourchannel = yourchannel.channel;
	if (mynumber === undefined) {
		message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service.");
		return;
	}
	if (mynumber.number === "*611") {
		mynumber.number ="08006113835";
	}
	if (yournumber === mynumber.number) {
		message.reply(":thinking: I am wondering why you are calling yourself.");
		return;
	}
	if (mynumber.year === new Date().getFullYear() && mynumber.month <= new Date().getMonth()) {
		message.reply(":x: Billing error: Your number is expired. Renew your number by dialing `*233`.");
		return;
	}
	if (mynumber.year < new Date().getFullYear()) {
		message.reply(":x: Billing error: Your number is expired. Renew your number by dialing `*233`.");
		return;
	}
	mynumber = mynumber.number;
	var mychannel = message.channel.id;
	if (bot.channels.get(yourchannel) === undefined) {
		message.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted, hidden from the bot, or it left the corresponding server. Please dial `*611` for further instructions.");
		return;
	}
	var yourcall = calls.find(function(item) {
		if (	item.from.number === yournumber) {
			return item.from.number === yournumber;
		}
		else if (item.to.number === yournumber) {
			return item.to.number === yournumber;
		}
	});
	if (yourcall !== undefined) {
		message.reply(":x: Dialing error: The number you dialed is already in a call.");
		return;
	}
	if (mynumber.year < new Date().getFullYear()) {
		message.reply(":x: Dialing error: Your number has expired! Renew it by dialing `*233`.");
		return;
	} else if (mynumber.year === new Date().getFullYear() && mynumber.month <= new Date().getMonth()) {
		message.reply(":x: Dialing error: Your number has expired! Renew it by dialing `*233`.");
		return;
	}
	else if(yournumber === "*611" && message.channel.guild !== undefined && message.channel !== undefined && message.channel.guild.id === "281815661317980160" && message.channel.id === "281816245832122370" || yournumber === "08006113835" && message.channel.guild !== undefined && message.channel !== undefined && message.channel.guild.id === "281815661317980160" && message.channel.id === "281816245832122370") {
		message.reply(":x: You are unable to call *611 from <#281816245832122370> because Customer Support is at your doorstep.");
		return;
	}
	else if (yournumber === "08006113835" && message.channel.guild !== undefined && message.channel.guild.id === "264445053596991498" || yournumber === "*611" && message.channel.guild !== undefined && message.channel.guild.id === "264445053596991498") {
		message.reply(":question: If you have any questions, go straight to The Double-Eyed Bus#6889 or Keanu73#2193.");
		return;
	}
	else if (yournumber === "08006113835") {
		bot.channels.get(yourchannel).send("<@&281815839936741377>");
	}
	else if (yournumber === "*611" && message.channel.guild !== undefined && message.channel !== undefined && message.channel.guild.id === "267810707574226964" || yournumber === "08006113835" && message.channel.guild !== undefined && message.channel !== undefined && message.channel.guild.id === "267810707574226964") {
		message.reply(":x: **Public guilds are unable to call *611 (the Customer Support hotline).")
		return;
	}

	message.reply(":telephone: Dialing... You are able to `>hangup`.");
	bot.channels.get("282253502779228160").send(":telephone: A **normal** call is established between channel "+message.channel.id+" and channel "+yourchannel+" by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
	calls.push({from:{channel:mychannel,number:mynumber},to:{channel:yourchannel,number:yournumber},status:false,time:Date.now()});
	fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
	bot.channels.get(yourchannel).send("You received a call from `("+mynumber.split("")[0]+mynumber.split("")[1]+mynumber.split("")[2]+mynumber.split("")[3]+") "+mynumber.split("")[4]+mynumber.split("")[5]+mynumber.split("")[6]+"-"+mynumber.split("")[7]+mynumber.split("")[8]+mynumber.split("")[9]+mynumber.split("")[10]+"`. Type `>pickup` or `>hangup`.");
	setTimeout(function(){
		var call = calls.find(function(item) {
			return item.from.channel === message.channel.id;
		});
		if (call !== undefined) {
			call = calls.find(function(item) {
				if (	item.from.channel === message.channel.id) {
					return item.from.channel === message.channel.id;
				}
				else if (item.to.channel === message.channel.id) {
					return item.to.channel === message.channel.id;
				}
				else {return undefined;}
			});
			if (call.status === false && call.time <= Date.now() - 120000) {
				message.reply(":negative_squared_cross_mark: This call has expired (2 minutes).");
				bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
				if(!mailbox_storage.find(a=>a.channel===call.to.channel)){
					bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
					return;
				}
				bot.channels.get(call.from.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.to.channel).settings.autoreply);
				bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
				recentCall[call.from.channel]=call.to.number;
				bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
			}
		}
	},120000);
}

// Ready: Post to bot lists + Set status. Do not change unless the bot is sharded
bot.on("ready", () => {
    console.log("I am ready!");
    bot.user.setPresence({game:{name:bot.guilds.array().length+" servers | >help", type: 0}});
	request.post({
		url: "https://bots.discord.pw/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": process.env.BOTS_PW_TOKEN
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBots returns success: "+ body);
	});
	request.post({
		url: "https://discordbots.org/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": process.env.DBL_ORG_TOKEN
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBotsList returns success: "+ body);
	});
	/*orders.filter(i => {return i.status === 0;}).forEach(k => {
		orders.splice(orders.indexOf(k));
	});
	fs.writeFileSync("./orders.json", JSON.stringify(orders),"utf8");*/
});

bot.on("message", message => {
	request("http://facebook.com");
	// EmoteCast™
	if (!message.author.bot && message.content.split(':').length === 3 && !blacklisted(message.author.id) && message.guild.member(bot.user.id).hasPermission("USE_EXTERNAL_EMOJIS") && !message.content.startsWith("<") && !message.content.endsWith(">")) {
		if (message.channel.id === '110373943822540800') {
			return;
		}
		var emote = emotes.find(i => {return i.name === message.content.split(':')[1];});
		if (emote !== undefined) {
			message.channel.send("<:"+emote.name+":"+emote.id+">");
		}
	}
	// Command Log
	if (message.content.startsWith(">")) {
		console.log(message.author.username + "#" + message.author.discriminator + " > " + message.content);
	}
	var account = accounts.find(function(item) {
		return item.user === message.author.id;
	});
	var mynumber = numbers.find(function(item) {
		return item.channel === message.channel.id;
	});
	var call = calls.find(function(item) {
		if (	item.from.channel === message.channel.id) {
			return item.from.channel === message.channel.id;
		}
		else if (item.to.channel === message.channel.id) {
			return item.to.channel === message.channel.id;
		}
		else {return undefined;}
	});
	var pbstatus = fouroneone.find(function(item) {
		return item.user === message.author.id;
	});

	// call options TODO: this
	/*if(message.content.startsWith(">call")){
		if(!call){
			var yournumber=message.content.split(" ").slice(1).join(" ");
			callNumber(yournumber,message,call,mynumber);
		} // no call; normal function
		var msg=message;
		switch(msg.content.split(" ")[1]){
			case "foward":

			break;
			default:
			var embed=new Discord.RichEmbed();
			embed.setTitle("<:GoldPhone:320768431307882497> Call Options");
			embed.setDescription("`>call forward [number]` *Forward call*");
		}
	}*/

	if (!message.author.bot && call === undefined && pbstatus === undefined && !blacklisted(message.author.id)) {
		if (message.content === ">help") {
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("List of Commands").setDescription("For more information, use `>info`.").addField(">dial / >call", "Dial a number using your own number").addField(">rdial / >rcall","Dial a random number in the phonebook (*411)").addField(">wizard","Get yourself a number").addField(">mailbox", "Check your number's mailbox, plus various settings").addField(">suggest", "Suggest something to be added to the bot").addField(">convert", "Convert your credits into other bot currency via [Discoin](http://discoin.gitbooks.io/docs)").addField("Other commands about money", "`>daily`, `>lottery`").addField("You probably know how these commands work", "`>invite`, `>info`"));
		}
		else if(message.content.startsWith(">suggest")) {
			if (message.content.split(" ")[1] === undefined){
				message.reply(":x: Usage: `>suggest <suggestion>`")
				return;
			}
			message.reply("Thanks for your suggestion!");
	    	bot.channels.get("326798754348793857").send("New suggestion from __" + message.author.username + "#" + message.author.discriminator + "__ (" + message.author.id + ") ```\n" + message.content.split(" ").splice(1).join(" ").split("```").join(" ") + "```");
		}
		// Lottery may be removed in the future
		else if (message.content.startsWith(">lottery") && message.author.id !== "104559847118225408") {
			if (message.content.split(" ")[1] === undefined) {
				var myentry = award.users.filter(item => {return item === message.author.id}).length;
				message.reply("You have "+myentry+" entries. The current jackpot is ¥"+award.amount+".\nTo buy lotteries: `>lottery <Amount of entries>`. 1 entry costs 5 credits.");
				return;
			}
			else if (isNaN(parseInt(message.content.split(" ")[1]))) {
				message.reply("Not a number!\n`>lottery <Amount of entries>`. 1 Entry costs 5 credits.");
				return;
			}
			else if (parseInt(message.content.split(" ")[1]) < 0) {message.reply("Get some help.");return;}
			var entries = parseInt(message.content.split(" ")[1]);
			if (account === undefined) {
				account = {user:message.author.id,balance:0};
				accounts.push(account);
				bot.users.get(message.author.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
			}
			if (account.balance < entries * 5) {
				message.reply("Insufficient fund! 1 Entry costs 5 credits.");
				return;
			}
			accounts.splice(accounts.indexOf(account), 1);
			account.balance -= entries * 5;
			accounts.push(account);
			for (var i = 0; i < entries; i++) {
				award.users.push(message.author.id);
			}
			award.amount += entries * 5;
			fs.writeFileSync("./award.json", JSON.stringify(award), "utf8");
			message.reply("You've bought "+entries+" entries. The current jackpot is ¥"+award.amount+".");
			bot.channels.get("282253502779228160").send(":tickets: User "+message.author.username+" paid ¥"+entries * 5+" for the lottery. The user now have ¥"+account.balance+".");
		}
    else if (message.content.startsWith(">daily") && bot.guilds.get('281815661317980160').members.get(message.author.id) && bot.guilds.get('281815661317980160').members.get(message.author.id).roles.find("name","Manager")) {
				 if (dailies.indexOf(message.author.id) > -1) {
							 message.reply("You already claimed your daily credits!");
							 return;
				 }
				 message.reply("Here's your 250 credits for working hard! You can claim again after 01:00 CET (Approx. 23:00 UTC in summer, 00:00 UTC in winter).");
				 dailies.push(message.author.id);
				 fs.writeFileSync("./daily.json", JSON.stringify(dailies), "utf8");
				 if (account !== undefined) {
								accounts.splice(accounts.indexOf(account), 1);
				 } else {
								account = {user: message.author.id, balance: 0};
				 }
				 account.balance += 250;
				 accounts.push(account);
				 bot.channels.get("282253502779228160").send(":calendar: "+message.author.username+"#"+message.author.discriminator+" ("+message.author.id+") claimed 250 daily credits!");
				 fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		}
    else if (message.content.startsWith(">daily") && bot.guilds.get('281815661317980160').members.get(message.author.id) && bot.guilds.get('281815661317980160').members.get(message.author.id).roles.find("name","Customer Support")) {
				 if (dailies.indexOf(message.author.id) > -1) {
							 message.reply("You already claimed your daily credits!");
					 return;
				 }
				 message.reply("Here's your 200 credits for working hard! You can claim again after 01:00 CET (Approx. 23:00 UTC in summer, 00:00 UTC in winter).");
				 dailies.push(message.author.id);
				 fs.writeFileSync("./daily.json", JSON.stringify(dailies), "utf8");
				 if (account !== undefined) {
								accounts.splice(accounts.indexOf(account), 1);
				 } else {
								account = {user: message.author.id, balance: 0};
				 }
				 account.balance += 200;
				 accounts.push(account);
				 bot.channels.get("282253502779228160").send(":calendar: "+message.author.username+"#"+message.author.discriminator+" ("+message.author.id+") claimed 200 daily credits!");
				 fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		}
		else if (message.content.startsWith(">daily")) {
			if (dailies.indexOf(message.author.id) > -1) {
				message.reply("You already claimed your daily credits!");
				return;
			}
			
			request("https://discordbots.org/api/bots/377609965554237453/votes?onlyids=true",{
				headers: {
					"content-type": "application/json",
					"Authorization": process.env.DBL_ORG_TOKEN
				}
			}, function(error, response, body) {
				if (response.statusCode === 200) {
					body = JSON.parse(body);
					if (body.indexOf(message.author.id) > -1) {
						message.reply("Here's your 180 credits! You can claim again after 01:00 CET (Approx. 23:00 UTC in summer, 00:00 UTC in winter).");
						dailies.push(message.author.id);
						fs.writeFileSync("./daily.json", JSON.stringify(dailies), "utf8");
						if (account !== undefined) {
							accounts.splice(accounts.indexOf(account), 1);
						} else {
							account = {user: message.author.id, balance: 0};
						}
						account.balance += 180;
						accounts.push(account);
						bot.channels.get("282253502779228160").send(":calendar: "+message.author.username+"#"+message.author.discriminator+" ("+message.author.id+") claimed 180 daily credits!");
						fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
					}
					else {
						message.reply("Here's your 120 credits! You can claim again after 01:00 CET (Approx. 23:00 UTC in summer, 00:00 UTC in winter).\n*Get 60 more credits daily by upvoting at <https://discordbots.org/bot/377609965554237453>!*");
						dailies.push(message.author.id);
						fs.writeFileSync("./daily.json", JSON.stringify(dailies), "utf8");
						if (account !== undefined) {
							accounts.splice(accounts.indexOf(account), 1);
						} else {
							account = {user: message.author.id, balance: 0};
						}
						account.balance += 120;
						accounts.push(account);
						bot.channels.get("282253502779228160").send(":calendar: "+message.author.username+"#"+message.author.discriminator+" ("+message.author.id+") claimed 120 daily credits!");
						fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
					}
				} else {
					message.reply("Cannot connect to DiscordBots.org. Try again.");}
			});
		}
		else if (message.content === ">info") {
		    message.reply("check your DM!");
		    message.author.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("📖 DiscordTel Information").setDescription("For command help, use `>help`.").addField("📞 Getting a number", "Before getting a number, you need to reserve a channel for your phone. Once you have done this, you'll have to run the `>wizard` command in the channel to get a number.").addField("✏ Number prefixes", "Most numbers have a prefix of `03XX`, where `XX` represents your shard number. There are some numbers with a prefix of `0900`, which are DM numbers (numbers you can assign in a direct message with the bot), and they act the same as `03XX` numbers, which can *also* have the same digits as `03XX` numbers. Numbers starting with `0800` or `0844`, as well as short codes starting with `*` or `#` are for special uses. Numbers starting with `05XX` are public payphones which can be only called from by `>pdial`.").addField("💰 Recharging", "See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.\nAfter recharging, dial `*233` or `>balance` to check balance.").addField("🔖 Phonebook","To use the phonebook, first dial `*411`. You can check for an existing **11-digit** number by pressing `1`, search the phonebook with **keywords** by pressing `2`. adding/editing/removing your number **from** the phonebook by pressing `3`, and checking a special number by pressing `4`.").addField("📥 Invite the bot", "**Click this button:** [<:dl:382568980218511361>](https://discordapp.com/oauth2/authorize?client_id=377609965554237453&scope=bot&permissions=67169284)").addField("📌 Official Server", "https://discord.gg/RN7pxrB").addField("📕 Detailed Guide", "https://discordtel.austinhuang.me/en/latest"));
		}
		else if (message.content === ">invite") {
			message.reply("https://discordapp.com/oauth2/authorize?client_id=377609965554237453&scope=bot&permissions=67169284\n**All permissions are essential.**");
		}
		else if (message.content.startsWith(">assign") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("<:bloblul:356789385875816448> **Hey, I think you forgot two parameters!**");
			    return;
			}
			if (isNaN(message.content.split(" ")[2])) {
			    message.reply("<:thonkku:356833797804916737> **Is this a valid 11-digit number?**");
			    return;
			}
			var number = numbers.find(function(item) {
				return item.channel === message.content.split(" ")[1];
			});
			if (number !== undefined) {
			    message.reply("<:francis:327464171211849728> **This number is already registered!**");
				return;
			}
			numbers.push({channel: message.content.split(" ")[1], number: message.content.split(" ")[2], year: new Date().getFullYear(), month: new Date().getMonth() + 1});
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			bot.channels.get("282253502779228160").send(":green_book: Number `"+message.content.split(" ")[2]+"` is assigned to channel "+message.content.split(" ")[1]+" by "+message.author.username+".");
			message.reply("Done. Now turn back to your client!");
		}
		else if (message.content.startsWith(">deassign") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
			    message.reply("<:bloblul:356789385875816448> **You forgot a parameter!**");
			    return;
			}
			var number = numbers.find(function(item) {
				return item.number === message.content.split(" ")[1];
			});
			if (number === undefined) {
			    message.reply("<:oliy:327462998610280448> **This number never even existed *in the first place*.**");
				return;
			}
			var theregistry = phonebook.find(function(item) {
				return item.number === message.content.split(" ")[1];
			});
			if (theregistry !== undefined) {
				phonebook.splice(phonebook.indexOf(theregistry), 1);
				fs.writeFileSync("./phonebook.json", JSON.stringify(phonebook), "utf8");
			}
			numbers.splice(numbers.indexOf(number), 1);
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			message.reply("Done. RIP in peace");
			bot.channels.get("282253502779228160").send(":closed_book: Number `"+message.content.split(" ")[2]+"` is DE-assigned from channel "+number.channel+" by "+message.author.username+".");
		}
		else if (message.content.startsWith(">blacklist") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
			    message.reply("u forgot id :b:");
			    return;
			}
			if (blacklisted(message.content.split(" ")[1])) {
				blacklist.splice(blacklist.indexOf(message.content.split(" ")[1]), 1);
				bot.channels.get("282253502779228160").send(":wrench: User ID `"+message.content.split(" ")[1]+"` is removed from blacklist by "+message.author.username+".");
			}
			else {
				blacklist.push(message.content.split(" ")[1]);
				bot.channels.get("282253502779228160").send(":hammer: User ID `"+message.content.split(" ")[1]+"` is added to blacklist by "+message.author.username+".");
			}
			fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist), "utf8");
			message.reply("Done.");
		}
		else if (message.content.startsWith(">eval") && bot.guilds.get("281815661317980160").roles.find("name", "Eval").members.map(m => m.id).indexOf(message.author.id) > -1) {
			var suffix = message.content.substring(6);
			if (suffix.includes("bot.token")) {
				message.reply("DID YOU JUST TRY TO **GET MY TOKEN**??? BAD HUMAN");
				return;
			}
			try {
				message.channel.send(":arrow_down: `INPUT:`\n```js\n" + suffix + "```\n:arrow_up: `OUTPUT:`\n```js\n" + util.inspect(eval(suffix)).replace(bot.token, "(Token)") + "```");
			}
			catch (e) {
				message.channel.send(":arrow_down: `INPUT:`\n```js\n" + suffix + "```\n:sos: `ERROR:`\n```js\n" + e.stack + "```");
			}

        }
		else if (message.content.startsWith(">eregister") && message.author.id === "155784937511976960") {
				message.guild.emojis.forEach(i => {
			var dup = emotes.find(d => {return d.name === i.name;});
			if (dup !== undefined) {
				message.channel.send(":x: Emote <:"+i.name+":"+i.id+"> is NOT registered due to duplicating name.");
			}
			else {
				message.channel.send(":white_check_mark: Emote <:"+i.name+":"+i.id+"> is registered. `<:"+i.name+":"+i.id+">`");
				emotes.push({name: i.name, id: i.id});
				fs.writeFileSync("./emotes.json", JSON.stringify(emotes), "utf8");
			}
		});
			}
		else if (message.content.startsWith(">eunregister") && message.author.id === "155784937511976960") {
				message.guild.emojis.forEach(i => {
			var dup = emotes.find(d => {return d.name === i.name;});
			if (dup === undefined) {
				message.channel.send(":x: Emote <:"+i.name+":"+i.id+"> is NOT registered anyways.");
			}
			else {
				message.channel.send(":white_check_mark: Emote <:"+i.name+":"+i.id+"> is unregistered.");
				emotes.splice(emotes.indexOf(dup), 1);
				fs.writeFileSync("./emotes.json", JSON.stringify(emotes), "utf8");
			}
		});
			}
		else if (message.content === ">emotes") {
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Global Emotes").setDescription("DiscordTel translates emote codes to actual emotes, therefore bypassing the Global Emotes limitation.").addField("I want my server emotes to be global!", "[Pay me $1 USD per month per server.](http://patreon.com/austinhuang) Exceptions (Fee fully waived) may apply if you were a BTTV server or your emotes are considered high quality/well known.").addField("List of currently available emotes", "[Here](http://discordtel.readthedocs.io/en/latest/EmoteCast/)."));
		}
		else if (message.content.startsWith(">backdoor") && support(message.author.id)) {
			if (message.channel.guild) {message.delete();}
			if (message.content.split(" ")[1] === undefined) {
			    message.author.send("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
			    return;
			}
			if (bot.channels.get(message.content.split(" ")[1]) === undefined) {
				message.author.send("Not a valid channel.");
				return;
			}
			bot.channels.get(message.content.split(" ")[1]).createInvite({
                maxAge: 0, // 0 = Infinity
                maxUses: 0 // ^^^^^^^^^^^^
            }).then(invite => {
                message.author.send(invite.url);
            });
		}
		else if (message.content.startsWith(">ninfo") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
			    message.reply("<:b1nzyhyperban:356830174660132864> **Input thy channel id, *valid this time!* **");
			    return;
			}
			var lenumber = numbers.find(function(item) {
				return item.number === message.content.split(" ")[1];
			});
			if (lenumber === undefined) {
				message.reply("Not a valid number.");
				return;
			}
			message.reply("```json\n"+JSON.stringify(lenumber)+"\n```");
		}
		else if (message.content.startsWith(">addcredit") && bot.guilds.get("281815661317980160").roles.find("name", "Customer Support").members.map(m => m.id).indexOf(message.author.id) > -1) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");
			    return;
			}
			if (bot.users.get(message.content.split(" ")[1]) === undefined) {
			    message.reply("Unreachable/Non-existent user. `>addcredit <User_ID> <Credit>`");
			    return;
			}
			if (bot.users.get(message.content.split(" ")[1]).bot) {
			    message.reply("**ARE YOU SURE THAT BOTS ARE HUMAN?** <:Monocle:366036726449438731>");
			    return;
			}
			if (bot.users.get(message.content.split(" ")[1]).id === message.author.id && !bot.guilds.get('281815661317980160').members.get(message.author.id).roles.find("name","Boss")) {
			    message.reply("**YOU CAN'T ADD CREDITS TO YOURSELF**, BEANIE! <:xd:359369769327132682>");
			    return;
			}
			if (bot.guilds.get('281815661317980160').members.get(bot.users.get(message.content.split(" ")[1]).id).roles.find("name","Customer Support") && !bot.guilds.get('281815661317980160').members.get(message.author.id).roles.find("name","Boss")) {
			    message.reply("**NOPE, NOT TODAY!** <:mmLol:356831697385422848>"); 
			    return;
			}
			if (isNaN(message.content.split(" ")[2]) && !bot.guilds.get('281815661317980160').members.get(message.author.id).roles.find("name","Boss")) {
			    message.reply("**ARE YOU SURE ABOUT THAT?** I'M NOT LETTING YOU BREAK THE ECONOMY! <:BusThinking:341628019472990209>");
			    return;					
			}
			var leaccount = accounts.find(function(item) {
				return item.user === message.content.split(" ")[1];
			});
			if (leaccount === undefined) {
				leaccount = {user:message.content.split(" ")[1],balance:parseInt(message.content.split(" ")[2])};
				accounts.push(leaccount);
			}
			else {
				accounts.splice(accounts.indexOf(leaccount), 1);
				leaccount.balance += parseInt(message.content.split(" ")[2]);
				accounts.push(leaccount);
			}
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			message.reply("Done.");
			bot.users.get(leaccount.user).send(":money_with_wings: A support member has added ¥"+message.content.split(" ")[2]+" into your account. You now have ¥"+leaccount.balance+".");
			bot.channels.get("282253502779228160").send(":money_with_wings: Support member "+message.author.username+" added ¥"+message.content.split(" ")[2]+" to <@"+leaccount.user+">.");
		}
		else if (message.content.startsWith(">convert")) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
				message.reply("`>convert <amount> <currency code>`\nCurrency codes have a length of 3 letters. They are available at <http://discoin.sidetrip.xyz/rates>.");
				return;
			}
			if (account.balance < parseInt(message.content.split(" ")[1])) {
				message.reply("Insufficient money!");
				return;
			}
			request.post({url:"http://discoin.sidetrip.xyz/transaction", json: {"user": message.author.id,"amount": parseInt(message.content.split(" ")[1]),"exchangeTo": message.content.split(" ")[2].toUpperCase()}, headers: {'Authorization': process.env.DISCOIN_TOKEN}}, function(error, response, body) {
				if (error || response.statusCode === 503) {
					message.reply("API Error (Downtime?)! Please contact The Double-Eyed Bus#6889 or MacDue#4453.");
				}
				else {
					if (body.status === "approved") {
						message.channel.sendEmbed(new Discord.RichEmbed().setColor("#32CD32").setTitle("Success!").setDescription("Please keep this receipt.").addField("Amount", message.content.split(" ")[1] + " DTS **=>** " + body.resultAmount + " " + message.content.split(" ")[2].toUpperCase()).addField("Receipt ID", body.receipt).addField("Daily Per-User Limit left for currency "+message.content.split(" ")[2].toUpperCase(), body.limitNow + " Discoins"));
						accounts.splice(accounts.indexOf(account), 1);
						account.balance -= parseInt(message.content.split(" ")[1]);
						accounts.push(account);
						fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
						bot.channels.get("282253502779228160").send(":repeat: User "+message.author.username+" requested a Discoin transaction of ¥"+message.content.split(" ")[1]+".");
					}
					else if (body.status === "error") {
						message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Wrong arguments!").setDescription("You probably typed something wrong in the command. Correct them and try again.").addField("Reason", body.reason));
					}
					else if (body.status === "declined" && body.reason === "per-user limit exceeded") {
						message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Transaction declined!").setDescription("You reached the daily per-user limit.").addField("Daily Per-User Limit to currency "+body.currency, body.limit + " Discoins"));
					}
					else if (body.status === "declined" && body.reason === "total limit exceeded") {
						message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Transaction declined!").setDescription("You reached the daily per-user limit.").addField("Daily Per-User Limit to currency "+body.currency, body.limit + " Discoins"));
					}
					else if (body.status === "declined" && body.reason === "verify required") {
						message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Transaction declined!").setDescription("You're not verified. Please verify yourself at http://discoin.sidetrip.xyz/verify."));
					}
				}
			});
		}
		// Wizard should be edited whenever we go into sharding
		else if (message.content.startsWith(">wizard")) {
			if (message.guild === null) {
				message.reply("**WARNING: You're about to register a DM number for yourself.**\n\nPlease read the following before proceeding.\n```diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n```\nPlease enter the number you wish to enable in <#"+message.channel.id+">. The number must start with `0900` followed by another 7 digits. Type `0` to quit the wizard.");
				fouroneone.push({user: message.author.id,status: "6"});
				fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
				return;
			}
			if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
				message.reply("Self-assign wizard can only be run with a member that has Manage Server permission.");
				return;
			}
			if (mynumber !== undefined) {
				message.reply(":x: Error: You already have a number in this channel. If you wish to edit or remove your number, dial `*611`.");
				return;
			}
			var elig = true;
			message.guild.channels.forEach(function(channel){
				var elignumber = numbers.find(function(item) {
					return item.channel === channel.id;
				});
				if (elignumber !== undefined) {
					elig = false;
				}
			});
			if (elig === false) {
				message.reply(":x: Error: You already have a number in this guild.");
				return;
			}
			message.reply("Please read the following before proceeding.\n```diff\n+ By going through the wizard you'll enable DiscordTel service in THIS channel.\n- You are required to read and fully understand the documentation, including important payment information which is required to renew your number. The documentation is available at http://discordtel.rtfd.io.\n+ Your usage in the current calendar month is free.\n- Any abuse on our system will cause termination of service.\n+ This wizard cannot register 0800/0844 numbers. For registration on special numbers, dial *611.\n```\nPlease enter the number you wish to enable in <#"+message.channel.id+">. The number must start with `"+cprefix+"` followed by another 7 digits. Type `0` to quit the wizard.");
			fouroneone.push({user: message.author.id,status: "5"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content === ">dial *411" || message.content === ">call *411") {
			if (mynumber === undefined) {
				message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from channels that have DiscordTel service.");
				return;
			}
			message.reply("Welcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content.startsWith(">checkbalance") && bot.guilds.get("281815661317980160").roles.find("name", "Customer Support").members.map(m => m.id).indexOf(message.author.id) > -1) {
			var id = message.content.split(" ")[1]
			if (message.content.split(" ")[1] === undefined) {
				message.channel.send("**ARE YOU SURE ABOUT THAT? THE BOT WILL ERROR!™ <:BusThinking:341628019472990209>**");
				return;
			}
			if (bot.users.get(id) === undefined) {
					message.channel.send(":x: This user is **non-existent.**");
					return;
			}
			var thouaccount = accounts.find(function(item) {
				return item.user === message.content.split(" ")[1];
			});
			if (account === undefined) {
				 message.reply("User doesn't have an account yet.");
				 return;
			}
			message.channel.send(":checkered_flag: The user **" + bot.users.get(id).username + "** currently has **`" + thouaccount.balance + "` credits.**");
		}
		else if (message.content === ">dial *233" || message.content === ">call *233" || message.content === ">balance") {
			if (account === undefined) {
				account = {user:message.author.id,balance:0};
				accounts.push(account);
				fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
				message.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
			}
			if (mynumber === undefined) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Current Account Status").addField("Your Balance",account.balance).addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/"));
				return;
			}
			else if (account.balance < 500) {
				message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Current Number Status").setDescription("You have less than 500 credits which means you cannot renew at all.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/"));
				return;
			}
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "4"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Current Number Status").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/").setFooter("To hang up, press `0`."));
		}
		else if(message.content.startsWith(">message")){
			var msg=message;
			if(msg.content.split(" ")[1]!==recentCall[msg.channel.id]){
				msg.reply(":x: You didn't call this number (`"+msg.content.split(" ")[1]+"`)");
				return;
			}
			var mailbox=mailbox_storage.find(a=>a.channel===numbers.find(a=>a.number===msg.content.split(" ")[1]).channel);
			mailbox.messages.push({
				"id":guid(),
				"from":numbers.find(a=>a.channel===msg.channel.id).number,
				"message":msg.content.replace(">message "+msg.content.split(" ")[1]+" ",""),
				"callback":true
			})
			bot.channels.get(mailbox.channel).send(":mailbox_with_mail: New Message!\n*Check it with `>mailbox messages`*");
			mailbox_storage[mailbox_storage.indexOf(mailbox_storage.find(a=>a.channel===numbers.find(a=>a.number===msg.content.split(" ")[1]).channel))]=mailbox;
			fs.writeFile("mailbox.json",JSON.stringify(mailbox_storage),function(err){
				msg.reply((err?err:"Sent"));
			});
			recentCall[msg.channel.id]=undefined;
		}
		else if(message.content.startsWith(">mailbox")){
			var msg=message;
			var mailbox=mailbox_storage.find(a=>a.channel===msg.channel.id);
			if(!mailbox){
				mailbox_storage.push({
			    "channel":msg.channel.id,
			    "settings":{
			      "autoreply":"Sorry I am unavailable, leave a message"
			    },
			    "messages":[]
			  });
				//fs.writeFile("mailbox.json",JSON.stringify(mailbox_storage));
				var mailbox=mailbox_storage.find(a=>a.channel===msg.channel.id);
			}
			switch(msg.content.split(" ")[1]){
				case "settings":
				if(!msg.content.split(" ")[2]){
					var embed=new Discord.RichEmbed();
					embed.setTitle(":tools: Mailbox Settings");
					embed.setDescription(Object.keys(mailbox.settings).map((a,b)=>a+" `"+mailbox.settings[a]+"`\n*Change the settings with `>mailbox settings [setting name] [value]`*"));
					msg.channel.send({embed:embed});
				} else {
					if(mailbox.settings[msg.content.split(" ")[2]]){
						if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
							message.reply("You don't have `Manage Server` permission!");
						}
						else {
							mailbox.settings[msg.content.split(" ")[2]]=msg.content.replace(">mailbox settings "+msg.content.split(" ")[2]+" ","");
							mailbox_storage[mailbox_storage.indexOf(mailbox_storage.find(a=>a.channel===msg.channel.id))]=mailbox;
							fs.writeFile("mailbox.json",JSON.stringify(mailbox_storage),function(err){
								msg.reply((err?err:"Saved."));
								mailbox_storage=JSON.parse(fs.readFileSync("mailbox.json","utf8"));
							});
						}
					}
				}
				break;
				case "messages":
				if(!mailbox.messages){
					var embed=new Discord.RichEmbed();
					embed.setTitle(":mailbox_with_no_mail: No messages!");
					msg.channel.send({embed:embed});
					return;
				}
				if(!msg.content.split(" ")[2]){
					var embed=new Discord.RichEmbed();
					embed.setTitle(":mailbox_with_mail: Messages");
					embed.setDescription("**`"+mailbox.messages.length+"` Messages**\n\n"+mailbox.messages.map(m=>{
						return "**ID:** `"+m.id+"`\n**From:** "+m.from+"\n**Message:**```\n"+m.message+"\n```\n\n"
					}));
					embed.setFooter("Message options: `>mailbox messages [id]`");
					msg.channel.send({embed:embed});
				} else {
					if(!mailbox.messages.find(a=>a.id===msg.content.split(" ")[2])){
						var embed=new Discord.RichEmbed();
						embed.setTitle(":question: I can't find that");
						msg.channel.send({embed:embed});
						return;
					}
					var message=mailbox.messages.find(a=>a.id===msg.content.split(" ")[2]);
					switch(msg.content.split(" ")[3]){
						case "delete":
						if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
							message.reply("You don't have `Manage Server` permission!");
						}
						else {
							mailbox.messages.splice(mailbox.messages.indexOf(message),1);
							mailbox_storage[mailbox_storage.indexOf(mailbox_storage.find(a=>a.channel===msg.channel.id))]=mailbox;
							fs.writeFile("mailbox.json",JSON.stringify(mailbox_storage),function(err){
								msg.reply((err?err:"Deleted!"));
								mailbox_storage=JSON.parse(fs.readFileSync("mailbox.json","utf8"));
							});
						}
						break;
						case "callback":
						msg.reply("`>call "+message.from+"`");
						break;
						default:
						var embed=new Discord.RichEmbed();
						embed.setTitle(":question: What would you like to do?");
						embed.setDescription("`delete` Delete the message\n`callback` Call the caller back");
						embed.setFooter(">mailbox messages "+msg.content.split(" ")[2]+" <Option>");
						msg.channel.send({embed:embed});
					}
				}
				break;
				default:
				var embed=new Discord.RichEmbed();
				embed.setTitle(":mailbox: Mailbox");
				embed.setDescription((mailbox.messages.length?"**`"+mailbox.messages.length+"` Messages**\n*View them with `>mailbox messages`*\n\n":"")+"**Mailbox Settings**\n"+Object.keys(mailbox.settings).map((a,b)=>a+" `"+mailbox.settings[a]+"`\n*Change the settings with `>mailbox settings`*"));
				msg.channel.send({embed:embed});
			}
		}
		/*else if (message.content.startsWith(">vcall")){
			var msg=message;
			if(!msg.member.voiceChannel){
				var embed=new Discord.RichEmbed();
				embed.setTitle(":x::speaking_head: You need to be in a voice channel for that");
				embed.setColor("RED");
				msg.channel.send({embed:embed});
				return;
			}
			if(!msg.member.voiceChannel.joinable){
				var embed=new Discord.RichEmbed();
				embed.setTitle(":x: I don't have permission to join");
				embed.setColor("RED");
				msg.channel.send({embed:embed});
				return;
			}
			var channel=msg.member.voiceChannel;
			channel.join().then(connection => {
			 	var receiver = connection.createReceiver();
				receiver.createOpusStream(msg.author);
				bot.channels.get("348880023719247873").join().then((c)=>{
					receiver.on('opus',function(a,b){
						var rate = 48000;
						var encoder = new opus.OpusEncoder( rate );

						// Encode and decode.
						var frame_size = rate/100;
						var encoded = encoder.encode( b, frame_size );
						var decoded = encoder.decode( encoded, frame_size );

						// or create streams
						var channels = 2;
						var opusEncodeStream = new opus.Encoder(rate, channels, frame_size);
						var opusDecodeStream = new opus.Decoder(rate, channels, frame_size);
						c.playOpusStream(opusDecodeStream);
					})
				})

			});
		}*/
		else if (message.content.startsWith(">dial") || message.content.startsWith(">call")){
			var yournumber = message.content.split(" ").slice(1).join(" ");
			callNumber(yournumber,message,call,mynumber);
		}
		else if (message.content === ">rdial" || message.content === ">rcall"){
			var yournumber = phonebook[Math.floor(Math.random() * phonebook.length)].number;
			if (yournumber.startsWith("0500")) {
				message.reply(":x: Dialing error: Payphone numbers (`05XX` prefix) cannot receive calls.");
				return;
			}
			var yourchannel = numbers.find(function(item) {
				return item.number === yournumber;
			});
			if (yourchannel === undefined) {
				message.reply(":x: Dialing error: The number `"+yournumber+"` is unavailable to dial. It could be deleted or hidden from the bot. Please try randomly dialling again, as alot of servers have been lost due to DiscordTel's deletion by Discord.");
				return;
			}
			yourchannel = yourchannel.channel;
			if (mynumber === undefined) {
				message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from a channel that has DiscordTel service.");
				return;
			}
			if (mynumber.number === "*611") {
				mynumber.number ="08006113835";
			}
			if (yournumber === mynumber.number) {
				message.reply(":thinking: Sorry, forgot what I was going to do. Could you please type `>rdial` again?");
				return;
			}
			mynumber = mynumber.number;
			var mychannel = message.channel.id;
			if (bot.channels.get(yourchannel) === undefined) {
				message.reply(":x: Dialing error: The number `"+yournumber+"` is unavailable to dial. It could be deleted or hidden from the bot. Please try randomly dialling again, as alot of servers have been lost due to DiscordTel's deletion by Discord.");
				return;
			}
			var yourcall = calls.find(function(item) {
				if (	item.from.number === yournumber) {
					return item.from.number === yournumber;
				}
				else if (item.to.number === yournumber) {
					return item.to.number === yournumber;
				}
			});
			if (yourcall !== undefined) {
				message.reply(":x: Dialing error: The number you dialed is already in a call.");
				return;
			}
			if (mynumber.year < new Date().getFullYear()) {
				message.reply(":x: Dialing error: Your number has expired! Renew it by dialing `*233`.");
				return;
			} else if (mynumber.year === new Date().getFullYear() && mynumber.month <= new Date().getMonth()) {
				message.reply(":x: Dialing error: Your number has expired! Renew it by dialing `*233`.");
				return;
			}
 			message.reply(":telephone: Dialing `"+yournumber+"`... You are able to `>hangup`.");
			bot.channels.get("282253502779228160").send(":telephone: A **normal** call is established between channel "+message.channel.id+" and channel "+yourchannel+" by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
			calls.push({from:{channel:mychannel,number:mynumber},to:{channel:yourchannel,number:yournumber},status:false,time:Date.now()});
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get(yourchannel).send("You received a call from `("+mynumber.split("")[0]+mynumber.split("")[1]+mynumber.split("")[2]+mynumber.split("")[3]+") "+mynumber.split("")[4]+mynumber.split("")[5]+mynumber.split("")[6]+"-"+mynumber.split("")[7]+mynumber.split("")[8]+mynumber.split("")[9]+mynumber.split("")[10]+"`. Type `>pickup` or `>hangup`.");
			setTimeout(function(){
				var call = calls.find(function(item) {
					return item.from.channel === message.channel.id;
				});
				if (call !== undefined) {
					call = calls.find(function(item) {
						if (	item.from.channel === message.channel.id) {
							return item.from.channel === message.channel.id;
						}
						else if (item.to.channel === message.channel.id) {
							return item.to.channel === message.channel.id;
						}
						else {return undefined;}
					});
					if (call.status === false && call.time <= Date.now() - 120000) {
						message.reply(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
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
	else if (!message.author.bot && pbstatus !== undefined && !blacklisted(message.author.id) && pbstatus.user === message.author.id) {
		if (message.content === "0" ) {
			if (pbstatus.status === "9" || pbstatus.status === "10" || pbstatus.status === "11" || pbstatus.status === "12") {
				nsguild.splice(nsguild.indexOf(nssetup), 1);
			}
			message.reply(":negative_squared_cross_mark: You hung up the call.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (pbstatus.status === "0" && message.content === "1") {
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "1"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.reply("Input a number in number-only format.");
		}
		else if (pbstatus.status === "1" && message.content !== "9" && message.content !== "0") {
			if (isNaN(message.content)) {
				message.reply("This is not a valid 11-digit number. Input the number you want to look up correctly.");
				setTimeout(function() {
					message.reply(":negative_squared_cross_mark: The call was hung up.");
					fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
					fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
				},1000);
				return;
			}
			else {
				var result = numbers.find(function(item) {
					return item.number === message.content;
				});
				if (result === undefined) {
					message.reply("This number does not exist. It's probably available for registration!\nYou can type another number to check, type `9` to back to main menu, or type `0` to quit 411.");
					return;
				}
				result = result.number;
				var resultdesc = phonebook.find(function(item) {
					return item.number === message.content;
				});
				if (resultdesc !== undefined) {resultdesc = resultdesc.desc;}
				else {resultdesc = "<The number owner did not set a description>";}
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("This number exists!").addField("Number", "("+result.split("")[0]+result.split("")[1]+result.split("")[2]+result.split("")[3]+") "+result.split("")[4]+result.split("")[5]+result.split("")[6]+"-"+result.split("")[7]+result.split("")[8]+result.split("")[9]+result.split("")[10]).addField("Description", resultdesc).setFooter("You can type another number to check, type `9` to back to main menu, or type `0` to quit 411.\nTo add a description for your own number, type `9` then `3`. Requires server owner permission."));
			}
		}
		else if (pbstatus.status === "0" && message.content === "2") {
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "2"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.reply("Input a query. Type `9` to back to main menu, or type `0` to quit 411.");
		}
		else if (pbstatus.status === "2" && message.content !== "9" && message.content !== "0") {
			var results = phonebook.filter(function(item){
				return item.desc.toLowerCase().includes(message.content.toLowerCase());
			});
			if (results === []) {
				message.reply("No results. You can type another query to check, type `9` to back to main menu, or type `0` to quit 411.");
			}
			else {
				var reply = new Discord.RichEmbed().setColor("#007FFF").setTitle("Search Result").setDescription("`undefined` means the number owner did not set a description.").setFooter("You can type another query to check, type `9` to back to main menu, or type `0` to quit 411.");
				for (var i = 0; i < 11;i++) {
					if (results[i] !== undefined) {reply = reply.addField(results[i].number, results[i].desc);}
				}
				message.channel.sendEmbed(reply);
			}
		}
		else if (pbstatus.status !== "9" && pbstatus.status !== "10" && pbstatus.status !== "11" && pbstatus.status !== "12" && message.content === "9") {
			message.reply("Welcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "0"});
		}
		else if (pbstatus.status === "0" && message.content === "3") {
			if (!message.guild) {
				message.reply("**Yellowbook is not available for 0900 numbers.**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
				return;
			}
			if (!message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
				message.reply("**You don't have `Manage Server` permission.**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
				return;
			}
			if (mynumber === undefined) {
				message.reply("**This channel does not have a telephone number that is associated with.**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
				return;
			}
			message.reply("Please enter your new description here. Or:\n- Press `8` to remove your number from the registry and back to main menu;\n- Press `9` to back to 411 menu;\n- Press `0` to quit 411.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "3"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (pbstatus.status === "3" && message.content !== "8" && message.content !== "9" && message.content !== "0" && message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
			var myregistry = phonebook.find(function(item) {
				return item.number === mynumber.number;
			});
			if (myregistry === undefined) {myregistry = {number:mynumber.number,desc:""};}
			else {phonebook.splice(phonebook.indexOf(myregistry),1);}
			myregistry.desc = message.content;
			phonebook.push(myregistry);
			fs.writeFileSync("./phonebook.json", JSON.stringify(phonebook), "utf8");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.reply("**Registry edited!**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
		}
		else if (pbstatus.status === "3" && message.content === "8" && message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
			phonebook.splice(myregistry,1);
			fs.writeFileSync("./phonebook.json", JSON.stringify(phonebook), "utf8");
			message.reply("**Registry removed!**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (pbstatus.status === "0" && message.content === "4") {
			message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Special Numbers").setDescription("Here are the special numbers. Troll-calling any of these numbers can result in termination of service.").addField("*233", "Account balance and number renewing (Auto)").addField("*411", "The Phonebook (Auto)").addField("*611", "Customer Support").setFooter("To go back to 411 menu, press `9`. To quit 411, press `0`."));
		}
		else if (pbstatus.status === "4" && mynumber !== undefined) {
			if (isNaN(message.content)) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Not a number!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.").setFooter("To hang up, press `0`."));
				return;
			}
			if (parseInt(message.content) <= 0) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("HEY! HOW DARE YOU! LUCKILY I PATCHED IT SO YOU CAN NEVER GET FREE CREDITS OUT OF MY OWN POCKET! HAHAHA!!!!!!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.").setFooter("To hang up, press `0`."));
				return;
			}
			if (account.balance < parseInt(message.content) * 500) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Insufficient fund!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.").setFooter("To hang up, press `0`."));
				return;
			}
			if (parseInt(message.content) > 12) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Max 12 months in 1 renew.").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.").setFooter("To hang up, press `0`."));
				return;
			}
			accounts.splice(accounts.indexOf(account), 1);
			account.balance -= parseInt(message.content) * 500;
			accounts.push(account);
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			numbers.splice(numbers.indexOf(mynumber), 1);
			if (mynumber.year < new Date().getFullYear()) {
				mynumber.month += new Date().getMonth() + 1 + parseInt(message.content);
				mynumber.year = new Date().getFullYear();
			}
			else if (mynumber.year === new Date().getFullYear() && mynumber.month <= new Date().getMonth() + 1) {
				mynumber.month = new Date().getMonth() + 1 + parseInt(message.content);
			}
			else {
				mynumber.month += parseInt(message.content);
			}
			if (mynumber.month > 12) {
				mynumber.month = mynumber.month - 12;
				mynumber.year += 1;
			}
			numbers.push(mynumber);
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#32CD32").setTitle("Success: Number renewed!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "See [this page](http://discordtel.readthedocs.io/en/latest/Payment/) for details.").setFooter("To hang up, press `0`."));
		}
		else if (pbstatus.status === "5") {
			if (!isNaN(message.content) && message.content.startsWith(cprefix) && message.content.length === 11) {
				var duplicate = numbers.find(function(item) {
					return item.number === message.content;
				});
				if (duplicate === undefined) {
					var month = new Date().getMonth() + 1;
					numbers.push({channel: message.channel.id, number: message.content, year: new Date().getFullYear(), month: month});
					fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
					bot.channels.get("282253502779228160").send(":green_book: Number `"+message.content+"` is __self-assigned__ to channel "+message.channel.id+" by "+message.author.username+".");
					message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Done!").setDescription("Here's your service information. Should you have any questions, don't hesitate to dial `*611`.").addField("Number", message.content).addField("Expiration",new Date().getFullYear() + "/" + month).setFooter("You can register in the phonebook (*411) to receive random calls. To do so, dial *411 and press 3.\nYou have finished the wizard."));
					fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
					fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
					return;
				}
				else {
					message.reply("Number is occupied. Try again by typing a new number, or type `0` to quit.");
				}
			}
			else if (message.content === "0") {
				message.reply("You've quit the wizard.");
				fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
				fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			}
			else {
				message.reply("I don't understand. Please retype the number. Make sure the number starts with `"+cprefix+"` followed by 7 digits (11 digits altogether). Type `0` to quit.");
			}
		}
		else if (pbstatus.status === "6") {
			if (!isNaN(message.content) && message.content.startsWith("0900") && message.content.length === 11) {
				var duplicate = numbers.find(function(item) {
					return item.number === message.content;
				});
				if (duplicate === undefined) {
					var month = new Date().getMonth() + 1;
					numbers.push({channel: message.channel.id, number: message.content, year: new Date().getFullYear(), month: month});
					fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
					bot.channels.get("282253502779228160").send(":green_book: Number `"+message.content+"` is __self-assigned__ to channel "+message.channel.id+" by "+message.author.username+".");
					message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Done!").setDescription("Here's your service information. Should you have any questions, don't hesitate to dial `*611`.").addField("Number", message.content).addField("Expiration",new Date().getFullYear() + "/" + month).setFooter("You have finished the wizard."));
					fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
					fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
					return;
				}
				else {
					message.reply("Number is occupied. Try again by typing a new number, or type `0` to quit.");
				}
			}
			else if (message.content === "0") {
				message.reply("You've quit the wizard.");
				fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
				fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			}
			else {
				message.reply("I don't understand. Please retype the number. Make sure the number starts with `0900` followed by 7 digits (11 digits altogether). Type `0` to quit.");
			}
		}
	}
	else if (!message.author.bot && call !== undefined && !message.author.bot && !blacklisted(message.author.id)) {
		if (call.status === false && message.content === ">pickup" && message.channel.id === call.to.channel) {
			message.reply(":white_check_mark: You pick up the call.");
			if (bot.channels.get(call.from.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked. Please report this situation to *611, as it could be a troll call.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
				return;
			}
			bot.channels.get(call.from.channel).send(":heavy_check_mark: The call has been picked up!");
			calls.splice(calls.indexOf(call), 1);
			call.status = true;
			call.time = Date.now();
			calls.push(call);
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get("282253502779228160").send(":white_check_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is picked up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
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
						bot.channels.get(call.from.channel).send(":negative_squared_cross_mark: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
						bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
						if(!mailbox_storage.find(a=>a.channel===call.to.channel)){
							bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
							return;
						}
						bot.channels.get(call.from.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.to.channel).settings.autoreply);
						bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
						recentCall[call.from.channel]=call.to.number;
						bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
					}
				}
			},120000);
		}
		else if (message.content === ">hangup" && message.channel.id === call.to.channel) {
			message.reply(":negative_squared_cross_mark:  You hung up the call.");
			bot.channels.get("282253502779228160").send(":negative_squared_cross_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is hung up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+") on the \"to\" side.");
			calls.splice(calls.indexOf(call), 1);
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
			if (bot.channels.get(call.from.channel) !== undefined) {
				if(!mailbox_storage.find(a=>a.channel===call.to.channel)){
					bot.channels.get(call.from.channel).send(":x: Call ended; their mailbox isn't setup");
					return;
				}
				bot.channels.get(call.from.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.to.channel).settings.autoreply);
				bot.channels.get(call.from.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
				recentCall[call.from.channel]=call.to.number;
				/*bot.channels.get(call.from.channel).createCollector(m=>{return (m.content.toLowerCase()==="yes"||m.content.toLowerCase()==="no")&&m.author.id===msg.author.id},{"max":10,"maxMatches":1,"time":20}).on('collect',function(m){
					switch(m.content){
						case "yes":
						msg.reply(JSON.stringify(call.to));
						bot.channels.get(call.from.channel).send(":question: What message would you like to send?");
						bot.channels.get(call.from.channel).createCollector(m=>m.author.id===msg.author.id,{"max":10,"maxMatches":1,"time":60}).on('collect',function(m){
							mailbox_storage.find(a=>a.channel===call.to.channel).messages.push({
								"id":guid(),
								"from":call.from
							})
						});
						break;
						case "no":
						bot.channels.get(call.from.channel).send("No message will be sent");
						break;
						default:
						bot.channels.get(call.from.channel).send(":question: Error");
						break;
					}
				});*/
			}
		}
		else if (message.content === ">hangup" && message.channel.id === call.from.channel) {
			message.reply(":negative_squared_cross_mark:  You hung up the call.");
			bot.channels.get("282253502779228160").send(":negative_squared_cross_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is hung up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+") on the \"from\" side.");
			calls.splice(calls.indexOf(call), 1);
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
			if (bot.channels.get(call.to.channel) !== undefined) {
				if(!mailbox_storage.find(a=>a.channel===call.from.channel)){
					bot.channels.get(call.to.channel).send(":x: Call ended; their mailbox isn't setup");
					return;
				}
				bot.channels.get(call.to.channel).send(":x: "+mailbox_storage.find(a=>a.channel===call.from.channel).settings.autoreply);
				bot.channels.get(call.to.channel).send(":question: Would you like to leave a message? `>message [number] [message]`");
				recentCall[call.to.channel]=call.from.number;
				/*bot.channels.get(call.to.channel).createCollector(m=>{return (m.content.toLowerCase()==="yes"||m.content.toLowerCase()==="no")&&m.author.id===msg.author.id;},{"max":10,"maxMatches":1,"time":20}).on('collect',function(m){
					switch(m.content){
						case "yes":
						msg.reply(JSON.stringify(call.to));
						bot.channels.get(call.to.channel).send(":question: What message would you like to send?");
						bot.channels.get(call.to.channel).createCollector(m=>m.author.id===msg.author.id,{"max":10,"maxMatches":1,"time":60}).on('collect',function(m){
							mailbox_storage.find(a=>a.channel===call.from.channel).messages.push({
								"id":guid(),
								"from":call.to
							})
						});
						break;
						case "no":
						bot.channels.get(call.to.channel).send("No message will be sent");
						break;
						default:
						bot.channels.get(call.to.channel).send(":question: Error");
						break;
					}
				});*/
			}
		}
		else if (message.channel.id === call.from.channel && call.status === true) {
			if (call.to.channel === "281816105289515008" && call.wage === undefined) {
				call.wage = true;
			}
			if (bot.channels.get(call.to.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
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
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
			if (call.charge === true) {
				accounts.splice(accounts.indexOf(account), 1);
				account.balance -= 8;
				accounts.push(account);
				if (account.balance === 0) {
					message.reply(":x: You used up your credits. We're now hanging up your call...");
					calls.splice(calls.indexOf(call), 1);
					fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
					bot.channels.get(call.to.channel).send(":x: The caller used up his/her credits. We've hung up your call.");
					return;
				}
			}
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
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
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
				fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			}
			if (bot.channels.get(call.from.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
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
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
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
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
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
			process.on("unhandledRejection", console.log)
		}
	}
});
/*
bot.on("messageReactionAdd", (reaction, user) => {
	var theorder = orders.find(function(item){return item.message === reaction.message.id});
	if (reaction.message.channel.id === "310144658552651777" && reaction.emoji.name === "\u2705" && chef(user.id) && theorder !== undefined && theorder.status === 2) {
		reaction.message.delete();
		var account = accounts.find(function(item) {
			return item.user === user.id;
		});
		if (account === undefined) {
			account = {user:user.id,balance:theorder.order.split(" ").length * 3};
			accounts.push(account);
			bot.users.get(user.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>\n(Don't worry, salary is added to your new account)");
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		}
		else {
			accounts.splice(accounts.indexOf(account), 1);
			account.balance += theorder.order.split(" ").length * 3;
			accounts.push(account);
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		}
		bot.channels.get("282253502779228160").send(":moneybag: Restaurant worker "+user.username+" earned ¥"+theorder.order.split(" ").length * 3+" for cooking.");
		user.send("Order accepted. You earned __"+theorder.order.split(" ").length * 3+" credits__ for cooking.");
		setTimeout(function(){
			bot.channels.get(theorder.channel).createInvite({
				maxAge: 0, // 0 = Infinity
				maxUses: 0 // ^^^^^^^^^^^^
			}).then(invite => {
				user.send("Time to deliver! The invite is "+invite.url+" . They ordered `"+theorder.ordertext+"` with note `"+theorder.note+"`.");
			});
			orders.splice(orders.indexOf(theorder), 1);
			fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
		}, theorder.order.split(" ").length * 120000);
	}
	else if (reaction.message.channel.id === "310144658552651777" && reaction.emoji.name === "\u274c" && chef(user.id) && theorder !== undefined && theorder.status === 2) {
		user.send("Order rejected.");
		bot.users.get(theorder.user).send("Your order is rejected by our restaurant worker `"+user.username+"#"+user.discriminator+"`.");
		reaction.message.delete();
		orders.splice(orders.indexOf(theorder), 1);
		fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
	}
});*/
bot.on("guildCreate", guild => {
	if (guild.defaultChannel === undefined) {
		guild.owner.send("(Discord removed default channel. So no matter who added DiscordTel, I'm sending this to the owner of server `"+guild.name+"`, which is you!)\n\nHello guys, It's **DiscordTel**, the telephone solution for Discord! To learn more, type `>info`. To get command help, type `>help`. To get a number, read <http://discordtel.rtfd.io/> and then type `>wizard` in the channel you wish to enable the service.\n**Warning:** No troll calls. You are required to read the documentation. To keep your number available you need to renew your number which is instructed at <http://discordtel.readthedocs.io/en/latest/Payment/>.\n*ToS Compliance: <http://discordtel.readthedocs.io/en/latest/ToS%20Compliance/>*");
	} else {
		guild.defaultChannel.send("Hello guys, It's **DiscordTel**, the telephone solution for Discord! To learn more, type `>info`. To get command help, type `>help`. To get a number, read <http://discordtel.rtfd.io/> and then type `>wizard` in the channel you wish to enable the service.\n**Warning:** No troll calls. You are required to read the documentation. To keep your number available you need to renew your number which is instructed at <http://discordtel.readthedocs.io/en/latest/Payment/>.\n*ToS Compliance: <http://discordtel.readthedocs.io/en/latest/ToS%20Compliance/>*");
	}
	bot.channels.get("282253502779228160").send(":inbox_tray: Joined "+guild.name+" ("+guild.id+"). Currently in "+bot.guilds.array().length+" servers.");
	bot.user.setPresence({game:{name:bot.guilds.array().length+" servers | >help", type: 0}});
		request.post({
		url: "https://bots.discord.pw/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": process.env.BOTS_PW_TOKEN
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBots returns success: "+ body);
	});
	request.post({
		url: "https://discordbots.org/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": process.env.DBL_ORG_TOKEN
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBotsList returns success: "+ body);
	});
});
bot.on("guildDelete", guild => {
	bot.channels.get("282253502779228160").send(":outbox_tray: Left "+guild.name+" ("+guild.id+"). Currently in "+bot.guilds.array().length+" servers.");
	bot.user.setPresence({game:{name:bot.guilds.array().length+" servers | >help", type: 0}});
		request.post({
		url: "https://bots.discord.pw/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": process.env.BOTS_PW_TOKEN
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBots returns success: "+ body);
	});
	request.post({
		url: "https://discordbots.org/api/bots/377609965554237453/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": process.env.DBL_ORG_TOKEN
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBotsList returns success: "+ body);
	});
});
var jackpot = schedule.scheduleJob({hour: 0, minute: 0, second: 0}, function() {
	dailies = [];
	fs.writeFileSync("./daily.json", JSON.stringify(dailies), "utf8");
	if (award.amount !== 0 && award.users !== []) {
		var winner = award.users[Math.floor(Math.random()*award.users.length)];
		var leaccount = accounts.find(function(item) {
			return item.user === winner;
		});
		if (leaccount === undefined) {
			leaccount = {user:winner,balance:award.amount};
			accounts.push(leaccount);
			bot.users.get(winner).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		}
		else {
			accounts.splice(accounts.indexOf(leaccount), 1);
			leaccount.balance += award.amount;
			accounts.push(leaccount);
		}
		fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		bot.users.get(winner).send("**YOU WON THE LOTTERY!**\n¥"+award.amount);
		bot.channels.get("282253502779228160").send(":tada: User __"+bot.users.get(winner).username+"#"+bot.users.get(winner).discriminator+"__ ("+winner+") won the lottery which valued at "+award.amount+"");
		award = {users:[], amount:0};
		fs.writeFileSync("./award.json", JSON.stringify(award), "utf8");
	}
});
var wage = schedule.scheduleJob({date: 1, hour: 0, minute: 0, second: 0}, function(){
	bot.guilds.get('281815661317980160').roles.get('281815839936741377').members.forEach(u => {
		var account = accounts.find(function(item) {
			return item.user === u.id;
		});
		if (bot.guilds.get('281815661317980160').roles.get('284443515516354560').members.map(member => member.id).indexOf(u.id) > -1) {
			accounts.splice(accounts.indexOf(account), 1);
			account.balance += 4000;
			accounts.push(account);
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			bot.users.get(u.id).send("Here, have your $4000 wage! Your current balance is $"+account.balance+".");
		}
		else {
			accounts.splice(accounts.indexOf(account), 1);
			account.balance += 2000;
			accounts.push(account);
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			bot.users.get(u.id).send("Here, have your $2000 wage! Your current balance is $"+account.balance+".");
		}
	});
	numbers.forEach(n => {
		if (n.year === new Date().getFullYear() && n.month === new Date().getMonth()) {
			bot.channels.get(n.channel).send("Your number is expired! Pay your monthly fee by typing `>dial *233`!");
		}
	});
});
setInterval(function(){
	request({url:"http://discoin.sidetrip.xyz/transactions", headers: {'Authorization': process.env.DISCOIN_TOKEN}}, function(error, response, body) {
		if (!error && response.statusCode === 200) {
			body = JSON.parse(body);
			body.forEach(t => {
				var leaccount = accounts.find(function(item) {
					return item.user === t.user;
				});
				if (leaccount === undefined) {
					leaccount = {user:t.user,balance:t.amount};
					accounts.push(leaccount);
					bot.users.get(t.user).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
				}
				else {
					accounts.splice(accounts.indexOf(leaccount), 1);
					leaccount.balance += t.amount;
					accounts.push(leaccount);
				}
				fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
				bot.users.get(t.user).send("You've received ¥"+t.amount+" from Discoin (Transaction ID: "+t.receipt+").\n*You can check all your transactions at <http://discoin.sidetrip.xyz/record>.*");
				bot.channels.get("282253502779228160").send(":repeat: User __"+bot.users.get(t.user).username+"#"+bot.users.get(t.user).discriminator+"__ ("+t.user+") received ¥"+t.amount+" from Discoin.");
			});
		}
	});
}, 60000);
bot.login(process.env.DISCORD_TOKEN);
