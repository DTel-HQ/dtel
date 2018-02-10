const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	settings: {
		autoreply: { type: String, default: "Sorry, I am unavailable, leave a message" },
	},
	messages: [new mongoose.Schema({
		_id: { type: String, required: true },
		from: { type: String, required: true },
		content: { type: String, required: true },
		usePushEach: true,
	})],
	usePushEach: true,
});
