/* eslint-disable no-inline-comments */
module.exports = {
	// BOT MAINTENANCE
	maintainers: [
		"207484517898780672",
		"137589790538334208",
		"124989722668957700",
	],
	devMode: false,
	devOnlyMode: false,
	shardCount: 4,
	botID: "377609965554237453",

	// NUMBER ALIASES
	aliasNumbers: {
		"*611": "08007877678",
	},
	supportNumber: "08007877678",

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
	pickupBonus: 25, // *611
	promoteCost: 100,
	renewalRate: 500,
	transferRate: 0.729,
	minTransfer: 50,
	maxNumbers: 3,
	promoteTimeout: 7, // days

	// EMOTES - don't change order
	callPhones: {
		default: "<:DTelPhone:709100612935221289>",
		donator: "<:GoldPhone:709101494242246657>",
		support: "<:GreenPhone:709101494556819507>",
	},
	dtsEmoji: "<:DTS:668551813317787659>",

	// IDs
	announcementChannel: "281816926144167946",
	logsChannel: "282253502779228160",
	badLogsChannel: "377945714166202368",
	promoteChannel: "398569181097754624",
	supportChannel: "281816105289515008",
	supportGuild: "281815661317980160",
	bossRole: "281815725365264385",
	donatorRole: "324578460183822337",
	managerRole: "284443515516354560",
	supportRole: "281815839936741377",

	// LINKS
	applyLink: "https://discordtel.typeform.com/to/wHjMpX",
	botInvite: "https://discordapp.com/oauth2/authorize?client_id=377609965554237453&scope=bot&permissions=125953",
	discoinLink: "https://discoin.gitbook.io/docs/users-guide",
	githubLink: "https://github.com/austinhuang0131/dtel",
	guidelink: "https://dtel.austinhuang.me/en/latest/Customer-Support-Guide/",
	guildInvite: "https://discord.gg/DcayXMc",
	paymentLink: "https://dtel.austinhuang.me/en/latest/Payment/",
	siteLink: "https://dtel.austinhuang.me",
	suggestLink: "https://feedback.austinhuang.me/",
	vipLink: "https://dtel.austinhuang.me/en/latest/VIP-Number/",
	voteLink: "https://dtel.austinhuang.me/en/latest/Payment/#voting-for-us-on-listings",

	// Embed Colors
	colors: {
		contacts: 0x50C878, // green
		error: 0xff3333, // red
		info: 0x3498d8, // blue
		lottery: 0x80002a, // red
		receipt: 0xe1e1e1, // white (duh)
		success: 0x47d147, // green
		yellowbook: 0xe6e600, // yellow
		vip: 0xffc61a, // gold
	},

	// Cooldown times (s)
	cooldowns: {
		default: 5,
		call: 20,
		message: 120,
	},
};
