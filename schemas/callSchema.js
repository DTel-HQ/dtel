const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	to: new mongoose.schema({ _id: { type: String, required: true }, number: { type: String, required: true } }),
	from: new mongoose.schema({ _id: { type: String, required: true }, number: { type: String, required: true } }),
	status: { type: Boolean, required: true },
});
