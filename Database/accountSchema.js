const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	balance: { type: Number, default: 0 },
	dailyClaimed: { type: Boolean, default: false },
	vip: {type: Number, default: 0}, // VIP expiry
	premium: String, // Which number is assigned VIP
}, { usePushEach: true });
