const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	balance: { type: String, required: true },
	dailyClaimed: { type: Boolean, requied: true },
});
