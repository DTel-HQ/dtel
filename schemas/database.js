const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const serverSchema = require("./ServerSchema");
const fouroneoneSchema = require("./fouroneoneSchema");
const addToGlobal = (name, val) => {
	global[name] = val;
};
exports.initialize = url => new Promise((resolve, reject) => {
	mongoose.connect(url, {
		useMongoClient: true,
		promiseLibrary: global.Promise,
	});
	const [
		Servers,
		Fouroneone,
	] = [
		mongoose.model("servers", serverSchema),
		mongoose.model("fouroneone", fouroneoneSchema),
	];
	mongoose.connection
		.on("error", err => reject(err))
		.once("open", () => {
			addToGlobal("Servers", Servers);
			addToGlobal("fouroneone", Fouroneone);
			addToGlobal("Database", {
				Servers, servers: Servers,
				Fouroneone, fouroneone: Fouroneone,
				Raw: mongoose.connection,
			});
			resolve(global.Database);
		});
});

exports.get = exports.getConnection = () => global.Database;
