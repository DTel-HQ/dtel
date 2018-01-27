const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	// UUID of the current call
	_id: {
		type: String,
		required: true,
	},
	// To the person who answered
	to: new mongoose.Schema({
		channelID: {
			type: String,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
		guild: {
			type: String,
			required: true,
		},
	}),
	// From the number who called
	from: new mongoose.Schema({
		channelID: {
			type: String,
			required: true,
		},
		number: {
			type: String,
			required: true,
		},
		guild: {
			type: String,
			required: true,
		},
	}),
	// Start time
	time: {
		type: Date,
		default: Date.now,
	},
	// Call is active
	status: {
		type: Boolean,
		default: true,
	},
	pickedUp: {
		type: Boolean,
		default: false,
	},
	messages: [new mongoose.Schema({
		umessage: String,
		bmessage: String,
		creator: String,
	})],
});
