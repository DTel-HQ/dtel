Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

const process = require("process");
const ProcessAsPromised = require("process-as-promised");
const dbl = require("dblposter");
const dblPoster = new dbl(process.env.DBL_ORG_TOKEN);

const { Client } = require("discord.js");
const { readFileSync } = require("fs");
const { scheduleJob } = require("node-schedule");
const { get } = require("snekfetch");

const database = require("./Database/database");
const ShardUtil = require("./modules/ShardUtil");
const MessageBuilder = require("./modules/MessageBuilder");
const uuidv4 = require("uuid/v4");

const client = new Client({
	shardId: Number(process.env.SHARD_ID),
	shardCount: Number(process.env.SHARD_COUNT),
	disableEveryone: true,
	disabledEvents: ["GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "VOICE_STATE_UPDATE"],
});

client.IPC = new ProcessAsPromised();
client.shard = new ShardUtil(client);

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
	let phonebookAll = await Phonebook.find({});
	for (const i of phonebookAll) {
		let channel;
		try {
			channel = await client.api.channels(i.channel).get();
		} catch (err) {
			await i.remove();
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
			}));
			(await client.users.fetch(winner)).send(`You've won the lottery! The jackpot amount has been added to your account. You now have \`${winneracc.balance}\``);
		}
	}
	await client.api.channels.get(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content: `:white_check_mark: The lottery and daily credits have been reset!`,
	}));
});

// Discoin grabber
setInterval(async() => {
	let snekres;
	try {
		snekres = await get("http://discoin.sidetrip.xyz/transactions").set({ Authorization: process.env.DISCOIN_TOKEN, "Content-Type": "application/json" });
	} catch (err) {
		// Ignore for now
	}
	if (snekres) {
		for (let t of snekres.body) {
			if (!t.type) {
				let account;
				try {
					account = await Accounts.findOne({ _id: t.id });
				} catch (err) {
					account = await Accounts.create(new Accounts({

					}));
				}
			}
		}
	}
}, 300000);

client.once("ready", () => {
	console.log(`[Shard ${process.env.SHARD_ID}] READY! REPORTING FOR DUTY!`);
	client.user.setActivity(`${client.guilds.size} servers on shard ${client.shard.id} | ${process.env.PREFIX}help`);
	client.IPC.send("guilds", { latest: Array.from(client.guilds.keys()), shard: client.shard.id });
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
	let isBlacklisted, entry;
	try {
		entry = await Blacklist.findOne({ _id: message.author.id });
		if (!entry) throw new Error();
		isBlacklisted = true;
	} catch (err) {
		try {
			entry = await Blacklist.findOne({ _id: message.guild.id });
			if (!entry) throw new Error();
			isBlacklisted = true;
		} catch (err2) {
			// Ignore error
		}
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
		}
		let commandFile;
		// Is there a call?
		if (callDocument && callDocument.status) {
			try {
				commandFile = require(`./callcmds/${command}.js`);
			} catch (err) {
				// Ignore
			}
		} else {
			try {
				commandFile = require(`./commands/${command}.js`);
			} catch (err) {
				// Ignore
			}
		}
		// If so, run it
		if (commandFile) {
			try {
				return commandFile(client, message, args, callDocument);
			} catch (err) {
				console.log(err);
			}
		}
	} else if (callDocument && callDocument.status && callDocument.pickedUp && !message.author.bot) {
		require("./modules/callHandler")(client, message, callDocument);
	}
});

if (process.env.DBL_ORG_TOKEN) {
	dblPoster.bind(client);
}

client.IPC.on("eval", async(msg, callback) => {
	let result = client._eval(msg);
	if (result instanceof Map) result = Array.from(result.entries());
	callback(result);
});

client.IPC.on("stopTyping", async data => {
	await client.channels.get(data.channel).stopTyping(true);
});

client.IPC.on("startTyping", async data => {
	await client.channels.get(data.channel).startTyping(100);
});

client.login(process.env.CLIENT_TOKEN).then(() => {
	client.IPC.send("ready", { id: client.shard.id });
});

process.on("unhandledRejection", (_, promise) => {
	console.log(require("util").inspect(promise, null, 2));
});
