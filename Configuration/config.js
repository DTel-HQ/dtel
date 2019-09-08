module.exports = {
	// BOT MAINTENANCE
	maintainers: [
		"137589790538334208",
		"124989722668957700",
	],
	devMode: true,
	shardCount: 3,

	// NUMBER ALIASES
	aliasNumbers: {
		"*611": "08007877678",
	},

	// SETINGS
	prefix: ">",
	dailies: {
		boss: 300,
		manager: 250,
		support: 200,
		default: 80,
	},
	lotteryCost: 5,
	messageCost: 2,
	pickupBonus: 10,
	promoteCost: 500,
	renewalRate: 500,
	transferRate: 0.729,
	minTransfer: 100,
	maxNumbers: 3,
	promoteTimeout: 7,

	// EMOTES
	callPhones: {
		default: "<:DiscordTelPhone:310817969498226718>",
		donator: "<:GoldPhone:320768431307882497>",
		support: ":telephone_receiver:",
	},

	// IDs
	logsChannel: "399006748582871060",
	promoteChannel: "577889780533166106",
	supportChannel: "399375958525870080",
	supportGuild: "398980667553349649",
	bossRole: "398980867864920064",
	donatorRole: "324578460183822337",
	managerRole: "284443515516354560",
	supportRole: "398980993593376769",

	// LINKS
	applyLink: "https://discordtel.typeform.com/to/jJayAt",
	botInvite: "https://discordapp.com/oauth2/authorize?client_id=530437196696649738&scope=bot&permissions=67169284",
	guildInvite: "https://discord.gg/qRVxY55",
	paymentLink: "http://discordtel.readthedocs.io/en/latest/Payment/",
	siteLink: "https://discordtel.austinhuang.me",
	suggestLink: "https://feedback.austinhuang.me/",
	voteLink: "https://discordtel.austinhuang.me/en/latest/Payment/#voting-for-us-on-listings",

	// Embed Colors
	colors: {
		contacts: 0x50C878,
		error: 0xff3333,
		info: 0x3498d8,
		receipt: 0xe1e1e1,
		success: 0x47d147,
		yellowbook: 0xe6e600,
		vip: 0xcc9900,
	},

	// Command aliases (keep it down or make new file)
	aliasCommands: {
		bal: "balance",
		bc: "broadcast",
		cmds: "help",
		commands: "help",
		contact: "contacts",
		id: "identify",
		mentions: "mention",
		perm: "permcheck",
	},

	// Cooldown times (s) (This file is getting too big)
	cooldowns: {
		default: 5,
		call: 20,
		message: 120,
	},
};
