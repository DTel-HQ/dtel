const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	number: { type: String, required: true },
	type: { type: String, required: true },
	month: { type: Number, required: true },
	year: { type: Number, required: true },
});
