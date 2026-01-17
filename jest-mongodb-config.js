// TODO: Properly set up, is fine without for now
module.exports = {
	mongodbMemoryServerOptions: {
		binary: {
			skipMD5: true,
		},
		autoStart: false,
		instance: {},
		replSet: {
			count: 3,
			storageEngine: "wiredTiger",
		},
	},
	mongoURLEnvName: "MONGO_URI",
};
