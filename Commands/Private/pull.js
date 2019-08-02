const { exec } = require("child_process");
const { readdir } = require("fs-nextra");
const clear = require("clear-module");


module.exports = async(client, msg, suffix) => {
	exec("git pull");
};
