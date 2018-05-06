const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	number: { type: String, required: true },
	expiry: { type: Date, required: true },
	expired: { type: Boolean, default: false },
	callerId: { type: String, default: null},
	callerIdExpiry: { type: Date, default: null }
}, { usePushEach: true });
