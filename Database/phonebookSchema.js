const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	description: { type: String, default: "The owner has not set a description." },
});
