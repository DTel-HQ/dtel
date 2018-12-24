const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	balance: { type: Number, default: 0 },
	dailyClaimed: { type: Boolean, default: false },
}, { usePushEach: true });
