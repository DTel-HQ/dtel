const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	type: { type: String, required: true },
	offender: { type: String, required: true },
	reason: { type: String, required: true },
	creator: { type: String, required: true },
});
