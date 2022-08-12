// Check out context
// https://www.i18next.com/translation-function/context
import config from "../../config/config";

export default {
	languages: ["en-**"],

	generic: {
		addedTo: "added to",
		removedFrom: "removed from",
	},

	events: {
		interactionCreate: {
			errors: {
				expiredInteraction: "This interaction has expired. Try running the command again.",
				wrongUser: "You didn't send this message!",
			},
		},
	},

	commands: {
		balance: {
			embed: {
				title: "Account information for {{ user }}",
				fields: [{
					name: "Credits",
					value: `${config.dtsEmoji} {{ balance }}`,
					inline: true,
				}, {
					name: "VIP Months",
					value: "{{ vipMonthsRemaining }}",
					inline: true,
				}, {
					name: "Get VIP Months",
					value: `${config.paymentLink}`,
				}],
			},
		},

		call: {
			pickup: "Pick up",
			hangup: "Hang up",
			dontTrustStrangers: "Don't trust files from strangers",

			errors: {
				unexpected: "We couldn't start that call. Try again later.",

				callingSelf: "You can't call yourself!",

				thisSideExpired: "Your number has expired. Get an admin to call `*233` and renew this number.",
				otherSideExpired: "The number you have attempted to call has expired.",

				numberInvalid: "The number you tried to call is invalid!",
				otherSideMissingChannel: "We can't reach the other side. They probably removed our bot.",
				otherSideNotFound: "The number you tried to call doesn't exist!",

				otherSideBlockedYou: "The other side has blocked you from calling them.",

				couldntReachOtherSide: "We couldn't send a message to the other side. This is due to an incorrect configuration on the other end.",
			},

			initiated: {
				title: "Dialing `{{ number }}`",
				description: "You can hang up at any time using `/hangup`, but be sure to give the other side time to pick up!",
				footer: {
					text: "ID: {{ callID }}",
				},
			},

			incomingCall: {
				title: "Incoming call",
				description: "There is an incoming call from `{{ number }}`. Pick up, hang up or wait it out.",
				footer: {
					text: "ID: {{ callID }}",
				},
			},

			pickedUp: {
				toSide: {
					title: "You picked up the call",
					description: "You can now talk to the other side, put the call on hold `/hold` or hang up `/hangup`\nRemember to follow the [rules](https://dtel.austinhuang.me/en/latest/FAQ/#rules).",
					footer: {
						text: "ID: {{ callID }}",
					},
				},

				fromSide: {
					title: "The other side picked up!",
					description: "You can now talk to the other side, put the call on hold `/hold` or hang up `/hangup`.\n[rules](https://dtel.austinhuang.me/en/latest/FAQ/#rules).",
					footer: {
						text: "ID: {{ callID }}",
					},
				},
			},


			missedCall: {
				fromSide: {
					color: 0xFF0000,
					title: "Call expired",
					description: "The other side did not pick up (within 2 minutes)",
				},
				toSide: {
					color: 0xFF0000,
					title: "Call expired",
					description: "You missed the call (not answered within 2 minutes)",
				},
			},

			waitPrompt: {
				title: "The number you have dialed is busy",
				description: "Would you like to wait until the number is free? You can leave the queue at any time.",
			},

			waitAccept: "Yes",
			waitDeny: "No",
		},

		daily: {
			alreadyClaimedEmbed: {
				title: "Already claimed",
				description: `You've already claimed your daily credits! Try again **{{ timeRemaining }}**.\n\nYou can vote for DTel to get **60+ more credits every day**!\nYou can find a list of voting sites [here](${config.voteLink}).`,
			},
			claimedSuccessfully: {
				title: "Claimed your daily credits!",
				description: `Here's your ${config.dtsEmoji}{{ noNewCredits }}! You now have ${config.dtsEmoji}{{ balance }}.\n\nYou can vote for DTel to get **60+ more credits every day**!\nYou can find a list of voting sites [here](${config.voteLink}).`,
			},
		},

		wizard: {
			errors: {
				channelHasNumber: "This channel already has a number! (`{{ number }}`). You can use `/call` to make a call.",
				unwhitelistedGuildHasTooManyNumbers: "This server has too many numbers! Contact Customer Support at `*611` to request another number.",
				numberInUse: "That number is already in use. Try another.",
				numberInvalid: "Please enter a valid number.",
				numberBadFormat: "Please enter a number starting with **{{ numberStartsWith }}**.",
			},

			modal: {
				title: "DTel Phone Number Registry",

				numberLabel: "Enter the number you would like to register:",
			},

			introEmbed: {
				title: "DTel Phone Number Registry",
				description: "📖 __**Read this before continuing:**__",
				fields: [{
					name: "🧹 This is a roleplaying bot!",
					value: "It cannot be used to call real phone numbers. All calls exist within Discord only.",
				}, {
					name: "💵 Payment",
					value: "Your number must be renewed for **500 credits** each month. To do so, call `*233`.\nFind ways to get credits [here](https://dtel.austinhuang.me/en/latest/Payment/).\nDon't worry, the first month is **free**!",
				}, {
					name: "🏛️ The legal stuff",
					value: `Full documentation is located at ${config.siteLink}. \nIt contains important information such as our [Privacy Policy](https://dtel.austinhuang.me/en/latest/Privacy/).`,
				}],
			},

			successEmbed: {
				title: "✅ Good to go!",
				description: "Your number has been registered.",
				fields: [{
					name: "❓ Whats next?",
					value: "To learn more about the bot: `>help`, `>info`, `>links`.\nFor information about your number: call `*233`.\nFind other numbers to call at `*411`.",
				}, {
					name: "Number",
					value: "{{ number }}",
					inline: true,
				}, {
					name: "Expiry",
					value: "{{ expiry }}",
					inline: true,
				}],
			},
		},

		hangup: {
			baseEmbed: {
				color: 0xFF0000,
				title: "The call has ended!",
				footer: {
					text: "ID: {{ callID }}",
				},
			},
			descriptions: {
				notPickedUp: {
					thisSide: "You have ended the call.",
					otherSide: "The other side rejected the call.",
				},
				pickedUp: {
					thisSide: "You have ended the call after {{ time }}.",
					otherSide: "The other side ended the call after {{ time }}.",
				},
			},
		},

		help: {
			embed: {
				title: "DTel's commands",
				description: "For more information, use `>info`, `>links` or call Customer Support (`>dial *611`).",
				fields: [
					{
						name: "Get yourself a number to call others!",
						value: "Use `>wizard` and follow the prompts. Once you've got one, you can...",
					},
					{
						name: ">dial / >call",
						value: "Dial a specific DTel number you have in mind. Or...",
					},
					{
						name: ">rdial / >rcall",
						value: "Dial a random number from the yellowpages (`*411`). (To register your number in the yellowpages, `>dial *411`.)",
					},
					{
						name: ">status",
						value: "See how long a call has been going for, plus the message count and call ID.",
					},
					{
						name: ">block",
						value: "Block a number from calling you.",
					},
					{
						name: ">contacts",
						value: "Your personal contact book of DTel numbers.",
					},
					{
						name: ">mention",
						value: "Get mentioned when there's an incoming call (guild only).",
					},
					{
						name: ">transfer",
						value: "Transfer the other side of a call to another number.",
					},
					{
						name: "Currency commands",
						value: "More information about the currency [here](http://dtel.austinhuang.me/en/latest/Payment/).\n• `>dial *233`: Renew your number registration using credits.\n• `>convert`: Convert your credits into other bot currency via [Discoin](https://discoin.gitbook.io/docs/users-guide).\n• `>daily`: Get daily credits.\n• `>vote`: Vote for us to get more credits!\n• `>pay`: Send money to others (Fees apply).\n• `>lottery`: Daily jackpot!",
					},
					{
						name: "Mailbox commands",
						value: "\n• `>mailbox`: Check mailbox messages or create one.\n• `>message`: Write a message to other number's mailbox.",
					},
					{
						name: ">upgrade",
						value: "Upgrade your number to a VIP number. Use this to see all the benefits!",
					},
					{
						name: "I don't really need to explain these... right, my master?",
						value: "`>help`, `>info`, `>invite`, `>links`, `>prefix` and `>ping`",
					},
				],
				footer: {
					text: "DTel V4 • Made with <3 by SunburntRock89, Rexogamer and the team",
				},
			},
		},

		info: {
			embed: {
				title: "📖 DTel Information",
				description: `For command help, use \`>help\`. More detailed documentation is available on [our website](${config.siteLink}).`,
				fields: [
					{
						name: "📞 Getting a number",
						value: "Before getting a number, you need to reserve a channel for your phone. Once you have done this, you'll have to run the `>wizard` command in the channel to get a number.",
					},
					{
						name: "✏ Numbers",
						value: "Most numbers have a prefix of `03XX`, where `XX` represents your shard number. There are some numbers with a prefix of `0900`, which are DM numbers (numbers you can assign in a direct message with the client), and they act the same as `03XX` numbers, which can *also* have the same digits as `03XX` numbers. Numbers starting with `0800` or `0844`, as well as short codes starting with `*` or `#` are for special uses.",
					},
					{
						name: "💰 Credits",
						value: `You can either earn credits using this bot, transfer credits from other clients, or donate to DTel's development in exchange of credits. See [this page](${config.paymentLink}) for details.\nAfter recharging, dial \`*233\` or run \`/balance\` to check balance.`,
					},
					{
						name: "🔖 Phonebook",
						value: "To use the phonebook, first dial `*411`. You can scroll through the phonebook by pressing `1`, add/edit/remove your number from the phonebook by pressing `2`, and check special numbers by pressing `3`.",
					},
					{
						name: "📥 Invite the bot",
						value: `Type \`>invite\` or click this button: [<:dl:382568980218511361>](${config.botInvite})`,
					},
					{
						name: "📋 Suggest a feature",
						value: `Suggest a feature for DTel [here](${config.suggestLink}) and we will take a look at it.`,
					},
					{
						name: "💬 Join our team",
						value: `Strengthen our support team by [applying](${config.applyLink}). Applications will be looked at when we're looking to hire, don't ask about the status of it.`,
					},
					{
						name: "📌 Official Server",
						value: `${config.guildInvite}`,
					},
					{
						name: ":desktop: Official Website",
						value: `${config.siteLink}`,
					},
				],
				footer: {
					text: "DTel V3 - made with <3 by SunburntRock89 and the team",
				},
			},
		},

		links: {
			embed: {
				title: "List of *all* the links",
				fields: [
					{
						name: "🔗 Invite the bot",
						value: `[Right here!](${config.botInvite})`,
						inline: true,
					},
					{
						name: "🌎 Join our support guild!",
						value: `[Join now](${config.guildInvite})`,
						inline: true,
					},
					{
						name: "💻 Visit our website!",
						value: `[DTel's website.](${config.siteLink})`,
						inline: true,
					},
					{
						name: "📂 View our GitHub",
						value: `[We are open source!](${config.githubLink})`,
						inline: true,
					},
					{
						name: "💖 Support us!",
						value: `[How to donate?](${config.vipLink})`,
						inline: true,
					},
					{
						name: "📋 Vote for us!",
						value: `[Get your free credits!](${config.voteLink})`,
						inline: true,
					},
					{
						name: `${config.callPhones.donator} VIP Numbers`,
						value: `[How they work](${config.vipLink})`,
						inline: true,
					},
					{
						name: "💡 Suggest a feature!",
						value: `[Suggestions page](${config.suggestLink})`,
						inline: true,
					},
					{
						name: "💪 Join our team!",
						value: `[Apply now!](${config.applyLink})`,
						inline: true,
					},
				],
				footer: {
					text: "DTel V3 - made with <3 by Austin Huang, Mitchell Rademaker and their team",
				},
			},
		},
		status: {
			embed: {
				title: "Call Status",
				fields: [{
					name: "Time elapsed",
					value: "{{ timeElapsed }}",
					inline: true,
				}, {
					name: "Message count",
					value: "{{ messageCount }}",
					inline: true,
				}],
				footer: {
					text: "{{ callID }}",
				},
			},
		},
		mention: {
			selectPrompt: "Select a user to remove",
			listEmpty: "There are no users being mentioned.",
			listFull: "The mentions list is full (max 25).",
			listEmbed: {
				title: "Mentions List",
				description: `{{ list }}`,
			},
			toggleEmbed: {
				title: "✅ Success!",
				description: "You have been **{{ addedOrRemoved }}** the list of mentions!",
			},
			removeEmbed: {
				title: "✅ Success!",
				description: "**{{ user }}** has been removed from the list of mentions!",
			},
		},
		block: {
			cantBlockSelf: "You can't block yourself! (how would that even work?)\nYou can report yourself by calling `*611` 🙂",
			invalidBlockingNumber: "Invalid or special number. You can't block special numbers. Please report any abuse by calling `*611`",
			numberDoesntExist: "We couldn't find that number",

			blockedSuccess: {
				title: "✅ Blocked!",
				description: "`{{ numberOrDisplay }}` has been **blocked**!",
			},
			unblockedSuccess: {
				title: "✅ Unblocked!",
				description: "`{{ numberOrDisplay }}` has been **unblocked**!",
			},
		},
	},

	errors: {
		unexpected: "An unexpected error occurred.",
		notExecutableInCall: "This command can not be ran whilst in a call.",
		onlyExecutableInCall: "This command can only be ran whilst in a call.",
		noAccount: "That user doesn't have an account.",
		blacklisted: "❌ You have been blacklisted. You may not use DTel.",
		userNotFound: "Couldn't find that user.",
		wrongUser: "You can't click buttons on someone elses's message",
	},
};
