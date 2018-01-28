Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

const process = require("process");
const ProcessAsPromised = require("process-as-promised");
const dbl = require("dblposter");

const { Client } = require("discord.js");
const { readFileSync } = require("fs");
const { scheduleJob } = require("node-schedule");

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

const emotes = JSON.parse(readFileSync("./json/emotes.json", "utf8"));

database.initialize(process.env.MONGOURL).then(() => {
	console.log("Database initialized!");
}).catch(err => {
	console.log(`Failed to intialize Database`, err);
	process.exit(1);
});

Number(process.env.SHARD_ID) === 0 && scheduleJob({ date: 1, hour: 0, minute: 0, second: 0 }, async() => {
	let allNumbers = await Numbers.find({ });
	let today = new Date();
	for (let n of allNumbers) {
		let exp = new Date(n.expiry);
		if ((today.getMonth() > exp.getMonth() && today.getFullYear() > exp.getFullYear()) || (today.getMonth() > exp.getMonth() && today.getFullYear() == exp.getFullYear())) {
			n.expired = true;
			await n.save();
		}
	}
});

Number(process.env.SHARD_ID) === 0 && scheduleJob({ hour: 0, minute: 0, second: 0 }, async() => {
	// I'll start with daily.
	let allAccounts = await Numbers.find({ });
	for (let a of allAccounts) {
		a.dailyClaimed = false;
		await a.save();
	}
	// Then lottery.
	let currentlottery;
	try {
		currentlottery = await Lottery.findOne({ status: true });
		if (!currentlottery) throw new Error();
	} catch (err) {
		let devs = ["137589790538334208", "139836912335716352", "156110624718454784", "115156616256552962", "207484517898780672"];
		await client.users.fetch();
		return devs.forEach(d => {
			client.users.get(d).send("Yo, there's something wrong with the lottery.");
		});
	}
	if (currentlottery) {
		let winner = currentlottery.entries[Math.floor(Math.random() * currentlottery.entries.length)];
		await client.users.fetch();
		let winneracc;
		try {
			winneracc = await Accounts.findOne({ _id: winner });
			if (!winneracc) throw new Error();
		} catch (err) {
			client.users.get(winner).send("You've just won the lottery, but you don't have an account! Creating one for you.");
			winneracc = await Accounts.create(new Accounts({
				_id: winner,
			}));
		}
		if (winneracc) {
			winneracc.balance += currentlottery.jackpot;
			currentlottery.status = false;
			await currentlottery.save();
			await winneracc.save();
			await Lottery.create(new Lottery({
				_id: uuidv4(),
			}));
			client.users.get(winner).send(`You've won the lottery! The jackpot amount has been added to your account. You now have \`${winneracc.balance}\``);
		}
	}
	await client.api.channels.get(process.env.LOGSCHANNEL).messages.post(MessageBuilder({
		content: `:white_check_mark: The lottery and daily credits have been reset!`,
	}));
});

client.once("ready", () => {
	console.log(`[Shard ${process.env.SHARD_ID}] READY! REPORTING FOR DUTY!`);
	client.user.setActivity(`${client.guilds.size} servers on shard ${client.shard.id} | ${process.env.PREFIX}help`);
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
		callDocument = await Calls.findOne({ "to.channelID": message.channel.id });
		if (!callDocument) throw new Error();
	} catch (err) {
		try {
			callDocument = await Calls.findOne({ "from.channelID": message.channel.id });
			if (!callDocument) throw new Error();
		} catch (err2) {
			callDocument = null;
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
				console.log("ran callcmd");
			} catch (err) {
				console.log(`call cmds err: ${err}`);
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
	} else if (callDocument && callDocument.status && callDocument.pickedUp) {
		require("./modules/callHandler")(client, message, callDocument);
	}
});

if (process.env.DBL_ORG_TOKEN) {
	const dblPoster = new dbl();
	dblPoster.bind(client);
}

// TODO: Use dblposter.bind
client.login(process.env.CLIENT_TOKEN);
