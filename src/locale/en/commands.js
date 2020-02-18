const words = require("./words.js");

module.exports = {
	call: {
		name: "call",
		aliases: [
		],
		usage: `{{prefix}}call <${words.number}>`,
	},
	permcheck: {
		name: "permcheck",
		aliases: [
			"pc",
		],
		usage: `{{prefix}}permcheck <${words.userID}>`,
	},
};
