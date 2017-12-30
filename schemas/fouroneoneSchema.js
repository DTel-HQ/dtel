const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	status: { type: String, required: true },
});
