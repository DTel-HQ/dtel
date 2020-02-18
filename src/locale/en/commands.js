const words = require("./words.js");

module.exports = {
	call: {
		name: "call",
		aliases: [
		],
		usage: `{{prefix, prefix}}call <${words.number}>`,
	},
	permcheck: {
		name: "permcheck",
		aliases: [
			"pc",
		],
		usage: `{{prefix, prefix}}permcheck <${words.userID}>`,
	},
};
