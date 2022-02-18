import config from "../../config/config";

export default {
	languages: ["en-**"],

	commands: {
		wizard: {
			modal: {
				title: "DTel Phone Number Registry",

				numberLabel: "Enter the number you would like to register:",

				numberInvalid: "Please enter a valid number.",
				numberBadFormat: "Please enter a number starting with",
				numberInUse: "That number is already in use. Try another.",
			},

			introEmbed: {
				title: "DTel Phone Number Registry",
				description: "📖 __**Read this before continuing:**__",
				fields: [{
					name: "🧹 This is a roleplay bot!",
					value: "It cannot be used to call real phone numbers. All calls exist within Discord only.",
				}, {
					name: "💵 Payment",
					value: "Your number must be renewed for **500 credits** each month. To do so, call `*233*`.\nFind ways to get credits [here](https://dtel.austinhuang.me/en/latest/Payment/).\nDon't worry, the first month is **free**!",
				}, {
					name: "🏛️ The legal stuff",
					value: `Full documentation is located at ${config.siteLink}. \nIt contains important information such as our [Privacy Policy](https://dtel.austinhuang.me/en/latest/Privacy/).`,
				}],
			},

			successEmbed: {
				title: "✅ Success!",
				description: "Your number has been registered.",
				fields: [{
					name: "❓ Whats next?",
					value: "To learn more about the bot: `>help`, `>info`, `>links`.\nFor information about your number: call `*233`.\nFind other numbers to call at `*411`.",
				}, {
					name: "Number",
					inline: true,
				}],
			},
		},
	},

	errors: {
		unexpected: "An unexpected error occurred.",
	},
};
