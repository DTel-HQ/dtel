const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	type: { type: String, required: true },
}, { usePushEach: true });
