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
	}, { usePushEach: true }),
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
	}, { usePushEach: true }),
	// Start time
	time: {
		type: Date,
		default: Date.now,
	},
<<<<<<< HEAD
<<<<<<< HEAD
=======
	timestamp: Number,
>>>>>>> parent of 3e64daf... Update callSchema.js
=======
	// Last message timestamp
	timestamp: Number,

>>>>>>> 2a9eaec9a098774c98f1126a985805b65b887d82
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
	}, { usePushEach: true })],
}, { usePushEach: true });
