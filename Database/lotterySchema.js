const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	jackpot: { type: String, default: 0 },
	entered: [String],
	active: { type: Boolean, default: true },
});
