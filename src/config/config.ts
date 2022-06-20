export default {
	// BOT MAINTENANCE
	maintainers: [
		"207484517898780672", // Austin
		"137589790538334208", // Sun
		"124989722668957700", // Mitchell
	],
	devMode: true,
	devOnlyMode: false,
	shardCount: 1,
	botID: "377609965554237453",

	// NUMBER ALIASES
	aliasNumbers: {
		"*611": "08007877678",
	},

	// SETTINGS
	prefix: ">",
	dailies: { // credits earned from using >daily
		boss: 300,
		manager: 250,
		support: 200,
		contributor: 180,
		donator: 120,
		default: 80,
	},
	lotteryCost: 5, // credits per lottery entry
	messageCost: 2, // cost for messages sent with >message
	pickupBonus: 25, // *611 calls
	promoteCost: 100,
	renewalRate: 500,
	normalTransferRate: 0.85, // 15% fee
	vipTransferRate: 0.95, // 5% fee
	minTransfer: 50,
	maxNumbers: 3,
	promoteTimeout: 7, // days

	// EMOTES - don't change order
	callPhones: {
		default: "<:DTelPhone:709100612935221289>",
		donator: "<:GoldPhone:709101494242246657>",
		support: "<:GreenPhone:709101494556819507>",
		contributor: "<:RedPhone:742293638931021904>",
		admin: "📞",
	},
	dtsEmoji: "<:DTS:668551813317787659>",

	// IDs

	supportGuild: {
		id: "281815661317980160",
		channels: {
			officesCategory: "355890256786227210",

			announcement: "281816926144167946",
			logs: "282253502779228160",
			badLogs: "377945714166202368",
			promote: "398569181097754624",
			support: "281816105289515008",
		},
		roles: {
			boss: "281815725365264385",
			donator: "324578460183822337",
			manager: "284443515516354560",
			customerSupport: "281815839936741377",
			contributor: "394214123547918336",
		},
		supportNumber: "08007877678", // 0800SUPPORT
	},


	// LINKS
	applyLink: "https://discordtel.typeform.com/to/wHjMpX",
	botInvite: "https://discord.com/api/oauth2/authorize?client_id=377609965554237453&permissions=274877990912&scope=bot%20applications.commands",
	discoinLink: "https://discoin.gitbook.io/docs/users-guide",
	githubLink: "https://github.com/DTel-HQ/dtel",
	guidelink: "https://dtel.austinhuang.me/en/latest/Customer-Support-Guide/",
	guildInvite: "https://discord.gg/DcayXMc",
	paymentLink: "https://dtel.austinhuang.me/en/latest/Payment/",
	siteLink: "https://dtel.austinhuang.me",
	suggestLink: "https://feedback.austinhuang.me/",
	vipLink: "https://dtel.austinhuang.me/en/latest/VIP-Numbers/",
	voteLink: "https://dtel.austinhuang.me/en/latest/Payment/#voting-for-us-on-listings",

	// Embed colors
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

	// Winston (logger) settings
	winston: {
		consoleLevel: "silly",
		fileLevel: "silly",
	},

	// Cooldown times (s)
	cooldowns: {
		default: 5,
		call: 20,
		message: 120,
	},
};
