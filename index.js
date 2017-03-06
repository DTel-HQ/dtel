// WARNING BEFORE USE:
// Search "Censored" and replace them with real ones

const Discord = require("discord.js");
const fs = require("fs");
const util = require("util");
var numbers = JSON.parse(fs.readFileSync("./numbers.json", "utf8"));
var calls = JSON.parse(fs.readFileSync("./call.json", "utf8"));
var phonebook = JSON.parse(fs.readFileSync("./phonebook.json", "utf8"));
var fouroneone = JSON.parse(fs.readFileSync("./fouroneone.json", "utf8"));
var accounts = JSON.parse(fs.readFileSync("./account.json", "utf8"));
var support = user_id => bot.guilds.get('281815661317980160').roles.get('281815839936741377').members.map(member => member.id).indexOf(user_id) > -1;
var verified = user_id => bot.guilds.get('269262004852621312').roles.get('269276590322614274').members.map(member => member.id).indexOf(user_id) > -1;
var request = require("request");
const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("I am ready!");
    bot.user.setPresence({game:{name:bot.guilds.array().length+" servers | >help"}});
	request.post({
		url: "https://bots.discordlist.net/api",
		form: {
			"token": "Censored",
			"servers": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DList returns success: "+ body);
	});
	request.post({
		url: "https://bots.discord.pw/api/bots/224662505157427200/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": "Censored"
		},
		json: {
			"server_count": bot.guilds.array().length
		}
	}, function(error, response, body) {
		console.log("DBots returns success: "+ body);
	});
});

bot.on("message", message => {
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
	if (message.author.id === "172002275412279296" && message.content.startsWith(":atm:  |  **Transfer Receipt**")) {
		var receipt = message.content.split("¥ ")[1];
		var amount = receipt.split(" from")[0];
		var username = receipt.split(" from")[1].split(" (ID:")[0];
		var user = receipt.split("(ID: ")[1].replace(")```", "");
		var theaccount = accounts.find(function(item) {
			return item.user === user;
		});
		if (theaccount === undefined) {
			theaccount = {user:user,balance:0};
			accounts.push(theaccount);
			fs.writeFile("account.json", JSON.stringify(accounts), "utf8");
			bot.users.get(theaccount.user).sendMessage("You don't have an account created...Creating an account for you! Please also read for information on payment: <https://gist.github.com/austinhuang0131/a714a401f67c8ce9fa0fcd7f4d1e2017#payment>");
		}
		accounts.splice(accounts.indexOf(theaccount), 1);
		theaccount.balance += parseInt(amount);
		accounts.push(theaccount);
		fs.writeFile("./account.json", JSON.stringify(accounts), "utf8");
		bot.users.get(theaccount.user).sendMessage(":yen: We've received ¥"+amount+" from your Tatsumaki credit account. You now have ¥"+theaccount.balance+".");
		bot.channels.get("282253502779228160").sendMessage(":yen: Received ¥"+amount+" from"+username+" ("+user+"). The user now has ¥"+theaccount.balance+".");
	}
	else if (call === undefined && pbstatus === undefined && message.author.id !== "224662505157427200") {
		if (message.content === ">help") {
		  var help = new Discord.RichEmbed().setColor("#007FFF").setTitle("List of Commands").setDescription("For more information, use `>info`.").addField(">dial", "Dial a number using your own number").addField(">pdial", "Dial a number using public payphone, 8 credits per message").addField(">rdial","Dial a random number in the phonebook").addField(">info", "Display info about applying for a number and user guides");
		  message.channel.sendEmbed(help);
		}
		else if (message.content === ">info") {
		  message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("DTel Information").setDescription("For command help, use `>help`.").addField("Getting a number", "Before getting a number, you need to reserve a channel for your phone. Once you have done this, you'll have to call `*611` using public phone (`>pdial *611`) to get a number. The agent will check your information and assign you a number.").addField("Number prefixes", "Most numbers have a prefix of `03XX`, where `XX` represents your shard number. Numbers starting with `0800` or `0844`, as well as short codes starting with `*` or `#` are for special uses. Numbers starting with `05XX` are public payphones which can be only called by `>pdial`.").addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.\nAfter recharging, dial `*233` to check balance.").addField("Phonebook and setup your registry","`>dial *411`").addField("Invite the bot", "https://discordapp.com/oauth2/authorize?client_id=224662505157427200&scope=bot&permissions=84997\n\"Embed Links\" is optional, depends on whether you want the bot to show embed links in calls or not.\n\"Ban Members\" is optional, depends on whether you want Discord Bans agents to solve raids or not.").addField("Official Server", "https://discord.gg/RN7pxrB").addField("Detailed Guide", "http://discordtel.rtfd.io"));
		}
		else if (message.content.startsWith(">assign") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII!");
			    return;
			}
			var number = numbers.find(function(item) {
				return item.channel === message.content.split(" ")[1];
			});
			if (number !== undefined) {
			    message.reply("WHAT THE F\\*\\*\\* ARE YOU DOING? THIS NUMBER IS ALREADY **REGISTERRED**, YOU BAKA!");
				return;
			}
			numbers.push({channel: message.content.split(" ")[1], number: message.content.split(" ")[2], year: new Date().getFullYear(), month: new Date().getMonth() + 1});
			fs.writeFile("./numbers.json", JSON.stringify(numbers), "utf8");
			bot.channels.get("282253502779228160").sendMessage(":green_book: Number `"+message.content.split(" ")[2]+"` is assigned to channel "+message.content.split(" ")[1]+" by "+message.author.username+".");
			message.reply("Done. Now turn back to your client!");
		}
		else if (message.content.startsWith(">deassign") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! (You do need 2 variables to prevent misdeleting)");
			    return;
			}
			var number = numbers.find(function(item) {
				return item.channel === message.content.split(" ")[1];
			});
			if (number === undefined) {
			    message.reply("WHAT THE F\\*\\*\\* ARE YOU DOING? THIS NUMBER IS **NOT EVEN REGISTERRED**, YOU BAKA!");
				return;
			}
			if (number.number !== message.content.split(" ")[2]) {
			    message.reply("WHAT THE F\\*\\*\\* ARE YOU DOING? THIS NUMBER **DOES NOT BELONG TO THAT CHANNEL**, YOU BAKA!");
				return;
			}
			numbers.splice(numbers.indexOf(number), 1);
			fs.writeFile("./numbers.json", JSON.stringify(numbers), "utf8");
			message.reply("Done. RIP in peace");
			bot.channels.get("282253502779228160").sendMessage(":closed_book: Number `"+message.content.split(" ")[2]+"` is DE-assigned to channel "+message.content.split(" ")[1]+" by "+message.author.username+".");
		}
        else if (message.content.startsWith(">eval") && message.author.id === "155784937511976960") {
	        var suffix = message.content.substring(6);
            try {
                message.channel.sendMessage(":arrow_down: `INPUT:`\n```js\n" + suffix + "```\n:arrow_up: `OUTPUT:`\n```js\n" + util.inspect(eval(suffix)) + "```");
            }
            catch (e) {
                message.channel.sendMessage(":arrow_down: `INPUT:`\n```js\n" + suffix + "```\n:sos: `ERROR:`\n```js\n" + e.stack + "```");
            }
        }
		else if (message.content.startsWith(">backdoor") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
			    message.reply("INPUT THE CHANNEL ID, YOU BAKA!");
			    return;
			}
			if (bot.channels.get(message.content.split(" ")[1]) === undefined) {
				message.reply("Not a valid channel.");
				return;
			}
			bot.channels.get(message.content.split(" ")[1]).createInvite({
                maxAge: 0, // 0 = Infinity
                maxUses: 0 // ^^^^^^^^^^^^
            }).then(invite => {
                message.author.sendMessage(invite.url);
            });
		}
		else if (message.content.startsWith(">extend") && support(message.author.id)) {
			var lenumber = numbers.find(function(item) {
				return item.number === message.content.split(" ")[1];
			});
			if (lenumber === undefined) {
				message.reply("Not a valid number.");
				return;
			}
			numbers.splice(numbers.indexOf(lenumber), 1);
			lenumber.month += parseInt(message.content.split(" ")[2]);
			if (lenumber.month > 12) {
				lenumber.month -= 12;
				lenumber.year += 1;
			}
			numbers.push(lenumber);
			fs.writeFile("./numbers.json", JSON.stringify(numbers), "utf8");
			message.reply("Success!");
			bot.channels.get("282253502779228160").sendMessage(":heavy_plus_sign: Support member "+message.author.username+" extended number `"+lenumber.number+"`'s expiry to "+lenumber.year+"/"+lenumber.month+".");
			bot.channels.get(lenumber.channel).sendMessage(":heavy_plus_sign: A support member has extended your number's expiry to "+lenumber.year+"/"+lenumber.month+".");
		}
		else if (message.content.startsWith(">ninfo") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
			    message.reply("INPUT THE CHANNEL ID, YOU BAKA!");
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
		else if (message.content.startsWith(">addcredit") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII! `>addcredit <User_ID> <Credit>`");
			    return;
			}
			var leaccount = accounts.find(function(item) {
				return item.user === message.content.split(" ")[1];
			});
			if (leaccount === undefined) {
				leaccount = {user:message.content.split(" ")[1],balance:0};
				accounts.push(leaccount);
				fs.writeFile("account.json", JSON.stringify(accounts), "utf8");
			}
			accounts.splice(accounts.indexOf(leaccount), 1);
			leaccount.balance += parseInt(message.content.split(" ")[2]);
			accounts.push(leaccount);
			fs.writeFile("account.json", JSON.stringify(accounts), "utf8");
			message.reply("Done.");
			bot.users.get(leaccount.user).sendMessage(":money_with_wings: A support member has added ¥"+message.content.split(" ")[2]+" into your account. You now have ¥"+leaccount.balance+".");
			bot.channels.get("282253502779228160").sendMessage(":money_with_wings: Support member "+message.author.username+" added ¥"+message.content.split(" ")[2]+" to <@"+leaccount.user+">.");
		}
		else if (message.content === ">dial *411") {if (mynumber === undefined) {
				message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from channels that has DiscordTel service.");
				return;
			}
			message.reply("Welcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content === ">dial *233" || message.content === ">pdial *233") {
			if (account === undefined) {
				account = {user:message.author.id,balance:0};
				accounts.push(account);
				fs.writeFile("account.json", JSON.stringify(accounts), "utf8");
				message.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <https://gist.github.com/austinhuang0131/a714a401f67c8ce9fa0fcd7f4d1e2017#payment>");
			}
			if (mynumber === undefined) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Current Account Status").addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("We have automatically hung up your call."));
				return;
			}
			else if (account.balance < 2000) {
				message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Current Number Status").setDescription("You have less than 2000 credits which means you cannot renew at all.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("We have automatically hung up your call."));
				return;
			}
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "4"});
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Current Number Status").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
		}
		else if (message.content.startsWith(">dial")){
			var yournumber = message.content.split(" ")[1];
			if (yournumber === undefined) {
				message.reply("Damn son, you forgot the number! `>dial <Number>`");
				return;
			}
			yournumber = message.content.split(" ")[1].replace(/a/ig, "2").replace(/b/ig, "2").replace(/c/ig, "2").replace(/d/ig, "3").replace(/e/ig, "3").replace(/f/ig, "3").replace(/g/ig, "4").replace(/h/ig, "4").replace(/i/ig, "4").replace(/j/ig, "5").replace(/k/ig, "5").replace(/l/ig, "5").replace(/m/ig, "6").replace(/n/ig, "6").replace(/o/ig, "6").replace(/p/ig, "7").replace(/q/ig, "7").replace(/r/ig, "7").replace(/s/ig, "7").replace(/t/ig, "8").replace(/u/ig, "8").replace(/v/ig, "8").replace(/w/ig, "9").replace(/x/ig, "9").replace(/y/ig, "9").replace(/z/ig, "9").replace(/-/ig, "").replace("(", "").replace(")", "").replace(" ", "");
			if (yournumber === "*611") {
				yournumber = "08006113835";
			}
			else if (yournumber === "911") {
				yournumber = "08000000911";
			}
			else if (isNaN(yournumber)) {
				message.reply("Please input the number you want to dial in a number-only format.\n:x: `>dial (0300) 000-0000`\n:white_check_mark: `>dial 03000000000`");
				return;
			}
			if (yournumber.startsWith("0500")) {
				message.reply(":x: Dialing error: Payphone numbers (`05XX` prefix) cannot receive calls.");
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
				message.reply(":x: Dialing error: The number you've dialed is expired. Contact the number owner to renew it.");
				return;
			}
			else if (yourchannel.year === new Date().getFullYear() && yourchannel.month <= new Date().getMonth()) {
				message.reply(":x: Dialing error: The number you've dialed is expired. Contact the number owner to renew it.");
				return;
			}
			yourchannel = yourchannel.channel;
			if (mynumber === undefined) {
				message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from channels that has DiscordTel service.");
				return;
			}
			if (mynumber.number === "*611") {
				mynumber.number ="08006113835";
			}
			if (yournumber === mynumber.number) {
				message.reply(":thinking: I am wondering why you are calling yourself.");
				return;
			}
			mynumber = mynumber.number;
			var mychannel = message.channel.id;
			if (bot.channels.get(yourchannel) === undefined) {
				message.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted or hidden from the bot. Please dial `*611` to get the number removed.");
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
 			message.reply(":telephone: Dialing... You are able to `>hangup`.");
			bot.channels.get("282253502779228160").sendMessage(":telephone: A **normal** call is established between channel "+message.channel.id+" and channel "+yourchannel+" by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
			calls.push({from:{channel:mychannel,number:mynumber},to:{channel:yourchannel,number:yournumber},status:false,time:Date.now()});
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get(yourchannel).sendMessage("You received a call from `("+mynumber.split("")[0]+mynumber.split("")[1]+mynumber.split("")[2]+mynumber.split("")[3]+") "+mynumber.split("")[4]+mynumber.split("")[5]+mynumber.split("")[6]+"-"+mynumber.split("")[7]+mynumber.split("")[8]+mynumber.split("")[9]+mynumber.split("")[10]+"`. Type `>pickup` or `>hangup`.");
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
						bot.channels.get(call.to.channel).sendMessage(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
		else if (message.content.startsWith(">pdial")){
			var yournumber = message.content.split(" ")[1];
			if (yournumber === undefined) {
				message.reply("Damn son, you forgot the number! `>pdial <Number>`");
				return;
			}
			yournumber = message.content.split(" ")[1].replace(/a/ig, "2").replace(/b/ig, "2").replace(/c/ig, "2").replace(/d/ig, "3").replace(/e/ig, "3").replace(/f/ig, "3").replace(/g/ig, "4").replace(/h/ig, "4").replace(/i/ig, "4").replace(/j/ig, "5").replace(/k/ig, "5").replace(/l/ig, "5").replace(/m/ig, "6").replace(/n/ig, "6").replace(/o/ig, "6").replace(/p/ig, "7").replace(/q/ig, "7").replace(/r/ig, "7").replace(/s/ig, "7").replace(/t/ig, "8").replace(/u/ig, "8").replace(/v/ig, "8").replace(/w/ig, "9").replace(/x/ig, "9").replace(/y/ig, "9").replace(/z/ig, "9").replace(/-/ig, "").replace("(", "").replace(")", "").replace(" ", "");
			if (yournumber === "*611") {
				yournumber ="08006113835";
			}
			if (yournumber === "911") {
				yournumber ="08000000911";
			}
			else if (isNaN(yournumber)) {
				message.reply("Please input the number you want to dial in a number-only format.\n:x: `>dial (0300) 000-0000`\n:white_check_mark: `>dial 03000000000`");
				return;
			}
			if (yournumber.startsWith("0500")) {
				message.reply(":x: Dialing error: Payphone numbers (`05XX` prefix) cannot receive calls.");
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
				message.reply(":x: Dialing error: The number you've dialed is expired. Contact the number owner to renew it.");
				return;
			}
			else if (yourchannel.year === new Date().getFullYear() && yourchannel.month <= new Date().getMonth()) {
				message.reply(":x: Dialing error: The number you've dialed is expired. Contact the number owner to renew it.");
				return;
			}
			yourchannel = yourchannel.channel;
			if (mynumber !== undefined) {
				if (yournumber === mynumber.number) {
					message.reply(":thinking: I am wondering why you are calling yourself.");
					return;
				}
			}
			mynumber = "05001234567";
			var mychannel = message.channel.id;
			if (bot.channels.get(yourchannel) === undefined) {
				message.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted or hidden from the bot. Please dial `*611` to get the number removed.");
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
			message.reply(":telephone: Dialing... You are able to `>hangup`.");
			var call = {from:{channel:mychannel,number:mynumber},to:{channel:yourchannel,number:yournumber},status:false};
			if (!yournumber.startsWith("08")) {
				call.charge = true;if (account === undefined) {
					account = {user:message.author.id,balance:0};
					accounts.push(account);
					fs.writeFile("account.json", JSON.stringify(accounts), "utf8");
					message.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <https://gist.github.com/austinhuang0131/a714a401f67c8ce9fa0fcd7f4d1e2017#payment>");
				}
				if (account.balance === 0) {
					message.reply(":x: Account error: You have used up your credit. Get some more. Dial `*233` for more information.");
					return;
				}
				else if (account.balance < 80) {
					message.reply(":warning: You have less than 80 credits ("+account.balance+" credits to be exact), which means you can only send less than 10 messages.");
				}
				else {
					message.reply(":information_source: We'll charge 8 credits for every message sent in this call. You have "+account.balance+" credits, currently.");
				}
			}
			call.time = Date.now();
			calls.push(call);
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get("282253502779228160").sendMessage(":telephone: A **payphone** call is established between channel "+message.channel.id+" and channel "+yourchannel+" by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
			bot.channels.get(yourchannel).sendMessage("You received a call from `("+mynumber.split("")[0]+mynumber.split("")[1]+mynumber.split("")[2]+mynumber.split("")[3]+") "+mynumber.split("")[4]+mynumber.split("")[5]+mynumber.split("")[6]+"-"+mynumber.split("")[7]+mynumber.split("")[8]+mynumber.split("")[9]+mynumber.split("")[10]+"`. Type `>pickup` or `>hangup`.");
			setTimeout(function(){
				call = calls.find(function(item) {
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
						bot.channels.get(call.to.channel).sendMessage(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
		else if (message.content === ">rdial"){
			var yournumber = phonebook[Math.floor(Math.random() * phonebook.length)].number;
			if (yournumber.startsWith("0500")) {
				message.reply(":x: Dialing error: Payphone numbers (`05XX` prefix) cannot receive calls.");
				return;
			}
			var yourchannel = numbers.find(function(item) {
				return item.number === yournumber;
			});
			yourchannel = yourchannel.channel;
			if (mynumber === undefined) {
				message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from channels that has DiscordTel service.");
				return;
			}
			if (mynumber.number === "*611") {
				mynumber.number ="08006113835";
			}
			if (yournumber === mynumber.number) {
				message.reply(":thinking: I am wondering why you are calling yourself.");
				return;
			}
			mynumber = mynumber.number;
			var mychannel = message.channel.id;
			if (bot.channels.get(yourchannel) === undefined) {
				message.reply(":x: Dialing error: Number is unavailable to dial. It could be deleted or hidden from the bot. Please dial `*611` to get the number removed.");
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
			bot.channels.get("282253502779228160").sendMessage(":telephone: A **normal** call is established between channel "+message.channel.id+" and channel "+yourchannel+" by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
			calls.push({from:{channel:mychannel,number:mynumber},to:{channel:yourchannel,number:yournumber},status:false,time:Date.now()});
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get(yourchannel).sendMessage("You received a call from `("+mynumber.split("")[0]+mynumber.split("")[1]+mynumber.split("")[2]+mynumber.split("")[3]+") "+mynumber.split("")[4]+mynumber.split("")[5]+mynumber.split("")[6]+"-"+mynumber.split("")[7]+mynumber.split("")[8]+mynumber.split("")[9]+mynumber.split("")[10]+"`. Type `>pickup` or `>hangup`.");
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
						bot.channels.get(call.to.channel).sendMessage(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
		else if (message.content.startsWith(">ban") && verified(message.author.id)) {
			if (message.mentions === undefined) {
				message.reply("MENTION SOMETHING, IDIOT!");
			}
			message.mentions.users.array().forEach(function(idiot) {
				message.guild.ban(idiot, 7);
			});
		}
	}
	else if (pbstatus !== undefined) {
		if (mynumber !== undefined) {
			var myregistry = phonebook.find(function(item) {
				return item.number === mynumber.number;
			});
		}
		if (pbstatus.status === "0" && message.content === "1" && pbstatus.user === message.author.id) {
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "1"});
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.reply("Input a number in number-only format.");
		}
		else if (pbstatus.status === "1" && pbstatus.user === message.author.id && message.content !== "9" && message.content !== "0") {
			if (isNaN(message.content)) {
				message.reply("This is not a valid 11-digit number. Re-input the number you want to look up.");
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
		else if (pbstatus.status === "0" && message.content === "2" && pbstatus.user === message.author.id) {
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "2"});
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.reply("Input a query. Type `9` to back to main menu, or type `0` to quit 411.");
		}
		else if (pbstatus.status === "2" && pbstatus.user === message.author.id && message.content !== "9" && message.content !== "0") {
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
		else if (message.content === "0" && pbstatus.user === message.author.id) {
			message.reply(":negative_squared_cross_mark: You hung up the call.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content === "9" && pbstatus.user === message.author.id) {
			message.reply("Welcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "0"});
		}
		else if (pbstatus.status === "0" && message.content === "3" && pbstatus.user === message.author.id) {
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
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (pbstatus.status === "3" && message.content !== "8" && message.content !== "9" && message.content !== "0" && pbstatus.user === message.author.id && message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
			var thenumber = numbers.find(function(item) {
				return item.channel === message.channel.id;
			});
			if (myregistry === undefined) {myregistry = {number:thenumber.number,desc:""};}
			else {phonebook.splice(myregistry,1);}
			myregistry.desc = message.content;
			phonebook.push(myregistry);
			fs.writeFile("./phonebook.json", JSON.stringify(phonebook), "utf8");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.reply("**Registry edited!**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
		}
		else if (pbstatus.status === "3" && message.content === "8" && pbstatus.user === message.author.id && message.guild.member(message.author).hasPermission("MANAGE_GUILD")) {
			phonebook.splice(myregistry,1);
			fs.writeFile("./phonebook.json", JSON.stringify(phonebook), "utf8");
			message.reply("**Registry removed!**\n\nWelcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFile("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (pbstatus.status === "0" && message.content === "4" && pbstatus.user === message.author.id) {
			message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Special Numbers").setDescription("Here are the special numbers. Troll-calling any of these numbers can result in termination of service.").addField("*233", "Account balance and number renewing (Auto)").addField("*411", "The Phonebook (Auto)").addField("*611", "Customer Support").addField("911", "Discord Bans (Read http://discordtel.readthedocs.io/en/latest/Calling%20911/ for details)").setFooter("To go back to 411 menu, press `9`. To quit 411, press `0`."));
		}
		else if (pbstatus.status === "4" && pbstatus.user === message.author.id) {
			if (isNaN(message.content)) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Not a number!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
				return;
			}
			if (message.content === "0") {
				message.reply("You hung up the call.");
				fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
				return;
			}
			if (account.balance < parseInt(message.content) * 2000) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Insufficient fund!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
				return;
			}
			accounts.splice(accounts.indexOf(account), 1);
			account.balance -= parseInt(message.content) * 2000;
			accounts.push(account);
			fs.writeFile("./account.json", JSON.stringify(accounts), "utf8");
			numbers.splice(numbers.indexOf(mynumber), 1);
			mynumber.month += parseInt(message.content);
			if (mynumber.month > 12) {
				mynumber.month -= 12;
				mynumber.year += 1;
			}
			numbers.push(mynumber);
			fs.writeFile("./numbers.json", JSON.stringify(numbers), "utf8");
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#32CD32").setTitle("Success: Number renewed!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
		}
	}
	else if (call !== undefined && !message.author.bot) {
		if (call.status === false && message.content === ">pickup" && message.channel.id === call.to.channel) {
			message.reply(":white_check_mark: You pick up the call.");
			bot.channels.get(call.from.channel).sendMessage(":heavy_check_mark: The call has been picked up!");
			calls.splice(calls.indexOf(call), 1);
			call.status = true;
			call.time = Date.now();
			calls.push(call);
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get("282253502779228160").sendMessage(":white_check_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is picked up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
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
						bot.channels.get(call.from.channel).sendMessage(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).sendMessage(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
						bot.channels.get("282253502779228160").sendMessage(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
					}
				}
			},120000);
		}
		else if (message.content === ">hangup" && message.channel.id === call.to.channel) {
			message.reply(":negative_squared_cross_mark:  You hung up the call.");
			bot.channels.get(call.from.channel).sendMessage(":x: The other side hangs up the call.");
			bot.channels.get("282253502779228160").sendMessage(":negative_squared_cross_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is hung up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+") on the \"to\" side.");
			calls.splice(calls.indexOf(call), 1);
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
		}
		else if (message.content === ">hangup" && message.channel.id === call.from.channel) {
			message.reply(":negative_squared_cross_mark:  You hung up the call.");
			bot.channels.get(call.to.channel).sendMessage(":x: The other side hangs up the call.");
			bot.channels.get("282253502779228160").sendMessage(":negative_squared_cross_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is hung up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+") on the \"from\" side.");
			calls.splice(calls.indexOf(call), 1);
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
		}
		else if (message.channel.id === call.from.channel && call.status === true) {
			bot.channels.get(call.to.channel).sendMessage(":telephone_receiver: "+message.content);
			calls.splice(calls.indexOf(call), 1);
			call.time = Date.now();
			calls.push(call);
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
			if (call.charge === true) {
				accounts.splice(accounts.indexOf(account), 1);
				account.balance -= 8;
				accounts.push(account);
				if (account.balance === 0) {
					message.reply(":x: You used up your credits. We're now hanging up your call...");
					calls.splice(calls.indexOf(call), 1);
					fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
					bot.channels.get(call.to.channel).sendMessage(":x: The caller used up his/her credits. We've hung up your call.");
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
						bot.channels.get("282253502779228160").sendMessage(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
						bot.channels.get(call.from.channel).sendMessage(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).sendMessage(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
		else if (message.channel.id === call.to.channel && call.status === true) {
			bot.channels.get(call.from.channel).sendMessage(":telephone_receiver: "+message.content);
			calls.splice(calls.indexOf(call), 1);
			call.time = Date.now();
			calls.push(call);
			fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
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
						bot.channels.get("282253502779228160").sendMessage(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
						bot.channels.get(call.from.channel).sendMessage(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).sendMessage(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFile("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
	}
});
var autoban = JSON.parse(fs.readFileSync("./autoban.json", "utf8"));
bot.on("guildCreate", guild => {
	guild.defaultChannel.sendMessage("Hello guys, It's **DiscordTel**, the telephone solution for Discord! To learn more, type `>info`. To get command help, type `>help`. To get a number, read <http://discordtel.rtfd.io/en/latest/Server%20Setup/>.\n**Warning:** Applying a number requires manual approval by customer support team. Do not use this bot in a testing server, instead use it in the official server in `>info`. Do not troll calling.");
	bot.channels.get("282253502779228160").sendMessage(":inbox_tray: Joined "+guild.name+" ("+guild.id+"). Currently in "+bot.guilds.array().length+" servers.");
});
bot.on("guildDelete", guild => {
	bot.channels.get("282253502779228160").sendMessage(":outbox_tray: Left "+guild.name+" ("+guild.id+"). Currently in "+bot.guilds.array().length+" servers.");
});
bot.login("Censored");
