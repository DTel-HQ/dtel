Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

const process = require("process");
process.setMaxListeners(0);
const uuidv4 = require("uuid/v4");
const reload = require("require-reload")(require);

const Client = require("./Internals/Client.js");
const { scheduleJob } = require("node-schedule");
const { get, post } = require("snekfetch");

const fs = require("fs");
const database = require("./Database/database");

const client = new Client({
	shardId: Number(process.env.SHARD_ID),
	shardCount: Number(process.env.SHARD_COUNT),
	disableEveryone: true,
	disabledEvents: ["WEBHOOKS_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_ADD", "MESSAGE_REACTION_REMOVE_ALL", "VOICE_STATE_UPDATE"],
	ws: {
		compress: true,
	},
	maxListeners: 0,
});

database.initialize(process.env.MONGOURL).then(() => {
	console.log("Database initialized!");
}).catch(err => {
	console.log(`Failed to intialize Database`, err);
	process.exit(1);
});

Number(process.env.SHARD_ID) === 0 && scheduleJob({ date: 1, hour: 0, minute: 0, second: 0 }, async() => {
	let allNumbers = await Numbers.find({});
	let today = new Date();
	for (let n of allNumbers) {
		let exp = new Date(n.expiry);
		if (today.getMonth() > exp.getMonth() && (today.getFullYear() > exp.getFullYear() || today.getFullYear() === exp.getFullYear())) {
			n.expired = true;
			await n.save();
		}
	}
});

Number(process.env.SHARD_ID) === 0 && scheduleJob({ hour: 0, minute: 0, second: 0 }, async() => {
	// I'll start with daily.
	let allAccounts = await Accounts.find({});
	for (let a of allAccounts) {
		a.dailyClaimed = false;
		await a.save();
	}
	// Then lottery.
	let currentlottery;
	try {
		currentlottery = await Lottery.findOne({ active: true });
		if (!currentlottery) throw new Error();
	} catch (err) {
		let devs = ["137589790538334208", "139836912335716352", "156110624718454784", "115156616256552962", "207484517898780672"];
		for (let d of devs) {
			(await client.users.fetch(d)).send("Yo, there's something wrong with the lottery.");
		}
	}
	if (currentlottery) {
		let winner = currentlottery.entries[Math.floor(Math.random() * currentlottery.entries.length)];
		let winneracc;
		try {
			winneracc = await Accounts.findOne({ _id: winner });
			if (!winneracc) throw new Error();
		} catch (err) {
			(await client.users.fetch(winner)).send("You've just won the lottery, but you don't have an account! Creating one for you.");
			winneracc = await Accounts.create(new Accounts({
				_id: winner,
			}));
		}
		if (winneracc) {
			winneracc.balance += currentlottery.jackpot;
			currentlottery.active = false;
			await currentlottery.save();
			await winneracc.save();
			await Lottery.create(new Lottery({
				_id: uuidv4(),
				entered: [],
				jackpot: 0,
				active: true,
			}));
			(await client.users.fetch(winner)).send(`You've won the lottery! The jackpot amount has been added to your account. You now have \`${winneracc.balance}\``);
		}
	} else {
		await Lottery.create(new Lottery({
			_id: uuidv4(),
			entered: [],
			jackpot: 0,
			active: true,
		}));
	}
	await client.apiSend(`:white_check_mark: The lottery and daily credits have been reset!`, process.env.LOGSCHANNEL);
	// Cleaning phonebook
	let phonebookAll = await Phonebook.find({});
	for (const i of phonebookAll) {
		let channel;
		let number;
		try {
			channel = await client.api.channels(i.channel).get();
			number = await Numbers.find({ number: i._id });
		} catch (err) {
			await i.remove();
		}
	}
});

// Discoin grabber
setInterval(async() => {
	let snekres;
	try {
		snekres = await get("http://discoin.sidetrip.xyz/transactions").set({ Authorization: process.env.DISCOIN_TOKEN, "Content-Type": "application/json" });
	} catch (err) {
		await client.apiSend("Yo, there might be something wrong with the Discoin API.\n```\n"+err+"\n```", "348832329525100554");
	}
	if (snekres) {
		for (let t of snekres.body) {
			if (!t.type) {
				let account;
				try {
					account = await Accounts.findOne({ _id: t.user });
				} catch (err) {
					account = await Accounts.create(new Accounts({
						_id: t.user,
					}));
				}
				account.balance += t.amount;
				await account.save();

				await client.apiSend(`:repeat: User ${(await client.users.fetch(t.user)).username || `invalid-user#0001`} (${t.user}) received ¥${t.amount} from Discoin.`, process.env.LOGSCHANNEL);
				try {
					(await client.users.fetch(t.user)).send(`You've received ¥${t.amount} from Discoin (Transaction ID: ${t.receipt}).\nYou can check all your transactions at http://discoin.sidetrip.xyz/record.`);
				} catch (err) {
					return;
				}
			}
		}
	}
}, 300000);

client.once("ready", async() => {
	console.log(`[Shard ${process.env.SHARD_ID}] READY! REPORTING FOR DUTY!`);
	/*try {
		await get(`https://bots.discord.pw/api/bots/${client.user.id}/stats`)
		.set(`Authorization`, process.env.BOTS_PW_TOKEN)
		.then(r => {
			let c = r.body.stats.map(s => s.server_count).reduce((a, b) => a + b);
			if (isNaN(c)) return client.user.setActivity(`${process.env.PREFIX}help`);
			client.user.setActivity(`${c} servers | ${process.env.PREFIX}help`);
			try {
				post(`https://botsfordiscord.com/api/v1/bots/${client.user.id}`)
					.set(`Content-Type`, "application/json")
					.set(`Authorization`, process.env.BFD_TOKEN)
					.send({count: c});
			} catch(e) {client.apiSend("BFD post server count not working\n```js"+e+"```", "377945714166202368")}
			try {
				post(`https://botlist.space/api/bots/${client.user.id}`)
					.set(`Authorization`, process.env.BLSPACE_TOKEN)
					.set(`Content-Type`, "application/json")
					.send({server_count: c});
			} catch(e) {client.apiSend("BLS post server count not working\n```js"+e+"```", "377945714166202368")}
			try {
				post(`https://ls.terminal.ink/api/v1/bots/${client.user.id}`)
					.set(`Authorization`, process.env.TERMINAL_TOKEN)
					.set(`Content-Type`, "application/json")
					.send({count: c});
			} catch(e) {client.apiSend("DUK post server count not working\n```js"+e+"```", "377945714166202368")}
		});
	}
	catch(e) {
		client.user.setActivity(`${process.env.PREFIX}help`);
	}*/
	client.user.setActivity(`${process.env.PREFIX}help`);
	client.IPC.send("guilds", { latest: Array.from(client.guilds.keys()), shard: client.shard.id });
	const blacklisted = await Blacklist.find({});
	for (const blacklist of blacklisted) {
		switch (blacklist.type) {
			case "user": {
				client.blacklist.users.push(blacklist._id);
				break;
			}
			case "guilds": {
				client.blacklist.guilds.push(blacklist._id);
			}
		}
	}
	// if (client.channels.has("281815661863501824")) {
	// 	client.channels.get("281815661863501824").join().then(connection => {
	// 		// TODO
	// 		connection.play("https://www.youtube.com/watch?v=66tQR7koR_Q");
	// 	});
	// }
});

client.on("guildCreate", guild => {
	require("./events/guildCreate")(client, guild);
});

client.on("guildDelete", guild => {
	require("./events/guildDelete")(client, guild);
});

client.on("typingStart", (...args) => {
	require("./events/typingStart")(client, ...args);
});

client.on("typingStop", (...args) => {
	require("./events/typingStop")(client, ...args);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
	require("./events/messageUpdate")(client, oldMessage, newMessage);
});

client.on("message", async message => {
	let isBlacklisted;
	if (client.blacklist.users.includes(message.author.id)) isBlacklisted = true;
	else if (message.channel.type !== "dm") {
		if (client.blacklist.guilds.includes(message.guild.id)) isBlacklisted = true;
	}
	if ((message.author.bot && message.author.id !== client.user.id) || isBlacklisted) return;
	// In progress wizard/phonebook session?
	let callDocument;
	try {
		callDocument = await Calls.findOne({ "to.channelID": message.channel.id });
		if (!callDocument) throw new Error();
	} catch (err) {
		try {
			callDocument = await Calls.findOne({ "from.channelID": message.channel.id });
			if (!callDocument) throw new Error();
		} catch (err2) {
			callDocument = undefined;
		}
	}
	// If it starts with a the prefix, check if its a command
	if (message.content.startsWith(process.env.PREFIX)) {
		console.log(`${message.author.tag} > ${message.content}`);
		const args = message.content.split(" ").splice(1).join(" ")
			.trim();
		let command = message.content.split(" ")[0].trim().toLowerCase().replace(process.env.PREFIX, "");
		if (command == "dial") {
			command = "call";
		} else if (command == "rcall") {
			command = "rdial";
		}
		let commandFile;
		// Is there a call?
		if (callDocument && callDocument.status) {
			try {
				commandFile = reload(`./callcmds/${command}.js`);
			} catch (err) {
				if (fs.existsSync(`./callcmds/${command}.js`)) message.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Catastrophic oof",
						description: `\`\`\`js\n${err.stack}\`\`\``,
						footer: {
							text: "Please `>dial *611` to report this error to the devs.",
						},
					},
				});
			}
		} else {
			try {
				commandFile = reload(`./commands/${command}.js`);
			} catch (err) {
				if (fs.existsSync(`./commands/${command}.js`)) message.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Catastrophic oof",
						description: `\`\`\`js\n${err.stack}\`\`\``,
						footer: {
							text: "Please `>dial *611` to report this error to the devs.",
						},
					},
				});
			}
		}
		// If so, run it
		if (commandFile) {
			try {
				return commandFile(client, message, args, callDocument);
			} catch (err) {
				if (fs.existsSync(`./commands/${command}.js`)) message.channel.send({
					embed: {
						color: 0xFF0000,
						title: "Catastrophic oof",
						description: `\`\`\`js\n${err.stack}\`\`\``,
						footer: {
							text: "Please `>dial *611` to report this error to the devs.",
						},
					},
				});
			}
		}
	} else if (callDocument && callDocument.status && callDocument.pickedUp && !message.author.bot) {
		require("./modules/callHandler")(client, message, callDocument);
	}
});

client.IPC.on("eval", async(msg, callback) => {
	let result = client._eval(msg);
	if (result instanceof Map) result = Array.from(result.entries());
	callback(result);
});

client.IPC.on("startTyping", async data => {
	await client.channels.get(data.channel).startTyping(100);
});

client.IPC.on("stopTyping", async data => {
	await client.channels.get(data.channel).stopTyping(true);
});

client.login(process.env.CLIENT_TOKEN).then(() => {
	client.IPC.send("ready", { id: client.shard.id });
});

process.on("unhandledRejection", (_, promise) => {
	console.log(require("util").inspect(promise, null, 2));
});
