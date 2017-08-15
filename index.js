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
var chef = user_id => bot.guilds.get('281815661317980160').roles.get('310144282717847552').members.map(member => member.id).indexOf(user_id) > -1;
var blacklist = JSON.parse(fs.readFileSync("./blacklist.json", "utf8"));
var blacklisted = user_id => blacklist.indexOf(user_id) > -1;
var orders = JSON.parse(fs.readFileSync("./orders.json", "utf8"));
var menu = JSON.parse(fs.readFileSync("./menu.json", "utf8"));
var request = require("request");
var schedule = require('node-schedule');
var cprefix = "0301"; // Current prefix, `>wizard`
var award = JSON.parse(fs.readFileSync("./award.json", "utf8"));
var ns = 0;
var nsroles = JSON.parse(fs.readFileSync("./ns.json", "utf8"));
var nsguild = JSON.parse(fs.readFileSync("./nsg.json", "utf8"));
const bot = new Discord.Client();
var restify = require('restify');
var server = restify.createServer({
	name : "Bot HTTP server"
});
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
server.listen(port, ipaddress, function () {
	console.log('%s listening to %s', server.name, server.url); 
});

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
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBots returns success: "+ body);
	});
	request.post({
		url: "https://discordbots.org/api/bots/224662505157427200/stats",
		headers: {
			"content-type": "application/json",
			"Authorization": "Censored"
		},
		json: {
			"server_count": bot.guilds.size.toString()
		}
	}, function(error, response, body) {
		console.log("DBotsList returns success: "+ body);
	});
});
bot.on("message", message => {
	if (message.content.startsWith(">")) {
		console.log(message.author.username + "#" + message.author.discriminator + " > " + message.content);
	}
	var account = accounts.find(function(item) {
		return item.user === message.author.id;
	});
	var mynumber = numbers.find(function(item) {
		return item.channel === message.channel.id;
	});
	var myorder = orders.find(function(item) {
		return item.user === message.author.id;
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
	if (!message.guild === false) {var nssetup = nsguild.find(i => {return i.guild === message.guild.id});}
	if (message.author.id === "172002275412279296" && message.content.startsWith(":atm:  |  **Transfer Receipt**") && !message.channel.guild) {
		var receipt = message.content.split("¥ ")[1];
		var amount = receipt.split(" from")[0];
		var username = receipt.split(" from")[1].split(" (ID:")[0];
		var user = receipt.split("(ID: ")[1].replace(")```", "");
		var theaccount = accounts.find(function(item) {
			return item.user === user;
		});
		if (theaccount === undefined) {
			theaccount = {user:user,balance:parseInt(amount)};
			accounts.push(theaccount);
			bot.users.get(theaccount.user).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		}
		else {
			accounts.splice(accounts.indexOf(theaccount), 1);
			theaccount.balance += parseInt(amount);
			accounts.push(theaccount);
		}
		fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		bot.users.get(theaccount.user).send(":yen: We've received ¥"+amount+" from your Tatsumaki credit account. You now have ¥"+theaccount.balance+".");
		bot.channels.get("282253502779228160").send(":yen: Received ¥"+amount+" from"+username+" ("+user+") using Tatsumaki. The user now has ¥"+theaccount.balance+".");
	}
	else if (message.author.id === "213466096718708737" && !message.channel.guild) {
		var user = message.content.split(" ")[0];
		var amount = message.content.split(" ")[2].replace("**", "").replace("**", "");
		var aftertax = Math.round(parseInt(amount) * 60)/100;
		var theaccount = accounts.find(function(item) {
			return item.user === user;
		});
		if (theaccount === undefined) {
			theaccount = {user:user,balance:aftertax};
			accounts.push(theaccount);
			bot.users.get(user).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		}
		else {
			accounts.splice(accounts.indexOf(theaccount), 1);
			theaccount.balance += aftertax;
			accounts.push(theaccount);
		}
		fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		bot.users.get(theaccount.user).send(":yen: We've received ¥"+aftertax+" (After 40% tax since Mantano credits are too easy to get) from your Mantaro credit account. You now have ¥"+theaccount.balance+".");
		bot.channels.get("282253502779228160").send(":yen: Received ¥"+aftertax+" from "+bot.users.get(user).username+" ("+user+") using Mantaro. The user now has ¥"+theaccount.balance+".");
	}
	else if (message.author.id === "227171028072267778" && !message.channel.guild) {
		var user = message.content.split(" ")[0];
		var amount = message.content.split(" ")[2].replace("**", "").replace("**", "");
		var aftertax = Math.round(parseInt(amount) * 60)/100;
		var theaccount = accounts.find(function(item) {
			return item.user === user;
		});
		if (theaccount === undefined) {
			theaccount = {user:user,balance:aftertax};
			accounts.push(theaccount);
			bot.users.get(user).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
		}
		else {
			accounts.splice(accounts.indexOf(theaccount), 1);
			theaccount.balance += aftertax;
			accounts.push(theaccount);
		}
		fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
		bot.users.get(theaccount.user).send(":yen: We've received ¥"+aftertax+" (After 40% tax due to exploits) from your Hifumi credit account. You now have ¥"+theaccount.balance+".");
		bot.channels.get("282253502779228160").send(":yen: Received ¥"+aftertax+" from "+bot.users.get(user).username+" ("+user+") using Hifumi. The user now has ¥"+theaccount.balance+".");
	}
	else if (myorder !== undefined && myorder.status === 0 && message.channel.id === myorder.channel) {
		message.channel.fetchMessage(myorder.message).then(msg => {
			if (message.content === "0") {
				if (account === undefined) {
					account = {user:message.author.id,balance:0};
					accounts.push(account);
					fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
					message.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
				}
				if (myorder.order === "") {
					orders.splice(orders.indexOf(myorder), 1);
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
					msg.delete();
					message.reply("Order aborted!");
				}
				else if (account.balance < myorder.price) {
					orders.splice(orders.indexOf(myorder), 1);
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
					msg.delete();
					message.reply("The bill is "+myorder.price+" DTel credits. You have insufficient fund, so your order is aborted.");
				}
				else {
					orders.splice(orders.indexOf(myorder), 1);
					myorder.status = 1;
					message.delete();
					orders.push(myorder);
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
					msg.edit("", {embed:new Discord.RichEmbed().setColor("#6F4E37").setTitle("Here's your bill!").setDescription("Type `yes` to confirm and pay the money, or type `no` to cancel.").addField("Your order", myorder.ordertext).addField("Note", myorder.note).addField("Price", myorder.price + " DTel credits")});
				}
			}
			else if (message.content.startsWith(">note")) {
				if (myorder.note !== undefined) {
					message.reply("You already added a note!");
					message.delete();
				}
				else {
					orders.splice(orders.indexOf(myorder), 1);
					myorder.note = message.content.replace(">note ", "");
					message.delete();
					orders.push(myorder);
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
					msg.edit("", {embed:new Discord.RichEmbed().setColor("#6F4E37").setTitle("Note added.").setDescription("You may try again.").addField("Your order", myorder.ordertext).addField("Note", myorder.note).addField("Price", myorder.price + " DTel credits").setFooter("Type 0 to finish your order.")});
				}
			}
			else {
				var menuitem = menu.find(function(item){
					return item.id === parseInt(message.content);
				});
				if (menuitem !== undefined) {
					orders.splice(orders.indexOf(myorder), 1);
					myorder.order += message.content + " ";
					myorder.ordertext += menuitem.name + ", ";
					myorder.price += menuitem.price;
					message.delete();
					orders.push(myorder);
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
					msg.edit("", {embed:new Discord.RichEmbed().setColor("#6F4E37").setTitle("1 " + menuitem.name + " is successfully added to your order!").addField("Your order", myorder.ordertext).addField("Note", myorder.note).addField("Price", myorder.price + " DTel credits").setFooter("You can `>note <Your note>` to further customize your order.\nType 0 to finish your order.")});
				} 
				else {
					message.delete();
					msg.edit("", {embed:new Discord.RichEmbed().setColor("#C11B17").setTitle("Error: Item \""+message.content+"\" does not exist!").setDescription("You may try again.").addField("Your order", myorder.ordertext).addField("Note", myorder.note).addField("Price", myorder.price + " DTel credits").setFooter("You can `>note <Your note>` to further customize your order.\nType 0 to finish your order.")});
				}
			}
		});
	}
	else if (myorder !== undefined && myorder.status === 1 && message.channel.id === myorder.channel) {
		message.channel.fetchMessage(myorder.message).then(msg => {
			if (message.content === "yes") {
				accounts.splice(accounts.indexOf(account), 1);
				account.balance -= myorder.price;
				accounts.push(account);
				message.reply("You've paid your order. Your order has been transferred to our kitchen and will be prepared shortly. In the meantime, you can check your order by typing `>order`.");
				orders.splice(orders.indexOf(myorder), 1);
				myorder.status = 2;
				bot.channels.get("310144658552651777").sendEmbed(new Discord.RichEmbed().setColor("#F1C40F").setTitle("New order!").addField("User", message.author.username + "#" + message.author.discriminator).addField("Content", myorder.ordertext).addField("Note", myorder.note).addField("Time to cook", myorder.order.split(" ").length + "min")).then(newmsg => {
					myorder.message = newmsg.id;
					myorder.user = message.author.id;
					newmsg.react("\u2705");
					newmsg.react("\u274c");
					orders.push(myorder);
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
					bot.channels.get("282253502779228160").send(":fork_and_knife: User "+message.author.username+" paid ¥"+myorder.price+" for a Catering Service order. The user now have ¥"+account.balance+".");
				});
			}
			else if (message.content === "no") {
				orders.splice(orders.indexOf(myorder), 1);
				fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
				message.reply("Order aborted!");
			}
		});
	}
    else if (call === undefined && pbstatus === undefined && message.author.id !== "224662505157427200" && !blacklisted(message.author.id)) {
		if (message.content === ">help") {
		  message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("List of Commands").setDescription("For more information, use `>info`.").addField(">dial / >call", "Dial a number using your own number").addField(">pdial / >pcall", "Dial a number using public payphone, 8 credits per message").addField(">rdial / >rcall","Dial a random number in the phonebook").addField(">wizard","Get yourself a number").addField(">order","Get some virtual food").addField(">info", "Display info about applying for a number and user guides").addField(">ns", "NationStates.net commands").addField(">suggest", "Suggest something to be added to the bot"));
		}
		else if(message.content.startsWith(">suggest")) {
			message.reply(":white_check_mark: Thanks for your suggestion!");
	    		bot.channels.get("326798754348793857").send(":ballot_box: New suggestion from __" + message.author.username + "#" + message.author.discriminator + "__ (" + message.author.id + ") ```\n" + message.content.split(" ").splice(1).join(" ").split("```").join(" ") + "```");
		}
		else if (message.content.startsWith(">lottery") && !support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
				var myentry = award.users.filter(item => {return item === message.author.id}).length;
				message.reply("You have "+myentry+" entries. The current jackpot is ¥"+award.amount+".");
				return;
			}
			else if (isNaN(parseInt(message.content.split(" ")[1]))) {
				message.reply("Not a number!\n`>lottery <Amount of entries>`. 1 Entry costs 5 credits.");
				return;
			}
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
		else if (message.content === ">info") {
		    message.reply("check your DM!");
		    message.author.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("DTel Information").setDescription("For command help, use `>help`.").addField("Getting a number", "Before getting a number, you need to reserve a channel for your phone. Once you have done this, you'll have to run the `>wizard` command in the channel to get a number.").addField("Number prefixes", "Most numbers have a prefix of `03XX`, where `XX` represents your shard number. There are some numbers with a prefix of `0900`, which are DM numbers (numbers you can assign in a direct message with the bot), and they act the same as `03XX` numbers, which can *also* have the same digits as `03XX` numbers. Numbers starting with `0800` or `0844`, as well as short codes starting with `*` or `#` are for special uses. Numbers starting with `05XX` are public payphones which can be only called by `>pdial`.").addField("Recharging", "In any server with either Tatsumaki, Hifumi and/or Mantaro: Type `t!credit @DiscordTel#0757 <Amount>` for Tatsumaki, `~transfer <Amount> @DiscordTel#0757` for Hifumi, `~>transfer @DiscordTel#0757 <Amount>` for Mantaro. Remember that we'll only receive 80% of your `<Amount>` for Tatsumaki, and 40% for Mantaro and Hifumi.\nAfter recharging, dial `*233` to check balance.").addField("Phonebook and setup your registry","`>dial *411`").addField("Invite the bot", "https://discordapp.com/oauth2/authorize?client_id=224662505157427200&scope=bot&permissions=84997\n\"Embed Links\" is optional, depends on whether you want the bot to show embed links in calls or not.\n\"Ban Members\" is optional, depends on whether you want Discord Bans agents to solve raids or not.").addField("Official Server", "https://discord.gg/RN7pxrB").addField("Detailed Guide", "http://discordtel.rtfd.io"));
		}
		else if (message.content === ">order") {
			if (myorder !== undefined) {
				var status = "Awaiting claim";
				if (myorder.status === 3) {status = "Started preparation";}
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#6F4E37").setTitle("You already have an order!").setDescription("You can review your current order.").addField("Your order", myorder.ordertext).addField("Status", status));
			}
			else if (!message.guild) {
				message.reply("ORDER IN A SERVER!!!!!!");
			}
			else if (!message.guild.member(bot.user.id).hasPermission("CREATE_INSTANT_INVITE")) {
				message.reply("Please inform your admin to grant DiscordTel `Create Instant Invite` permission, as it is needed for the delivery.");
			}
			else {
				message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Discord Catering Service").setColor("#6F4E37").setDescription("This service is provided by [DiscordTel HQ](https://discord.gg/RN7pxrB) and [Café 0131+](https://discord.gg/013MqTM1p1qm52VcZ).").addField("To order...", "A copy of menu is available in your DM.\nTo order, simply enter the menu code.\nYou can `>note <Your note>` to further customize your order.\nAfter finishing your order, type `0` to place the order and pay the bill.").addField("Your order", "<Empty>").addField("Note", "undefined").setFooter("Reminder: Longer your order is, longer the time to fulfill your order.")).then(msg => {
					orders.push({message: msg.id, user: message.author.id, status: 0, order: "", ordertext: "", price: 0, channel: message.channel.id});
					fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
				});
				var menumsg = new Discord.RichEmbed().setTitle("Our Menu");
				menu.forEach(function(item) {
					menumsg = menumsg.addField(item.name, "Order it by entering `" + item.id + "`\nPrice: " + item.price + " DTel credits");
				});
				message.author.sendEmbed(menumsg);
			}
		}
		else if (message.content.startsWith(">order")) {
			message.reply("Please ONLY type `>order`. You'll get to choose from our menu.");
		}
		else if (message.content === ">ns") {
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("NationStates Commands").setDescription("Attention! Do not `>pdial *611` for support on NS commands. Instead, send a telegram to [this nation](http://nationstates.net/the_cafes) instead.").addField(">ns verify", "Verify that you own a nation").addField(">ns setup", "Setup autorole feature on a server, requires `Manage Roles` permission.").setFooter("For normal commands, `>help`."));
		}
		else if (message.content === ">ns verify") {
			if (ns >= 45) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Ratelimited!").setDescription("You can try again by retyping the command later."));
				return;
			}
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("Step 1: Select nation").setDescription("Type in the name of the nation without prefix.").setFooter("Type `0` to quit."));
			fouroneone.push({user: message.author.id,status: "7"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content === ">ns setup") {
			if (!message.guild) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Not a guild!").setDescription("Run this command in a damn server!"));
				return;
			}
			if (!message.guild.members.get(message.author.id).hasPermission(0x10000000)) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Permissionless!").setDescription("You need `Manage Roles`. Get an admin to do that."));
				return;
			}
			if (!message.guild.members.get(bot.user.id).hasPermission(0x10000000)) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Permissionless!").setDescription("I need `Manage Roles`."));
				return;
			}
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("NationStates Autorole Setup").setDescription("Attention! If you have already set up before, re-setup will override original settings.").addField("Step 1: NS Role", "This role will be given to everyone who has a verified NS nation. Type the role name to enable, or type `9` to skip (Disable this feature).").setFooter("Type `0` to quit."));
			if (nssetup === undefined) {
				message.reply("Original setting NOT found. You are safe to proceed.");
			}
			else {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("Previous setup found!").setFooter("Type `0` to quit.").addField("NS Role", nssetup.verified).addField("Nickname", nssetup.nick).addField("Region", nssetup.region).addField("Region Role", nssetup.regionrole));
			}
			fouroneone.push({user: message.author.id,status: "9"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content === ">v") {
			var nssetup = nsguild.find(i => {return i.guild === message.guild.id});
			if (nssetup !== undefined) {
				var mynation = nsroles.find(i => {return i.user === message.author.id});
				if (mynation !== undefined && nssetup.verified !== undefined) {
					if (message.guild.roles.find("name", nssetup.verified) === null) {
						message.guild.owner.send("Role for all NS-verified user `"+nssetup.verified+"` in server `"+message.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
					}
					else {
						message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", nssetup.verified));
					}
				}
				if (mynation !== undefined && nssetup.nick !== undefined) {
					var nick = nssetup.nick.replace("%name%", message.author.displayName).replace("%nation%", mynation.nation);
					message.guild.members.get(message.author.id).setNickname(nick);
				}
				if (mynation !== undefined && nssetup.region !== undefined && nssetup.regionrole !== undefined && ns < 45) {
					request({url:"https://www.nationstates.net/cgi-bin/api.cgi?nation="+mynation.nation+"&q=region",headers:{'User-Agent': 'IN CASE OF URGENCY, CONTACT http://discord.io/0131'}}, function(error, response, body) {
						ns += 1;
						if (!error && response.statusCode === 200) {
							var region = body.split("<REGION>")[1].split("</REGION>")[0].toLowerCase();
							if (mynation.region !== region) {
								nsroles.splice(nsroles.indexOf(mynation), 1);
								mynation.region = region;
								nsroles.push(mynation);
								fs.writeFileSync("ns.json", JSON.stringify(nsroles), "utf8");
							}
							if (region === nssetup.region) {
								if (message.guild.roles.find("name", nssetup.verified) === null) {
									message.guild.owner.send("Role for in-region nation owners `"+nssetup.regionrole+"` in server `"+message.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
								}
								else {
									message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", nssetup.regionrole));
								}
							}
						}
						else {
							if (mynation.region === nssetup.region) {
								if (message.guild.roles.find("name", nssetup.verified) === null) {
									message.guild.owner.send("Role for in-region nation owners `"+nssetup.regionrole+"` in server `"+message.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
								}
								else {
									message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", nssetup.regionrole));
								}
							}
						}
					});
				}
				else if (nssetup.region !== undefined && nssetup.regionrole !== undefined && ns >= 45) {
					if (mynation.region === nssetup.region) {
						if (message.guild.roles.find("name", nssetup.verified) === null) {
							message.guild.owner.send("Role for in-region nation owners `"+nssetup.regionrole+"` in server `"+message.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
						}
						else {
							message.guild.members.get(message.author.id).addRole(message.guild.roles.find("name", nssetup.regionrole));
						}
					}
				}
			}
			message.reply("NS Status Checked!");
		}
		else if (message.content.startsWith(">ban") && support(message.author.id)) {
 			if (message.mentions === undefined) {
 				message.reply("MENTION SOMETHING, IDIOT!");
				return;
 			}
 			message.mentions.users.array().forEach(function(idiot) {
 				message.guild.ban(idiot, 7);
				bot.channels.get("282253502779228160").send(":hammer: User "+message.content.split(" ")[1]+" is BANNED in server `"+message.guild.name+"` by "+message.author.name+".");
 			});
		}
		else if (message.content.startsWith(">assign") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined || message.content.split(" ")[2] === undefined) {
			    message.reply("WHAT THE F*** ARE YOU DOING? YOU KNOW THERE'S TWO VARIABLES BUT YOU FORGOT IT AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII!");
			    return;
			}
			if (message.content.split(" ")[2].length !== 11 || isNaN(message.content.split(" ")[2])) {
			    message.reply("WHAT THE F\*\*\* ARE YOU DOING? **11-DIGIT NUMBER** AND...BEANS? THERE IS NO SUCH THING CALLED MAGIC BEANS YOU STUPID BOIIIIIIIII!");
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
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			bot.channels.get("282253502779228160").send(":green_book: Number `"+message.content.split(" ")[2]+"` is assigned to channel "+message.content.split(" ")[1]+" by "+message.author.username+".");
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
			var theregistry = phonebook.find(function(item) {
				return item.number === message.content.split(" ")[2];
			});
			if (theregistry !== undefined) {
				phonebook.splice(phonebook.indexOf(theregistry), 1);
				fs.writeFileSync("./phonebook.json", JSON.stringify(phonebook), "utf8");
			}
			numbers.splice(numbers.indexOf(number), 1);
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			message.reply("Done. RIP in peace");
			bot.channels.get("282253502779228160").send(":closed_book: Number `"+message.content.split(" ")[2]+"` is DE-assigned to channel "+message.content.split(" ")[1]+" by "+message.author.username+".");
		}
		else if (message.content.startsWith(">blacklist") && support(message.author.id)) {
			if (message.content.split(" ")[1] === undefined) {
			    message.reply("u forgot id");
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
        else if (message.content.startsWith(">eval") && message.author.id === "155784937511976960") {
	        var suffix = message.content.substring(6);
            try {
                message.channel.send(":arrow_down: `INPUT:`\n```js\n" + suffix + "```\n:arrow_up: `OUTPUT:`\n```js\n" + util.inspect(eval(suffix)) + "```");
            }
            catch (e) {
                message.channel.send(":arrow_down: `INPUT:`\n```js\n" + suffix + "```\n:sos: `ERROR:`\n```js\n" + e.stack + "```");
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
                message.author.send(invite.url);
            });
		}
		else if (message.content.startsWith(">extend") && support(message.author.id)) {
			message.reply("`>extend` is disabled due to unknown bug. Whether:\n- `>addcredit` instead\n- Ask Austin");
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
			if (bot.users.get(message.content.split(" ")[1]) === undefined) {
			    message.reply("Unreachable/Inexist user. `>addcredit <User_ID> <Credit>`");
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
		else if (message.content === ">dial *411") {if (mynumber === undefined) {
				message.reply(":x: Dialing error: There's no number associated with this channel. Please dial from channels that has DiscordTel service.");
				return;
			}
			message.reply("Welcome to DiscordTel 411.\nFor **checking an existing __11-digit__ number**, press `1`.\nFor **searching the yellowbook by query**, press `2`.\nFor **adding/editing/removing number registry**, press `3`.\nFor **checking a special number** (\\*000 or #0000), press `4`.\nTo talk to an operator, press `0` then dial `*611`.\nTo exit 411 service, press `0`.");
			fouroneone.push({user: message.author.id,status: "0"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (message.content === ">dial *233" || message.content === ">pdial *233" || message.content === ">balance") {
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
			else if (account.balance < 2000) {
				message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Current Number Status").setDescription("You have less than 2000 credits which means you cannot renew at all.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/"));
				return;
			}
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "4"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#007FFF").setTitle("Current Number Status").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "http://discordtel.readthedocs.io/en/latest/Payment/").setFooter("To hang up, press `0`."));
		}
		else if (message.content.startsWith(">dial") || message.content.startsWith(">call")){
			var yournumber = message.content.split(" ").slice(1).join(" ");
			if (yournumber === "") {
				message.reply("Damn son, you forgot the number! `>dial <Number>`");
				return;
			}
			yournumber = yournumber.replace(/a/ig, "2").replace(/b/ig, "2").replace(/c/ig, "2").replace(/d/ig, "3").replace(/e/ig, "3").replace(/f/ig, "3").replace(/g/ig, "4").replace(/h/ig, "4").replace(/i/ig, "4").replace(/j/ig, "5").replace(/k/ig, "5").replace(/l/ig, "5").replace(/m/ig, "6").replace(/n/ig, "6").replace(/o/ig, "6").replace(/p/ig, "7").replace(/q/ig, "7").replace(/r/ig, "7").replace(/s/ig, "7").replace(/t/ig, "8").replace(/u/ig, "8").replace(/v/ig, "8").replace(/w/ig, "9").replace(/x/ig, "9").replace(/y/ig, "9").replace(/z/ig, "9").replace(/-/ig, "").replace("(", "").replace(")", "").replace(" ", "");
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
			if (yournumber === "08006113835" && message.channel.guild !== undefined && message.channel.guild.id === "264445053596991498") {
				message.reply("If you have any questions, go straight to austinhuang#1076 and stop dialing *611. Also we are not tech scammers");
				return;
			}
			else if (yournumber === "08006113835") {
				bot.channels.get(yourchannel).send("<@&281815839936741377>");
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
						bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
		else if (message.content.startsWith(">pdial") || message.content.startsWith(">pcall")){
			var yournumber = message.content.split(" ").slice(1).join(" ");
			if (yournumber === "") {
				message.reply("Damn son, you forgot the number! `>dial <Number>`");
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
			if (yournumber === "08006113835") {
				bot.channels.get(yourchannel).send("<@&281815839936741377>");
			}
			message.reply(":telephone: Dialing... You are able to `>hangup`.");
			var call = {from:{channel:mychannel,number:mynumber},to:{channel:yourchannel,number:yournumber},status:false};
			if (!yournumber.startsWith("08")) {
				call.charge = true;
				if (account === undefined) {
					account = {user:message.author.id,balance:0};
					accounts.push(account);
					fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
					message.reply("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
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
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
			bot.channels.get("282253502779228160").send(":telephone: A **payphone** call is established between channel "+message.channel.id+" and channel "+yourchannel+" by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+").");
			bot.channels.get(yourchannel).send("You received a call from `("+mynumber.split("")[0]+mynumber.split("")[1]+mynumber.split("")[2]+mynumber.split("")[3]+") "+mynumber.split("")[4]+mynumber.split("")[5]+mynumber.split("")[6]+"-"+mynumber.split("")[7]+mynumber.split("")[8]+mynumber.split("")[9]+mynumber.split("")[10]+"`. Type `>pickup` or `>hangup`.");
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
						bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
						message.reply(":negative_squared_cross_mark: This call has expired (2 minutes).");
						bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
					}
				}
			},120000);
		}
		else if (message.content === ">rdial" || message.content === ">rcall"){
			function genNumber(){
				var yournumber = phonebook[Math.floor(Math.random() * phonebook.length)].number;
				
				if(yournumber.startsWith("0800")){
					console.log(">rdial tried to dial 0800... regenerating number");
					return genNumber();
				}
				if (yournumber.startsWith("0500")) {
					//message.reply(":x: Dialing error: Payphone numbers (`05XX` prefix) cannot receive calls.");
					console.log(">rdial tried to dial 0500... regenerating number");
					return genNumber();
				}
				return yournumber;
			}
			var yournumber=genNumber();
			var yourchannel = numbers.find(function(item) {
				return item.number === yournumber;
			});
			if (yourchannel === undefined) {
				message.reply(":x: Dialing error: Number `"+yournumber+"` is unavailable to dial. It could be deleted or hidden from the bot. Please dial `*611` to get the number removed.");
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
				message.reply(":thinking: Sorry, forgot what I was going to do. Could you please type `>rdial` again?");
				return;
			}
			mynumber = mynumber.number;
			var mychannel = message.channel.id;
			if (bot.channels.get(yourchannel) === undefined) {
				message.reply(":x: Dialing error: Number `"+yournumber+"` is unavailable to dial. It could be deleted or hidden from the bot. Please dial `*611` to get the number removed.");
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
					}
				}
			},120000);
		}
	else if (pbstatus !== undefined && !blacklisted(message.author.id) && pbstatus.user === message.author.id) {
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
			message.channel.sendEmbed(new Discord.RichEmbed().setTitle("Special Numbers").setDescription("Here are the special numbers. Troll-calling any of these numbers can result in termination of service.").addField("*233", "Account balance and number renewing (Auto)").addField("*411", "The Phonebook (Auto)").addField("*611", "Customer Support").addField("911", "Discord Bans (Read http://discordtel.readthedocs.io/en/latest/Calling%20911/ for details)").setFooter("To go back to 411 menu, press `9`. To quit 411, press `0`."));
		}
		else if (pbstatus.status === "4" && mynumber !== undefined) {
			if (isNaN(message.content)) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Not a number!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
				return;
			}
			if (parseInt(message.content) <= 0) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("HEY! HOW DARE YOU! LUCKILY I PATCHED IT SO YOU CAN NEVER GET FREE CREDITS OUT OF MY OWN POCKET! HAHAHA!!!!!!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
				return;
			}
			if (account.balance < parseInt(message.content) * 2000) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Insufficient fund!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
				return;
			}
			if (parseInt(message.content) > 12) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Max 12 months in 1 renew.").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
				return;
			}
			accounts.splice(accounts.indexOf(account), 1);
			account.balance -= parseInt(message.content) * 2000;
			accounts.push(account);
			fs.writeFileSync("./account.json", JSON.stringify(accounts), "utf8");
			numbers.splice(numbers.indexOf(mynumber), 1);
			mynumber.month += parseInt(message.content);
			if (mynumber.month > 12) {
				mynumber.month -= 12;
				mynumber.year += 1;
			}
			numbers.push(mynumber);
			fs.writeFileSync("./numbers.json", JSON.stringify(numbers), "utf8");
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#32CD32").setTitle("Success: Number renewed!").setDescription("Type the amount of months you want to renew your number.").addField("Number", mynumber.number).addField("Expiration",mynumber.year+"/"+mynumber.month).addField("Your Balance",account.balance).addField("Recharging", "In any server with both DiscordTel and Tatsumaki: Type `t!credit @DiscordTel#0757 <Amount>`. Remember that we'll only receive 80% of your `<Amount>`.").setFooter("To hang up, press `0`."));
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
		else if (pbstatus.status === "7") {
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("Step 2: Verify token").setDescription("Input the token you get from <https://www.nationstates.net/page=verify_login>. Make sure you are logged in into nation `"+message.content+"`.\nDiscordTel will not be able to control your nation, as described [here](https://www.nationstates.net/pages/api.html#verification).").setFooter("Type `0` to quit."));
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			pbstatus.nation = message.content;
			pbstatus.status = "8";
			fouroneone.push(pbstatus);
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
		else if (pbstatus.status === "8") {
			if (ns >= 45) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Ratelimited!").setDescription("You can try again by retyping your token (Your token might be changed!), or type 0 to quit."));
				return;
			}
			request({url:"https://www.nationstates.net/cgi-bin/api.cgi?a=verify&nation="+pbstatus.nation+"&checksum="+message.content+"&q=region",headers:{'User-Agent': 'IN CASE OF URGENCY, CONTACT http://discord.io/0131'}}, function(error, response, body) {
				ns += 1;
				console.log(body);
                if (!error && response.statusCode === 200) {
					if (body.split("<VERIFY>")[1].split("</VERIFY>")[0] === "1") {
						nsroles.push({user: message.author.id, nation: pbstatus.nation, region: body.split("<REGION>")[1].split("</REGION>")[0]});
						fs.writeFileSync("ns.json", JSON.stringify(nsroles), "utf8");
						message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("Success!").setDescription("You've finished the wizard.\nIf you wish to verify the ownership of another nation, type `>ns verify` again.\nRespective roles will be automatically given to you on any region-roleing server you joined *after* this verification. For servers that you joined *before* this verification, type `>v` manually."));
						fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
						fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
					}
					else {
					message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Authencation Failure! (Wrong token or wrong nation or you logged out)").setDescription("You can try again by retyping your token (Your token might be changed!), or type 0 to quit."));
					}
				}
				else {
					message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").setTitle("Error: Cannot connect to NS!").setDescription("You can try again by retyping your token (Your token might be changed!), or type 0 to quit."));
				}
			});
		}
		else if (pbstatus.status === "9") {
			if (nssetup !== undefined) {nsguild.splice(nsguild.indexOf(nssetup),1);}
			nssetup = {guild:message.guild.id};
			if (message.content !== "9" && message.guild.roles.find("name", message.content) === null) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").addField("Error: Role does not exist!", "This role will be given to everyone who has a verified NS nation. Type the role name to enable, or type `9` to skip (Disable this feature).").setFooter("Type `0` to quit."));
				return;
			}
			else if (message.content !== "9") {nssetup.verified = message.content;}
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").addField("Step 2: NS Nickname", "This role will be given to everyone who has a verified NS nation. Type the nickname format to enable, or type `9` to skip.\nYou can use `%name%` to replace with their Discord name, `%nation%` to replace with their nation name.").setFooter("Type `0` to quit."));
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "10"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			nsguild.push(nssetup);
			fs.writeFileSync("nsg.json", JSON.stringify(nsguild), "utf8");
		}
		else if (pbstatus.status === "10") {
			if (message.content !== "9") {
				nsguild.splice(nsguild.indexOf(nssetup),1);
				nssetup.nick = message.content;
			}
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").addField("Step 3.1: NS Region Role", "Type in the name of your region, or type `9` to skip.").setFooter("Type `0` to quit."));
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fouroneone.push({user: message.author.id,status: "11"});
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			nsguild.push(nssetup);
			fs.writeFileSync("nsg.json", JSON.stringify(nsguild), "utf8");
		}
		else if (pbstatus.status === "11") {
			if (message.content !== "9") {
				nsguild.splice(nsguild.indexOf(nssetup),1);
				nssetup.region = message.content;
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").addField("Step 3.2: NS Region Role", "Type in the role you wish to give to all residents of your region. You can't skip (You should've skipped on Step 3.1).").setFooter("Type `0` to quit."));
				nsguild.push(nssetup);
				fs.writeFileSync("nsg.json", JSON.stringify(nsguild), "utf8");
				fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
				fouroneone.push({user: message.author.id,status: "12"});
				fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			}
			else {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("Here's your new setting!").setFooter("You have finished the wizard.").addField("NS Role", nssetup.verified).addField("Nickname", nssetup.nick).addField("Region", nssetup.region).addField("Region Role", nssetup.regionrole));
				fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
				nsguild.push(nssetup);
				fs.writeFileSync("nsg.json", JSON.stringify(nsguild), "utf8");
				fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
			}
		}
		else if (pbstatus.status === "12") {
			nsguild.splice(nsguild.indexOf(nssetup),1);
			if (message.guild.roles.find("name", message.content) === null) {
				message.channel.sendEmbed(new Discord.RichEmbed().setColor("#FF0000").addField("Error: Role does not exist!", "Type in the role you wish to give to all residents of your region. You can't skip (You should've skipped on Step 3.1).").setFooter("Type `0` to quit."));
				return;
			}
			nssetup.regionrole = message.content;
			nsguild.push(nssetup);
			fs.writeFileSync("nsg.json", JSON.stringify(nsguild), "utf8");
			message.channel.sendEmbed(new Discord.RichEmbed().setColor("#008000").setTitle("Here's your new setting!").setFooter("You have finished the wizard.").addField("NS Role", nssetup.verified).addField("Nickname", nssetup.nick).addField("Region", nssetup.region).addField("Region Role", nssetup.regionrole));
			fouroneone.splice(fouroneone.indexOf(pbstatus), 1);
			fs.writeFileSync("fouroneone.json", JSON.stringify(fouroneone), "utf8");
		}
	}
	else if (call !== undefined && !message.author.bot && !blacklisted(message.author.id)) {
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
						bot.channels.get(call.to.channel).send(":x: This call has expired (2 minutes).");
						calls.splice(calls.indexOf(call), 1);
						fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
						bot.channels.get("282253502779228160").send(":telephone: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is expired.");
					}
				}
			},120000);
		}
		else if (message.content === ">hangup" && message.channel.id === call.to.channel) {
			message.reply(":negative_squared_cross_mark:  You hung up the call.");
			if (bot.channels.get(call.from.channel) !== undefined) {
				bot.channels.get(call.from.channel).send(":x: The other side hangs up the call.");
			}
			bot.channels.get("282253502779228160").send(":negative_squared_cross_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is hung up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+") on the \"to\" side.");
			calls.splice(calls.indexOf(call), 1);
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
		}
		else if (message.content === ">hangup" && message.channel.id === call.from.channel) {
			message.reply(":negative_squared_cross_mark:  You hung up the call.");
			if (bot.channels.get(call.to.channel) !== undefined) {
				bot.channels.get(call.to.channel).send(":x: The other side hangs up the call.");
			}
			bot.channels.get("282253502779228160").send(":negative_squared_cross_mark: The call between channel "+call.from.channel+" and channel "+call.to.channel+" is hung up by __"+message.author.username+"#"+message.author.discriminator+"__ ("+message.author.id+") on the \"from\" side.");
			calls.splice(calls.indexOf(call), 1);
			fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
		}
		else if (message.channel.id === call.from.channel && call.status === true) {
			if (bot.channels.get(call.to.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
				return;
			}
			if (support(message.author.id)) {
				bot.channels.get(call.to.channel).send(":star: "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.array().forEach(item => {
						bot.channels.get(call.to.channel).send(":star: "+item.url);
					});
				}
			} else {
				bot.channels.get(call.to.channel).send(":telephone_receiver: "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.array().forEach(item => {
						bot.channels.get(call.to.channel).send(":telephone_receiver: "+item.url);
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
					}
				}
			},120000);
		}
		else if (message.channel.id === call.to.channel && call.status === true) {
			if (bot.channels.get(call.from.channel) === undefined) {
				message.reply(":x: The bot has lost permission to send your message to the opposite side, means the bot could be kicked.");
				calls.splice(calls.indexOf(call), 1);
				fs.writeFileSync("./call.json", JSON.stringify(calls), "utf8");
				return;
			}
			if (support(message.author.id)) {
				bot.channels.get(call.from.channel).send(":star: "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.array().forEach(item => {
						bot.channels.get(call.from.channel).send(":star: "+item.url);
					});
				}
			} else {
				bot.channels.get(call.from.channel).send(":telephone_receiver: "+message.content);
				if (message.attachments.size !== 0) {
					message.attachments.array().forEach(item => {
						bot.channels.get(call.from.channel).send(":telephone_receiver: "+item.url);
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
					}
				}
			},120000);
		}
	}
});
bot.on("messageReactionAdd", (reaction, user) => {
	var theorder = orders.find(function(item){return item.message === reaction.message.id});
	var account = accounts.find(function(item) {
		return item.user === user.id;
	});
	var award = 0;
	if (reaction.emoji.name === "\u2705" && chef(user.id) && theorder !== undefined && theorder.status === 2) {
		award = theorder.order.split(" ").length;
		if (account === undefined) {
			account = {user:message.author.id,balance:award};
			accounts.push(account);
			bot.users.get(message.author.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>\n(Don't worry, salary is added to your new account)");
		}
		else {
			account.splice(accounts.indexOf(account), 1);
			account.balance += award;
			accounts.push(account);
		}
		bot.channels.get("282253502779228160").send(":moneybag: Restaurant worker "+user.name+" earned ¥"+award+" for cooking.");
		user.send("Order accepted. You earned __"+award+" credits__ for cooking.");
		bot.users.get(theorder.user).send("Your order is claimed by our restaurant worker `"+user.username+"#"+user.discriminator+"`! It'll be prepared in "+theorder.order.split(" ").length+" minutes.");
		theorder.status = 3;
		reaction.message.delete();
		var time = theorder.order.split(" ").length * 60000;
		setTimeout(function() {
			bot.channels.get("310144658552651777").sendEmbed(new Discord.RichEmbed().setColor("#61E656").setTitle("New cooked order! Awaiting delivery!").addField("User", bot.users.get(theorder.user).username + "#" + bot.users.get(theorder.user).discriminator).addField("Content", theorder.ordertext).addField("Note", theorder.note)).then(newmsg => {
				newmsg.react("\u2705");
				orders.splice(orders.indexOf(theorder), 1);
				theorder.message = newmsg.id;
				orders.push(theorder);
				fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
			});
		}, time);
	}
	else if (reaction.emoji.name === "\u274c" && chef(user.id) && theorder !== undefined && theorder.status === 2) {
		user.send("Order rejected.");
		bot.users.get(theorder.user).send("Your order is rejected by our restaurant worker `"+user.username+"#"+user.discriminator+"`.");
		reaction.message.delete();
		orders.splice(orders.indexOf(theorder), 1);
	}
	else if (reaction.emoji.name === "\u2705" && chef(user.id) && theorder !== undefined && theorder.status === 3) {
		award = theorder.order.split(" ").length * 2;
		if (account === undefined) {
			account = {user:message.author.id,balance:award};
			accounts.push(account);
			bot.users.get(message.author.id).send("You don't have an account created...Creating an account for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>\n(Don't worry, salary is added to your new account)");
		}
		else {
			account.splice(accounts.indexOf(account), 1);
			account.balance += award;
			accounts.push(account);
		}
		bot.channels.get("282253502779228160").send(":moneybag: Restaurant worker "+user.name+" earned ¥"+award+" for delivering.");
		bot.channels.get(theorder.channel).createInvite({
			maxAge: 0, // 0 = Infinity
			maxUses: 0 // ^^^^^^^^^^^^
		}).then(invite => {
			user.send("Delivery accepted. You earned __"+award+" credits__ for cooking. The invite is "+invite.url+" . They ordered `"+theorder.ordertext+"`.");
		});
		bot.users.get(theorder.user).send("Your order will be delivered by our restaurant worker `"+user.username+"#"+user.discriminator+"` as soon as possible. We're now deleting your order. Thanks for the business!");
		reaction.message.delete();
		orders.splice(orders.indexOf(theorder), 1);
		fs.writeFileSync("./orders.json", JSON.stringify(orders), "utf8");
	}
});
bot.on("guildCreate", guild => {
	guild.defaultChannel.send("Hello guys, It's **DiscordTel**, the telephone/order/NationStates-autorole solution for Discord! To learn more, type `>info`. To get command help, type `>help`. To get a number, read <http://discordtel.rtfd.io/> and then type `>wizard` in the channel you wish to enable the service.\n**Warning:** No troll calls. You are required to read the documentation. To keep your number available you need to renew your number which is instructed at <http://discordtel.readthedocs.io/en/latest/Payment/>.");
	bot.channels.get("282253502779228160").send(":inbox_tray: Joined "+guild.name+" ("+guild.id+"). Currently in "+bot.guilds.array().length+" servers.");
});
bot.on("guildDelete", guild => {
	bot.channels.get("282253502779228160").send(":outbox_tray: Left "+guild.name+" ("+guild.id+"). Currently in "+bot.guilds.array().length+" servers.");
});
bot.on("presenceUpdate", (oldMember, newMember) => {
	if (oldMember.id === "209891913548038144" && newMember.id === "209891913548038144") {
		if (oldMember.presence.status === "offline" || newMember.presence.status === "online") {
			bot.channels.get("272137985871577088").send("The Minecraft server has came online!");
		}
		else if (oldMember.presence.status === "online" || newMember.presence.status === "offline") {
			bot.channels.get("272137985871577088").send("The Minecraft server is down! <@155784937511976960> <@171319044715053057>");
		}
	}
});
bot.on("guildMemberAdd", member => {
	var nssetup = nsguild.find(i => {return i.guild === member.guild.id});
	if (nssetup !== undefined) {
		var mynation = nsroles.find(i => {return i.user === member.id});
		if (mynation !== undefined && nssetup.verified !== undefined) {
			if (member.guild.roles.find("name", nssetup.verified) === undefined) {
				member.guild.owner.send("Role for all NS-verified user `"+nssetup.verified+"` in server `"+member.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
			}
			else {
				member.addRole(member.guild.roles.find("name", nssetup.verified));
			}
		}
		else if (mynation !== undefined && nssetup.nick !== undefined) {
			var nick = nssetup.nick.replace("%name%", member.displayName).replace("%nation%", mynation.nation);
			member.setNickname(nick);
		}
		else if (mynation !== undefined && nssetup.region !== undefined && nssetup.regionrole !== undefined && ns < 45) {
			request({url:"https://www.nationstates.net/cgi-bin/api.cgi?nation="+mynation.nation+"&q=region",headers:{'User-Agent': 'IN CASE OF URGENCY, CONTACT http://discord.io/0131'}}, function(error, response, body) {
				ns += 1;
				if (!error && response.statusCode === 200) {
					var region = body.split("<REGION>")[1].split("</REGION>")[0];
					if (mynation.region !== region) {
						nsroles.splice(nsroles.indexOf(mynation), 1);
						mynation.region = region;
						nsroles.push(mynation);
						fs.writeFileSync("ns.json", JSON.stringify(nsroles), "utf8");
					}
					if (region === nssetup.region) {
						if (member.guild.roles.find("name", nssetup.verified) === null) {
							member.guild.owner.send("Role for in-region nation owners `"+nssetup.regionrole+"` in server `"+member.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
						}
						else {
							member.addRole(member.guild.roles.find("name", nssetup.regionrole));
						}
					}
				}
				else {
					if (mynation.region === nssetup.region) {
						if (member.guild.roles.find("name", nssetup.verified) === null) {
							member.guild.owner.send("Role for in-region nation owners `"+nssetup.regionrole+"` in server `"+member.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
						}
						else {
							member.addRole(member.guild.roles.find("name", nssetup.regionrole));
						}
					}
				}
			});
		}
		else if (mynation !== undefined && nssetup.region !== undefined && nssetup.regionrole !== undefined && ns >= 45) {
			if (mynation.region === nssetup.region) {
				if (member.guild.roles.find("name", nssetup.verified) === null) {
					member.guild.owner.send("Role for in-region nation owners `"+nssetup.regionrole+"` in server `"+member.guild.name+"` NOT FOUND! Please redo `>ns setup`.");
				}
				else {
					member.addRole(member.guild.roles.find("name", nssetup.regionrole));
				}
			}
		}
	}
});
var jackpot = schedule.scheduleJob({hour: 1, minute: 0, second: 0}, function() {
	var winner = award.users[Math.floor(Math.random()*award.users.length)];
	if (leaccount === undefined) {
		leaccount = {user:message.author.id,balance:award.amount};
		accounts.push(leaccount);
		bot.users.get(winner).send("You don't have an account created...Creating an leaccount for you! Please also read for information on payment: <http://discordtel.readthedocs.io/en/latest/Payment/>");
	}
	else {
		accounts.splice(accounts.indexOf(leaccount), 1);
		leaccount.balance += award.amount;
		accounts.push(leaccount);
	}
	bot.users.get(winner).send("**YOU WON THE LOTTERY!**\n¥"+award.amount);
	bot.channels.get("282253502779228160").send(":tada: User __"+bot.users.get(winner).username+"#"+bot.users.get(winner).discriminator+"__ ("+winner+") won the lottery which valued at "+award.amount+"");
	award = {users:[], amount:0};
	fs.writeFileSync("./award.json", JSON.stringify(award), "utf8");
});


bot.login("Censored");
