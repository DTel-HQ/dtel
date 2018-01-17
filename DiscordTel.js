Object.assign(String.prototype, {
	escapeRegex() {
		const matchOperators = /[|\\{}()[\]^$+*?.]/g;
		return this.replace(matchOperators, "\\$&");
	},
});

const process = require("process");
const ProcessAsPromised = require("process-as-promised");
const { Client } = require("discord.js");
const { readFileSync } = require("fs");
const { scheduleJob } = require("node-schedule");
const database = require("./Database/database");
const ShardUtil = require("./modules/ShardUtil");

const client = new Client({
	shardId: Number(process.env.SHARD_ID),
	shardCount: Number(process.env.SHARD_COUNT),
	disableEveryone: true,
	fetchAllMembers: true,
	disabledEvents: ["GUILD_MEMBER_ADD", "GUILD_MEMBER_REMOVE", "GUILD_ROLE_CREATE", "GUILD_ROLE_DELETE", "GUILD_ROLE_UPDATE", "GUILD_BAN_ADD", "GUILD_BAN_REMOVE", "CHANNEL_PINS_UPDATE", "MESSAGE_DELETE_BULK", "MESSAGE_DELETE", "MESSAGE_REACTION_REMOVE", "MESSAGE_REACTION_REMOVE_ALL", "PRESENCE_UPDATE", "VOICE_STATE_UPDATE"],
});

client.shard = new ShardUtil(client);

const emotes = JSON.parse(readFileSync("./json/emotes.json", "utf8"));

database.initialize(process.env.MONGOURL).then(() => {
	console.log("Database initialized!");
}).catch(err => {
	console.log(`Failed to intialize Database`, err);
	process.exit(1);
});

// TODO: Rhys needs to update this
Number(process.env.SHARD_ID) === 0 && scheduleJob({ date: 1, hour: 0, minute: 0, second: 0 }, () => {
	// TODO: do tis
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

// TODO: Use dblposter.bind
client.login(process.env.CLIENT_TOKEN);
