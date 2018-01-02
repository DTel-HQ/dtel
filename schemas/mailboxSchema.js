const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	settings: {
		autoreply: { type: String, default: "Sorry, I am unavailable, leave a message" },
	},
	messages: [String],
});
