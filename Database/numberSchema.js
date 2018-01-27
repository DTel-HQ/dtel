const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	number: { type: String, required: true },
	expiry: { type: Date, required: true },
	guild: { type: String, required: true },
});
